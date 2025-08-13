import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET(_req: Request, { params }: any) {
	const strategyId = params.id as string;
	const picks = await prisma.strategyPick.findMany({
		where: { strategyId },
		orderBy: { createdAt: "desc" },
		include: { match: true },
	});
	return Response.json({ items: picks });
}

export async function POST(req: Request, { params }: any) {
	const session = await getServerSession(authOptions);
	if (!session || !(session as any).userId) return new Response("Unauthorized", { status: 401 });
	const strategyId = params.id as string;
	const body = await req.json();
	const { matchId, selection, stake } = body ?? {};
	if (!matchId || !["home", "draw", "away"].includes(selection)) return new Response("Invalid", { status: 400 });
	const match = await prisma.match.findUnique({ where: { id: matchId }, include: { odds: true } });
	if (!match) return new Response("Match not found", { status: 404 });
	const odds = match.odds.find((o) => o.type === "1x2");
	const oddsAtPick = selection === "home" ? odds?.home : selection === "draw" ? odds?.draw : odds?.away;
	const created = await prisma.strategyPick.create({
		data: { strategyId, matchId, selection, stake: stake ?? 1, oddsAtPick: oddsAtPick ?? null },
	});
	return Response.json(created);
}