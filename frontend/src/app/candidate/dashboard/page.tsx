"use client";
import { useState } from 'react';

export default function CandidateDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header Profile Section */}
            <div className="glass p-8 rounded-3xl border border-neutral-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -tranneutral-y-1/2 tranneutral-x-1/3 pointer-events-none"></div>
                <div className="flex items-start justify-between relative z-10">
                    <div className="flex gap-6 items-center">
                        <div className="w-24 h-24 rounded-2xl bg-neutral-800 border-2 border-neutral-600 flex items-center justify-center text-3xl font-bold shadow-xl">
                            JD
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">John Doe</h1>
                            <p className="text-neutral-400 text-lg">Full Stack Developer • 4 YoE</p>
                            <div className="flex gap-3 mt-3">
                                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-semibold flex items-center gap-1 shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    Candidate Master (1950)
                                </span>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium">
                                    Available to hire
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 rounded-lg transition-colors text-sm font-medium shadow-md">
                        Edit Profile
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Left Column - Stats & Skills */}
                <div className="space-y-6 md:col-span-1">
                    {/* Rank Progress */}
                    <div className="glass p-6 rounded-2xl border border-neutral-700">
                        <h3 className="font-semibold text-lg mb-4 flex justify-between items-center">
                            Next Rank: <span className="text-[#f59e0b]">Master</span>
                        </h3>
                        <div className="w-full bg-neutral-800 rounded-full h-3 mb-2 shadow-inner">
                            <div className="bg-gradient-to-r from-emerald-500 to-[#f59e0b] h-3 rounded-full shadow-lg" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-sm text-neutral-400 text-right">1950 / 2100 pts</p>
                    </div>

                    {/* Skill Radar / List */}
                    <div className="glass p-6 rounded-2xl border border-neutral-700 h-80 flex flex-col">
                        <h3 className="font-semibold text-lg mb-4">Verified Skills</h3>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {[
                                { name: 'React', score: 92, verified: true },
                                { name: 'Node.js', score: 85, verified: true },
                                { name: 'System Design', score: 78, verified: false },
                                { name: 'PostgreSQL', score: 88, verified: true },
                            ].map(skill => (
                                <div key={skill.name} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-2">
                                            {skill.name}
                                            {skill.verified && <span className="text-green-400 text-xs" title="Project Verified">✓</span>}
                                        </span>
                                        <span className="text-neutral-400">{skill.score}</span>
                                    </div>
                                    <div className="w-full bg-neutral-800 rounded-full h-1.5">
                                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${skill.score}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Evidence & Projects */}
                <div className="space-y-6 md:col-span-2">
                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-neutral-700 pb-px">
                        {['Overview', 'Projects Evidence', 'Skill Tests'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`pb-3 px-4 text-sm font-medium transition-colors ${activeTab === tab.toLowerCase() ? 'text-green-400 border-b-2 border-green-400' : 'text-neutral-400 hover:text-neutral-200'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl">Verified Projects</h3>
                            <button className="px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium shadow-lg shadow-green-500/20 transition-all">+ Add Project</button>
                        </div>

                        {[1, 2].map((i) => (
                            <div key={i} className="glass p-6 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-colors group">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-lg group-hover:text-green-400 transition-colors">Distributed Task Queue</h4>
                                    <span className="px-2 py-1 bg-neutral-800 rounded text-xs font-mono text-neutral-300">Complexity: 89</span>
                                </div>
                                <p className="text-neutral-400 text-sm mb-4">Built a high-throughput priority queue system using Node.js and Redis, capable of handling 10k ops/sec. Implemented graceful degradation and persistence strategies.</p>

                                <div className="p-3 bg-green-900/10 border border-green-500/20 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-green-300 font-medium mb-1">
                                        <span>✨ AI Evaluation Insight</span>
                                    </div>
                                    <p className="text-xs text-neutral-300 leading-relaxed">
                                        Strong demonstration of backend system design. Uses proper concurrency limiters and shows deep understanding of Redis persistence mechanics...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
