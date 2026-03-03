"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full relative">
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 w-full px-4">
        <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500">
            Quantify Your Talent,
            <br /> Skip the Resume Filter.
          </h1>

          <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            We rate developers like competitive programmers. Evolve from <span className="text-neutral-500 font-semibold">Newbie</span> to <span className="text-neutral-900 font-semibold">Grandmaster</span> based on verified skills, real projects, and technical depth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-8">
          <Link
            href="/register?role=CANDIDATE"
            className="group relative px-8 py-4 bg-neutral-900 text-white hover:bg-neutral-800 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden text-lg"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            <span className="relative">Prove Your Coding Rank</span>
          </Link>
          <Link
            href="/register?role=HR"
            className="group px-8 py-4 bg-white hover:bg-neutral-50 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 text-lg border border-neutral-200 text-neutral-800 shadow-sm"
          >
            <span className="group-hover:text-black transition-colors">Hire Ranked Developers</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mt-24">
          {[
            {
              title: "Smart Skill Profiling",
              desc: "Connect your GitHub and competitive profiles. We auto-verify your technical depth and assign a global rating.",
              icon: "🧠",
              color: "from-neutral-200 to-neutral-300 text-neutral-900"
            },
            {
              title: "Objective Ranks",
              desc: "From Pupil to Grandmaster. Instantly signal your exact competency level to top tech recruiters.",
              icon: "🏆",
              color: "from-gray-300 to-neutral-400 text-black"
            },
            {
              title: "Advanced HR Filters",
              desc: "Zero resume scrolling. HR filters directly by skill score, verifications, and rank tags with our Talent Heatmap.",
              icon: "📊",
              color: "from-neutral-300 to-gray-400 text-neutral-900"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-6 shadow-sm`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 1: Developer Visualization */}
      <section className="w-full py-24 bg-neutral-50 px-4 mt-12 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200 text-neutral-700 text-sm font-medium">For Developers</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">Showcase actual ability, not just buzzwords.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Drop the traditional resume. DevGauge links directly to your code integrations to analyze your commits, code quality, and problem-solving speed. We map all your capabilities to a standardized ranking graph so employers see your true potential instantly.
            </p>
            <ul className="space-y-3 text-neutral-600 font-medium pt-4">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span> Automated code review analysis</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span> Proof-of-Work portfolio verification</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span> Transparent algorithm tiers</li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 transform rotate-1 hover:rotate-0 transition duration-500">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400"></div>
                <div>
                  <h4 className="text-xl font-bold text-neutral-900">Alex Frontend</h4>
                  <p className="text-sm text-neutral-500">Rank: Expert Modeler</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-neutral-900">1840</div>
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">DevGauge Score</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1"><span className="text-neutral-700">React & Next.js</span><span className="text-neutral-900">Top 5%</span></div>
                <div className="w-full bg-neutral-100 rounded-full h-2"><div className="bg-neutral-800 h-2 rounded-full w-[95%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1"><span className="text-neutral-700">System Design</span><span className="text-neutral-900">Top 15%</span></div>
                <div className="w-full bg-neutral-100 rounded-full h-2"><div className="bg-neutral-600 h-2 rounded-full w-[85%]"></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Recruiter Visualization */}
      <section className="w-full py-24 bg-white px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-white text-sm font-medium">For Recruiters</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">Hire with mathematical certainty.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              No more guessing if a candidate knows React or just watched a tutorial. DevGauge provides deep analytical search filters matching your exact job requirements directly against statistically significant developer scores.
            </p>
            <ul className="space-y-3 text-neutral-600 font-medium pt-4">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span> Custom filtering by tech stack and rank</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span> Eliminates technical screening rounds</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span> Instant access to pre-vetted grandmasters</li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-neutral-50 rounded-2xl shadow-lg border border-neutral-200 p-6">
            <div className="mb-4">
              <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Live Search Query</h4>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-white border border-neutral-200 rounded text-sm font-medium shadow-sm text-neutral-800">Role: Full Stack</span>
                <span className="px-3 py-1 bg-neutral-900 text-white rounded text-sm font-medium shadow-sm">Min Score: 1600+</span>
                <span className="px-3 py-1 bg-white border border-neutral-200 rounded text-sm font-medium shadow-sm text-neutral-800">Skill: Typescript</span>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-100 shadow-sm hover:border-neutral-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-200 rounded-full"></div>
                    <div>
                      <div className="text-sm font-bold text-neutral-900">Pre-vetted Engineer</div>
                      <div className="text-xs text-neutral-500">Available to interview</div>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-md transition-colors">Select</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
