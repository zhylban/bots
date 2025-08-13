import type { NextAuthOptions, Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				const user = await prisma.user.findUnique({ where: { email: credentials.email } });
				if (!user?.passwordHash) return null;
				const ok = await bcrypt.compare(credentials.password, user.passwordHash);
				return ok ? user : null;
			},
		}),
		...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
			? [Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET })]
			: []),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async jwt({ token, user }) {
			if (user) (token as any).userId = user.id;
			return token;
		},
		async session({ session, token }) {
			const s = session as Session & { userId?: string };
			const t = token as any;
			if (t?.userId) s.userId = t.userId as string;
			return s;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};