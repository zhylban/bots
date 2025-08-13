import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const live = searchParams.get("live");
	const past = searchParams.get("past");
	const page = Number(searchParams.get("page") ?? 1);
	const pageSize = Math.min(100, Number(searchParams.get("pageSize") ?? 20));

	const where: any = {};
	if (live === "1") where.isLive = true;
	if (past === "1") where.startTime = { lt: new Date() };

	const items = await prisma.match.findMany({
		where,
		orderBy: [{ isLive: "desc" }, { startTime: "desc" }],
		skip: (page - 1) * pageSize,
		take: pageSize,
		include: { odds: true },
	});
	const total = await prisma.match.count({ where });
	return Response.json({ items, total, page, pageSize });
}