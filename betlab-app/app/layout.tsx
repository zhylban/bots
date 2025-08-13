import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BetLab",
  description: "Live & strategies",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <header className="border-b border-[var(--border)] bg-[var(--muted)]/60 backdrop-blur supports-[backdrop-filter]:bg-[var(--muted)]/40">
          <div className="container px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg">BetLab</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:text-[var(--accent)] transition">Матчи</Link>
              <Link href="/strategies" className="hover:text-[var(--accent)] transition">Стратегии</Link>
              <Link href="/api/auth/signin" className="badge px-3 py-1">Войти</Link>
            </nav>
          </div>
        </header>
        <div className="container px-6 py-8">
          {children}
        </div>
        <footer className="border-t border-[var(--border)] py-6 text-sm text-white/60">
          <div className="container px-6">© BetLab</div>
        </footer>
      </body>
    </html>
  );
}
