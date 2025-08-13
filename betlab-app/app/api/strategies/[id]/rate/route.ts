import { prisma } from "@/app/lib/prisma";

export async function POST(_req: Request, { params }: any) {
	const strategyId = params.id as string;
	const picks = await prisma.strategyPick.findMany({ where: { strategyId } });
	const total = picks.length;
	const wins = picks.filter((p) => p.result === "won").length;
	const losses = picks.filter((p) => p.result === "lost").length;
	const voids = picks.filter((p) => p.result === "void").length;
	let profit = 0;
	for (const p of picks) {
		const stake = p.stake ?? 1;
		if (p.result === "won" && p.oddsAtPick) profit += (p.oddsAtPick - 1) * stake;
		else if (p.result === "lost") profit -= stake;
	}
	const winRate = total > 0 ? wins / total : 0;
	const roi = total > 0 ? profit / total : 0;
	const rating = await prisma.strategyRating.upsert({
		where: { strategyId },
		create: { strategyId, totalPicks: total, wins, losses, voids, winRate, roi, profit },
		update: { totalPicks: total, wins, losses, voids, winRate, roi, profit, updatedAt: new Date() },
	});
	return Response.json(rating);
}