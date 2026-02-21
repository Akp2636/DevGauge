"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Codeforces-style Ranking for Tech Talent
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-50 via-green-200 to-emerald-300">
          Quantify Your Talent,
          <br /> Skip the Resume Filter.
        </h1>

        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
          We rate developers like competitive programmers. Evolve from <span className="text-[#94a3b8] font-semibold">Newbie</span> to <span className="text-[#ef4444] font-semibold">Grandmaster</span> based on verified skills, real projects, and technical depth.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-8">
        <Link
          href="/register?role=CANDIDATE"
          className="group relative px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] overflow-hidden text-lg"
        >
          <div className="absolute inset-0 bg-white/20 tranneutral-y-full group-hover:tranneutral-y-0 transition-transform duration-300 ease-in-out"></div>
          <span className="relative">Prove Your Coding Rank</span>
        </Link>
        <Link
          href="/register?role=HR"
          className="group px-8 py-4 glass hover:bg-neutral-800/80 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 text-lg border border-neutral-700 hover:border-emerald-500/50"
        >
          <span className="group-hover:text-emerald-400 transition-colors">Hire Ranked Developers</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mt-24">
        {[
          {
            title: "Smart Skill Profiling",
            desc: "Connect your GitHub and competitive profiles. We auto-verify your technical depth and assign a global rating.",
            icon: "🧠",
            color: "from-green-500 to-cyan-500"
          },
          {
            title: "Codeforces-style Ranks",
            desc: "From Pupil to Grandmaster. Instantly signal your exact competency level to top tech recruiters.",
            icon: "🏆",
            color: "from-emerald-500 to-purple-500"
          },
          {
            title: "Advanced HR Filters",
            desc: "Zero resume scrolling. HR filters directly by skill score, verifications, and rank tags with our Talent Heatmap.",
            icon: "📊",
            color: "from-emerald-500 to-teal-500"
          }
        ].map((feature, i) => (
          <div key={i} className="glass p-8 rounded-2xl hover:-tranneutral-y-2 transition-transform duration-300 border border-neutral-700/50 hover:border-neutral-500">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-6 shadow-lg`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
