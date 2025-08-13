import Link from "next/link";

type MatchItem = {
	id: string;
	teamHome: string | null;
	teamAway: string | null;
	league: string | null;
	score: string | null;
};

type Paged<T> = { items: T[] };

async function fetchJSON<T>(path: string): Promise<T> {
	const res = await fetch(path, { cache: "no-store" });
	return res.json();
}

function MatchRow({ m }: { m: MatchItem }) {
	return (
		<li className="grid grid-cols-[1fr_auto] items-center gap-2 px-4 py-3 border-b border-[var(--border)] last:border-0">
			<span className="text-sm md:text-base">
				<span className="text-white/90">{m.teamHome}</span>
				<span className="text-white/40">  </span>
				<span className="text-white/90">{m.teamAway}</span>
				<span className="ml-2 text-xs text-white/50">({m.league})</span>
			</span>
			<span className="badge px-2 py-1 text-xs">{m.score ?? "-"}</span>
		</li>
	);
}

export default async function Home() {
	const [live, past] = await Promise.all([
		fetchJSON<Paged<MatchItem>>("/api/matches?live=1&pageSize=10"),
		fetchJSON<Paged<MatchItem>>("/api/matches?past=1&pageSize=10"),
	]);
	return (
		<main className="space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl md:text-3xl font-bold tracking-tight">Матчи</h1>
				<form action="/api/matches/ingest" method="post">
					<button className="btn-primary px-4 py-2" formMethod="post">Обновить матчи</button>
				</form>
			</div>

			<section className="card overflow-hidden">
				<div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
					<h2 className="text-lg font-semibold">Лайв</h2>
					<Link href="/matches/live" className="text-sm text-[var(--accent)]">Все</Link>
				</div>
				<ul>
					{live.items?.map((m) => (
						<MatchRow key={m.id} m={m} />
					))}
				</ul>
			</section>

			<section className="card overflow-hidden">
				<div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
					<h2 className="text-lg font-semibold">Прошедшие</h2>
					<Link href="/matches/past" className="text-sm text-[var(--accent)]">Все</Link>
				</div>
				<ul>
					{past.items?.map((m) => (
						<MatchRow key={m.id} m={m} />
					))}
				</ul>
			</section>

			<section className="flex items-center gap-4">
				<Link className="badge px-3 py-2" href="/strategies">Стратегии</Link>
				<Link className="text-[var(--accent)]" href="/api/strategies">API</Link>
			</section>
		</main>
	);
}
