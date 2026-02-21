"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CandidateDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // AI Project Form State
    const [showAddProject, setShowAddProject] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/candidate/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const json = await res.json();
                setProfile(json.data);
            } else {
                router.push('/login');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [router]);

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAnalyzing(true);
        try {
            const token = localStorage.getItem('token');
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/candidate/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title: projectTitle, description: projectDesc })
            });
            await fetchProfile(); // Refresh Data!
            setShowAddProject(false);
            setProjectTitle('');
            setProjectDesc('');
        } catch (err) {
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-[60vh] text-neutral-400">Loading Profile...</div>;
    if (!profile) return <div className="flex justify-center items-center h-[60vh] text-red-500">Failed to load profile.</div>;

    const user = profile.user;
    const skills = profile.skills || [];
    const projects = profile.projects || [];
    const minNextRankScore = user.ratingScore < 1200 ? 1200 : user.ratingScore < 1400 ? 1400 : user.ratingScore < 1600 ? 1600 : user.ratingScore < 1900 ? 1900 : user.ratingScore < 2100 ? 2100 : user.ratingScore < 2400 ? 2400 : 3000;
    const progressPercent = Math.min(((user.ratingScore / minNextRankScore) * 100), 100);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header Profile Section */}
            <div className="glass p-8 rounded-3xl border border-neutral-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="flex items-start justify-between relative z-10">
                    <div className="flex gap-6 items-center">
                        <div className="w-24 h-24 rounded-2xl bg-neutral-800 border-2 border-neutral-600 flex items-center justify-center text-3xl font-bold shadow-xl">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-neutral-400 text-lg">Candidate Developer • {profile.yearsExperience || 0} YoE</p>
                            <div className="flex gap-3 mt-3">
                                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-semibold flex items-center gap-1 shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    {user.rankTag} ({user.ratingScore})
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Left Column - Stats & Skills */}
                <div className="space-y-6 md:col-span-1">
                    {/* Rank Progress */}
                    <div className="glass p-6 rounded-2xl border border-neutral-700">
                        <h3 className="font-semibold text-lg mb-4 flex justify-between items-center">
                            Next Target: <span className="text-[#f59e0b]">{minNextRankScore} pts</span>
                        </h3>
                        <div className="w-full bg-neutral-800 rounded-full h-3 mb-2 shadow-inner">
                            <div className="bg-gradient-to-r from-emerald-500 to-[#f59e0b] h-3 rounded-full shadow-lg" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <p className="text-sm text-neutral-400 text-right">{user.ratingScore} / {minNextRankScore} pts</p>
                    </div>

                    {/* Skill Radar / List */}
                    <div className="glass p-6 rounded-2xl border border-neutral-700 h-80 flex flex-col">
                        <h3 className="font-semibold text-lg mb-4">Verified Skills</h3>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {skills.length === 0 ? (
                                <p className="text-sm text-neutral-500 italic">No skills added yet.</p>
                            ) : skills.map((s: any) => (
                                <div key={s.skill.id} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-2">
                                            {s.skill.name}
                                            {s.isVerified && <span className="text-green-400 text-xs" title="Verified">✓</span>}
                                        </span>
                                        <span className="text-neutral-400">{s.proficiencyScore}</span>
                                    </div>
                                    <div className="w-full bg-neutral-800 rounded-full h-1.5">
                                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${s.proficiencyScore}%` }}></div>
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
                            <button onClick={() => setShowAddProject(!showAddProject)} className="px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium shadow-lg shadow-green-500/20 transition-all">
                                {showAddProject ? 'Cancel' : '+ Add Project'}
                            </button>
                        </div>

                        {showAddProject && (
                            <form onSubmit={handleAddProject} className="glass p-6 rounded-xl border border-green-500/50 mb-6 space-y-4 animate-in fade-in slide-in-from-top-2">
                                <h4 className="font-bold text-green-400 flex items-center gap-2">✨ AI Project Evaluator</h4>
                                <p className="text-xs text-neutral-400">Paste your project description. Our AI will automatically evaluate its complexity, extract the core skills you used, and adjust your global rating score accordingly.</p>

                                <input required type="text" placeholder="Project Title (e.g. Distributed Task Queue)" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 outline-none text-sm focus:border-green-500" />
                                <textarea required rows={4} placeholder="Describe the architecture, scale, and challenges solved..." value={projectDesc} onChange={e => setProjectDesc(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 outline-none text-sm focus:border-green-500 resize-none"></textarea>

                                <button type="submit" disabled={isAnalyzing} className="w-full py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-50">
                                    {isAnalyzing ? 'Analyzing Complexity & Extracting Skills...' : 'Submit for Evaluation'}
                                </button>
                            </form>
                        )}

                        {projects.length === 0 ? (
                            <div className="glass p-8 rounded-xl border border-neutral-800 text-center text-neutral-500">
                                You haven&apos;t added any projects yet.
                            </div>
                        ) : projects.map((p: any) => (
                            <div key={p.id} className="glass p-6 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-colors group">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-lg group-hover:text-green-400 transition-colors">{p.title}</h4>
                                    <span className="px-2 py-1 bg-neutral-800 rounded text-xs font-mono text-neutral-300">Complexity: {p.aiComplexityScore}</span>
                                </div>
                                <p className="text-neutral-400 text-sm mb-4">{p.description}</p>

                                {p.aiSummary && (
                                    <div className="p-3 bg-green-900/10 border border-green-500/20 rounded-lg">
                                        <div className="flex items-center gap-2 text-sm text-green-300 font-medium mb-1">
                                            <span>✨ AI Evaluation Insight</span>
                                        </div>
                                        <p className="text-xs text-neutral-300 leading-relaxed">
                                            {p.aiSummary}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
