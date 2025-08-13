import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";

const FEED_URL = "https://db-bet244020.top/service-api/LiveFeed/Get1x2_VZip?count=200&gr=752&mode=4&country=1&partner=164&virtualSports=true&noFilterBlockEvent=true";

interface FeedResponse { Value: any[] }

function parseEventToMatch(event: any) {
	const start = event.S ? new Date(event.S * 1000) : null;
	const updated = event.U ? new Date(event.U * 1000) : null;
	const isLive = typeof event.SS === "number" ? event.SS > 0 : Boolean(event.LI);
	const score = typeof event.SC === "string" ? event.SC : undefined;
	const match = {
		provider: "db-bet",
		providerEventId: String(event.I),
		sport: event.SE,
		sportName: event.SN,
		league: event.LE,
		country: event.CN,
		teamHome: event.O1,
		teamAway: event.O2,
		statusCode: event.SS ?? null,
		timePeriod: event.TN,
		startTime: start,
		lastUpdate: updated,
		isLive,
		score: score ?? null,
		raw: event,
	};
	const odds: { type: string; home?: number; draw?: number; away?: number; line?: number }[] = [];
	if (Array.isArray(event.E)) {
		// 1x2 odds typically have G==1, T: 1(home),2(draw),3(away)
		const oneXtwo = event.E.filter((e: any) => e.G === 1);
		if (oneXtwo.length >= 3) {
			const home = oneXtwo.find((e: any) => e.T === 1)?.C;
			const draw = oneXtwo.find((e: any) => e.T === 2)?.C;
			const away = oneXtwo.find((e: any) => e.T === 3)?.C;
			odds.push({ type: "1x2", home, draw, away });
		}
	}
	return { match, odds };
}

export async function POST(_req: NextRequest) {
	const res = await fetch(FEED_URL, { cache: "no-store" });
	if (!res.ok) return new Response("feed error", { status: 502 });
	const data: FeedResponse = await res.json();
	const events = Array.isArray(data.Value) ? data.Value : [];

	let upserted = 0;
	for (const ev of events) {
		const { match, odds } = parseEventToMatch(ev);
		const dbMatch = await prisma.match.upsert({
			where: { provider_providerEventId: { provider: match.provider, providerEventId: match.providerEventId } },
			create: {
				...match,
				odds: { createMany: { data: odds } },
			},
			update: {
				...match,
			},
		});
		// Replace odds for existing match
		await prisma.matchOdds.deleteMany({ where: { matchId: dbMatch.id } });
		if (odds.length) {
			await prisma.matchOdds.createMany({ data: odds.map((o) => ({ ...o, matchId: dbMatch.id })) });
		}
		upserted++;
	}
	return Response.json({ upserted, count: events.length });
}