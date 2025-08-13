import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get("userId");
	const where: any = userId ? { userId } : { isPublic: true };
	const items = await prisma.strategy.findMany({
		where,
		orderBy: { createdAt: "desc" },
		include: { rating: true },
	});
	return Response.json({ items });
}

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session || !(session as any).userId) return new Response("Unauthorized", { status: 401 });
	const body = await req.json();
	const { name, description, rules, isPublic } = body ?? {};
	if (!name || !rules) return new Response("Invalid", { status: 400 });
	const created = await prisma.strategy.create({
		data: {
			userId: (session as any).userId,
			name,
			description: description ?? null,
			rules,
			isPublic: Boolean(isPublic),
			// init rating row
			rating: { create: {} },
		},
		include: { rating: true },
	});
	return Response.json(created);
}