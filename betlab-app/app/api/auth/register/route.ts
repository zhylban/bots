import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
	const body = await req.json().catch(() => null);
	const { email, password, name } = body ?? {};
	if (!email || !password) return new Response("Invalid", { status: 400 });
	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) return new Response("Email exists", { status: 409 });
	const passwordHash = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({ data: { email, passwordHash, name: name ?? null } });
	return Response.json({ id: user.id, email: user.email });
}