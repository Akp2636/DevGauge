"use client";
import { useState } from 'react';

export default function HRDashboard() {
    const [minScore, setMinScore] = useState(1500);
    const [selectedRanks, setSelectedRanks] = useState<string[]>(['Master', 'Grandmaster']);

    const toggleRank = (rank: string) => {
        if (selectedRanks.includes(rank)) setSelectedRanks(selectedRanks.filter(r => r !== rank));
        else setSelectedRanks([...selectedRanks, rank]);
    };

    const ranks = [
        { name: 'Grandmaster', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
        { name: 'Master', color: 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30' },
        { name: 'Candidate Master', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
        { name: 'Expert', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
        { name: 'Specialist', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-3xl font-bold">Talent Discovery</h1>
                    <p className="text-neutral-400 mt-1">Filter by verified skill signals, not keywords.</p>
                </div>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium shadow-lg shadow-green-500/20 transition-all">
                    Create Skill Test
                </button>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Filters Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass p-6 rounded-2xl border border-neutral-700">
                        <h3 className="font-semibold mb-4">Rank Filters</h3>
                        <div className="flex flex-wrap gap-2">
                            {ranks.map(r => (
                                <button
                                    key={r.name}
                                    onClick={() => toggleRank(r.name)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${selectedRanks.includes(r.name) ? r.color : 'bg-neutral-800/50 text-neutral-400 border-neutral-700 hover:border-neutral-500'}`}
                                >
                                    {r.name}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8">
                            <div className="flex justify-between text-sm mb-2">
                                <h3 className="font-semibold">Min Skill Score</h3>
                                <span className="text-green-400">{minScore}</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="3000" step="100"
                                value={minScore}
                                onChange={(e) => setMinScore(parseInt(e.target.value))}
                                className="w-full accent-green-500"
                            />
                        </div>
                    </div>

                    <div className="glass p-6 rounded-2xl border border-neutral-700">
                        <h3 className="font-semibold mb-4 text-sm flex items-center justify-between">
                            Skill Heatmap (Live)
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </h3>
                        <div className="space-y-3">
                            {[
                                { skill: 'React', supply: 85, demand: 90 },
                                { skill: 'Go', supply: 30, demand: 80 },
                                { skill: 'Kubernetes', supply: 15, demand: 75 },
                            ].map(stat => (
                                <div key={stat.skill} className="text-xs">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-neutral-300">{stat.skill}</span>
                                        <span className={stat.demand > stat.supply ? 'text-red-400' : 'text-emerald-400'}>
                                            {stat.demand > stat.supply ? 'High Demand' : 'Balanced'}
                                        </span>
                                    </div>
                                    <div className="w-full bg-neutral-800 h-1.5 flex rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full" style={{ width: `${stat.supply}%` }} title="Supply"></div>
                                        <div className="bg-red-500/50 h-full" style={{ width: `${stat.demand - stat.supply}%` }} title="Demand Gap"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Candidates Grid */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex justify-between text-sm text-neutral-400 px-2 pb-2 border-b border-neutral-700/50">
                        <span>Showing 24 Elite Candidates</span>
                        <span>Sorted by: Rating Score ↓</span>
                    </div>

                    {[
                        { name: 'Sarah Chen', role: 'Backend Engineer', rank: 'Grandmaster', score: 2540, xp: 6, tagColor: 'text-red-400 border-red-500/30 bg-red-500/10' },
                        { name: 'David Kim', role: 'Full Stack', rank: 'Master', score: 2210, xp: 4, tagColor: 'text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/10' },
                        { name: 'Elena V.', role: 'Frontend Architect', rank: 'Candidate Master', score: 1980, xp: 8, tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
                    ].map(c => (
                        <div key={c.name} className="glass p-6 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-all group flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                            <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-600 flex-shrink-0 flex items-center justify-center font-bold text-xl shadow-inner">
                                {c.name.charAt(0)}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="text-lg font-bold group-hover:text-green-400 transition-colors">{c.name}</h3>
                                        <p className="text-neutral-400 text-sm">{c.role} • {c.xp} YoE</p>
                                    </div>
                                    <div className={`px-3 py-1 border rounded-md text-xs font-bold font-mono ${c.tagColor}`}>
                                        {c.rank} ({c.score})
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-neutral-900/50 rounded-lg text-sm text-neutral-300 border border-neutral-800 flex items-start gap-3">
                                    <span className="text-green-400 text-lg mt-0.5">🚀</span>
                                    <p>
                                        <span className="font-semibold text-neutral-200">AI Signal:</span> Top 1% in Distributed Systems. Deep expertise in Postgres internals proven by 3 complex verified projects. Ready for senior technical leadership.
                                    </p>
                                </div>
                            </div>

                            <div className="w-full sm:w-auto flex sm:flex-col gap-2">
                                <button className="flex-1 sm:flex-none px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium transition-colors">
                                    View Profile
                                </button>
                                <button className="flex-1 sm:flex-none px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 rounded-lg text-sm font-medium transition-colors">
                                    Shortlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
