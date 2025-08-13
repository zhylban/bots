"use server";

import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function registerUser(email: string, password: string, name?: string) {
	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) throw new Error("Email already registered");
	const passwordHash = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({ data: { email, passwordHash, name } });
	return { id: user.id, email: user.email };
}