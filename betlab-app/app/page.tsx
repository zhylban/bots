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

export default async function Home() {
	const [live, past] = await Promise.all([
		fetchJSON<Paged<MatchItem>>("/api/matches?live=1&pageSize=10"),
		fetchJSON<Paged<MatchItem>>("/api/matches?past=1&pageSize=10"),
	]);
	return (
		<main className="p-6 space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">BetLab</h1>
				<form action="/api/matches/ingest" method="post">
					<button className="px-3 py-2 bg-blue-600 text-white rounded" formMethod="post">Обновить матчи</button>
				</form>
			</div>
			<section>
				<h2 className="text-xl font-semibold mb-2">Лайв</h2>
				<ul className="space-y-1">
					{live.items?.map((m) => (
						<li key={m.id} className="flex items-center justify-between border p-2 rounded">
							<span>{m.teamHome} — {m.teamAway} ({m.league})</span>
							<span className="text-sm text-gray-600">{m.score ?? "-"}</span>
						</li>
					))}
				</ul>
			</section>
			<section>
				<h2 className="text-xl font-semibold mb-2">Прошедшие</h2>
				<ul className="space-y-1">
					{past.items?.map((m) => (
						<li key={m.id} className="flex items-center justify-between border p-2 rounded">
							<span>{m.teamHome} — {m.teamAway} ({m.league})</span>
							<span className="text-sm text-gray-600">{m.score ?? "-"}</span>
						</li>
					))}
				</ul>
			</section>
			<section>
				<Link className="text-blue-600 underline" href="/api/strategies">Стратегии API</Link>
			</section>
		</main>
	);
}
