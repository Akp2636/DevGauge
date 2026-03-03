"use client";
import React, { useState } from 'react';
import { BookmarkIcon, BriefcaseIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon, StarIcon } from '@heroicons/react/24/solid';

const DEMO_JOBS = [
    {
        id: 1,
        title: "Executive - Human Resource",
        company: "Artech India",
        experience: "0-3 Yrs",
        location: "Mumbai, New Delhi",
        description: "Manage offboarding activities, such as exit interviews and separation processing. Employee relations, screening, interviewing.",
        tags: ["HR Executive", "Media strategy", "Process documentation"],
        posted: "3+ weeks ago",
        featured: false,
        saved: false,
    },
    {
        id: 2,
        title: "HR Executive (FTM)",
        company: "ITC",
        rating: 3.9,
        reviews: 7046,
        experience: "0-1 Yrs",
        location: "Kolkata",
        description: "Qualifications - Graduate. Media strategy, process documentation, social media.",
        tags: ["HR Executive", "Media strategy", "Process documentation"],
        posted: "3+ weeks ago",
        featured: false,
        saved: true,
    },
    {
        id: 3,
        title: "Sales Officer",
        company: "Leading Indian Consumer Electronics",
        rating: 3.5,
        experience: "0-5 Yrs",
        location: "Kolkata, Bhubaneswar",
        description: "Drive sales initiatives, build client relationships, manage distribution channels efficiently.",
        tags: ["Sales Strategy", "Channel Management"],
        posted: "2 weeks ago",
        featured: true,
        saved: false,
    },
    {
        id: 4,
        title: "Frontend Developer - React",
        company: "TechNova Solutions",
        rating: 4.2,
        experience: "2-5 Yrs",
        location: "Remote, Bangalore",
        description: "Build robust user interfaces using modern React, TailwindCSS. Ensure high performance and responsiveness.",
        tags: ["React", "TypeScript", "Tailwind CSS"],
        posted: "2 days ago",
        featured: true,
        saved: false,
    }
];

export default function JobsPage() {
    const [savedJobs, setSavedJobs] = useState<number[]>([2]);

    const toggleSave = (id: number) => {
        if (savedJobs.includes(id)) {
            setSavedJobs(savedJobs.filter(jobId => jobId !== id));
        } else {
            setSavedJobs([...savedJobs, id]);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-screen py-8 pt-4 animate-in fade-in duration-700">

            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                <div className="glass p-6 rounded-2xl border border-neutral-800">
                    <h2 className="text-xl font-bold mb-6 tracking-tight">All Filters</h2>

                    {/* Experience Filter */}
                    <div className="mb-8 border-b border-neutral-800 pb-6">
                        <h3 className="font-semibold mb-4 text-neutral-300 flex justify-between items-center">
                            Experience
                            <span className="text-xs font-normal text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Any</span>
                        </h3>
                        <div className="relative pt-4 px-2">
                            <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 w-1/3 rounded-full"></div>
                            </div>
                            <div className="absolute top-2.5 left-1/3 w-4 h-4 bg-white rounded-full shadow border-2 border-emerald-500 cursor-pointer"></div>
                            <div className="flex justify-between text-xs text-neutral-500 mt-3 px-1">
                                <span>0 Yrs</span>
                                <span>Any</span>
                            </div>
                        </div>
                    </div>

                    {/* Salary Filter */}
                    <div className="mb-8 border-b border-neutral-800 pb-6">
                        <h3 className="font-semibold mb-4 text-neutral-300">Salary</h3>
                        <div className="space-y-3">
                            {[
                                { label: "0-3 Lakhs", count: 1417 },
                                { label: "3-6 Lakhs", count: 2445 },
                                { label: "6-10 Lakhs", count: 1834 },
                                { label: "10-15 Lakhs", count: 676 },
                            ].map((item, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-neutral-900 accent-emerald-500" />
                                    <span className="text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">
                                        {item.label} <span className="text-neutral-600">({item.count})</span>
                                    </span>
                                </label>
                            ))}
                            <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors mt-2">View More</button>
                        </div>
                    </div>

                    {/* Department Filter */}
                    <div>
                        <h3 className="font-semibold mb-4 text-neutral-300">Department</h3>
                        <div className="space-y-3">
                            {[
                                { label: "Sales & Business Dev", count: 1219 },
                                { label: "Human Resources", count: 735 },
                                { label: "Administration & Fac", count: 300 },
                                { label: "Customer Success", count: 299 },
                            ].map((item, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-neutral-900 accent-emerald-500" />
                                    <span className="text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">
                                        {item.label} <span className="text-neutral-600">({item.count})</span>
                                    </span>
                                </label>
                            ))}
                            <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors mt-2">View More</button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 glass rounded-xl border border-neutral-800 mb-6 gap-4">
                    <p className="text-sm text-neutral-400 font-medium">
                        1 - 4 of 3734 <span className="text-neutral-200">Portal Jobs</span>
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-neutral-500">Sort by:</span>
                        <select className="bg-neutral-900 border border-neutral-700 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500 text-neutral-200 cursor-pointer">
                            <option>Relevance</option>
                            <option>Date Posted</option>
                            <option>Salary: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Job List */}
                <div className="space-y-5">
                    {DEMO_JOBS.map((job) => (
                        <div key={job.id} className="relative group glass p-6 rounded-2xl border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-emerald-900/20">

                            {/* Featured Badge */}
                            {job.featured && (
                                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                                    FEATURED
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors cursor-pointer mb-2">
                                        {job.title}
                                    </h2>
                                    <div className="flex items-center gap-3 text-sm text-neutral-400">
                                        <span className="font-semibold text-neutral-300">{job.company}</span>
                                        {job.rating && (
                                            <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded text-xs font-bold">
                                                <StarIcon className="w-3 h-3" />
                                                {job.rating} {job.reviews && <span className="text-neutral-500 font-normal ml-0.5">({job.reviews})</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Save Button */}
                                <button
                                    onClick={() => toggleSave(job.id)}
                                    className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-emerald-400 transition-colors"
                                >
                                    {savedJobs.includes(job.id) ? (
                                        <BookmarkSolidIcon className="w-6 h-6 text-emerald-500" />
                                    ) : (
                                        <BookmarkIcon className="w-6 h-6" />
                                    )}
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-neutral-400 mb-5">
                                <div className="flex items-center gap-1.5">
                                    <BriefcaseIcon className="w-4 h-4 text-neutral-500" />
                                    {job.experience}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPinIcon className="w-4 h-4 text-neutral-500" />
                                    {job.location}
                                </div>
                            </div>

                            <p className="text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-2">
                                {job.description}
                            </p>

                            <div className="flex items-center gap-2 mb-6 flex-wrap">
                                {job.tags.map((tag, i) => (
                                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-neutral-800/50 text-neutral-300 border border-neutral-700/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-5 border-t border-neutral-800">
                                <span className="text-xs text-neutral-500">{job.posted}</span>
                                <button className="px-5 py-2 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 hover:text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-emerald-900/10 hover:shadow-emerald-600/20 active:scale-95">
                                    Easy Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
