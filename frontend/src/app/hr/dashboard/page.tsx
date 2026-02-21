"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HRDashboard() {
    const router = useRouter();
    const [minScore, setMinScore] = useState(1500);
    const [selectedRanks, setSelectedRanks] = useState<string[]>(['Master', 'Grandmaster', 'Candidate Master']);
    const [candidates, setCandidates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
        { name: 'Pupil', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
        { name: 'Newbie', color: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30' },
    ];

    useEffect(() => {
        const fetchCandidates = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            setLoading(true);
            try {
                const query = new URLSearchParams({ minScore: minScore.toString() });
                if (selectedRanks.length > 0) {
                    query.append('ranks', selectedRanks.join(','));
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/hr/candidates?${query.toString()}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    const json = await res.json();
                    setCandidates(json.data);
                } else if (res.status === 401) {
                    router.push('/login');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        const debounce = setTimeout(() => {
            fetchCandidates();
        }, 300); // 300ms debounce

        return () => clearTimeout(debounce);
    }, [minScore, selectedRanks, router]);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500 min-h-[80vh]">
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
                                min="0" max="3000" step="10"
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
                        <div className="space-y-3 flex items-center justify-center p-4">
                            <p className="text-xs text-neutral-400 text-center">Aggregated from Live Active Set</p>
                        </div>
                    </div>
                </div>

                {/* Candidates Grid */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex justify-between text-sm text-neutral-400 px-2 pb-2 border-b border-neutral-700/50">
                        <span>Showing {candidates.length} Elite Candidates</span>
                        <span>Sorted by: Rating Score ↓</span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20 text-neutral-400 text-sm">
                            Querying Database...
                        </div>
                    ) : candidates.length === 0 ? (
                        <div className="glass p-10 rounded-xl border border-neutral-800 text-center text-neutral-500">
                            No candidates match the selected filters.
                        </div>
                    ) : candidates.map(c => {
                        const rankStyle = ranks.find(r => r.name === c.rankTag)?.color || 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
                        return (
                            <div key={c.id} className="glass p-6 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-all group flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-600 flex-shrink-0 flex items-center justify-center font-bold text-xl shadow-inner">
                                    {c.name.charAt(0).toUpperCase()}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h3 className="text-lg font-bold group-hover:text-green-400 transition-colors">{c.name}</h3>
                                            <p className="text-neutral-400 text-sm">{c.candidateProfile?.yearsExperience || 0} YoE</p>
                                        </div>
                                        <div className={`px-3 py-1 border rounded-md text-xs font-bold font-mono ${rankStyle}`}>
                                            {c.rankTag} ({c.ratingScore})
                                        </div>
                                    </div>

                                    {c.candidateProfile?.bio && (
                                        <div className="mt-4 p-3 bg-neutral-900/50 rounded-lg text-sm text-neutral-300 border border-neutral-800 flex items-start gap-3">
                                            <span className="text-green-400 text-lg mt-0.5">🚀</span>
                                            <p><span className="font-semibold text-neutral-200">AI Signal: </span>{c.candidateProfile.bio}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-2 mt-4 flex-wrap">
                                        {c.skills?.map((s: any) => (
                                            <span key={s.skill.id} className="px-2 py-0.5 bg-neutral-800 rounded text-xs text-neutral-300">
                                                {s.skill.name} <span className="text-emerald-500 ml-1">{s.proficiencyScore}</span> {s.isVerified && '✓'}
                                            </span>
                                        ))}
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
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
