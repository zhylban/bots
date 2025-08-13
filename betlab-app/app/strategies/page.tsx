type Strategy = {
	id: string;
	name: string;
	description: string | null;
	isPublic: boolean;
	rating?: { winRate: number; roi: number; totalPicks: number } | null;
};

async function fetchStrategies(): Promise<{ items: Strategy[] }> {
	const res = await fetch("/api/strategies", { cache: "no-store" });
	return res.json();
}

export default async function StrategiesPage() {
	const { items } = await fetchStrategies();
	return (
		<main className="space-y-6">
			<h1 className="text-2xl md:text-3xl font-bold tracking-tight">Стратегии</h1>
			<section className="card overflow-hidden">
				<div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
					<h2 className="text-lg font-semibold">Публичные</h2>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="text-white/60">
							<tr className="text-left">
								<th className="px-4 py-2">Название</th>
								<th className="px-4 py-2">Описание</th>
								<th className="px-4 py-2">Win%</th>
								<th className="px-4 py-2">ROI</th>
								<th className="px-4 py-2">Ставок</th>
							</tr>
						</thead>
						<tbody>
							{items.map((s) => (
								<tr key={s.id} className="border-t border-[var(--border)]">
									<td className="px-4 py-3 font-medium">{s.name}</td>
									<td className="px-4 py-3 text-white/70">{s.description ?? "—"}</td>
									<td className="px-4 py-3">{Math.round((s.rating?.winRate ?? 0) * 100)}%</td>
									<td className="px-4 py-3">{((s.rating?.roi ?? 0) * 100).toFixed(1)}%</td>
									<td className="px-4 py-3">{s.rating?.totalPicks ?? 0}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</main>
	);
}