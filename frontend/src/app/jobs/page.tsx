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
        description: "Manage offboarding activities, such as exit interviews and separation processing. Support employee relations, screening and interviewing across functions.",
        tags: ["HR Executive", "Media Strategy", "Process Documentation"],
        posted: "3+ weeks ago",
        featured: false,
    },
    {
        id: 2,
        title: "HR Executive (FTM)",
        company: "ITC",
        rating: 3.9,
        reviews: 7046,
        experience: "0-1 Yrs",
        location: "Kolkata",
        description: "Qualifications: Graduate. Responsibilities include media strategy, process documentation and social media coordination.",
        tags: ["HR Executive", "Media Strategy", "Process Documentation"],
        posted: "3+ weeks ago",
        featured: false,
    },
    {
        id: 3,
        title: "Sales Officer",
        company: "Leading Indian Consumer Electronics",
        rating: 3.5,
        experience: "0-5 Yrs",
        location: "Kolkata, Bhubaneswar",
        description: "Drive sales initiatives, build lasting client relationships, and manage distribution channels efficiently across assigned territories.",
        tags: ["Sales Strategy", "Channel Management"],
        posted: "2 weeks ago",
        featured: true,
    },
    {
        id: 4,
        title: "Frontend Developer — React",
        company: "TechNova Solutions",
        rating: 4.2,
        reviews: 312,
        experience: "2-5 Yrs",
        location: "Remote · Bangalore",
        description: "Build robust user interfaces using modern React and TypeScript. Ensure high performance, accessibility, and responsiveness across all platforms.",
        tags: ["React", "TypeScript", "Tailwind CSS"],
        posted: "2 days ago",
        featured: true,
    },
];

const SALARY_OPTIONS = [
    { label: "0–3 Lakhs", count: 1417 },
    { label: "3–6 Lakhs", count: 2445 },
    { label: "6–10 Lakhs", count: 1834 },
    { label: "10–15 Lakhs", count: 676 },
];

const DEPARTMENT_OPTIONS = [
    { label: "Sales & Business Dev", count: 1219 },
    { label: "Human Resources", count: 735 },
    { label: "Administration", count: 300 },
    { label: "Customer Success", count: 299 },
];

export default function JobsPage() {
    const [savedJobs, setSavedJobs] = useState<number[]>([2]);

    const toggleSave = (id: number) => {
        setSavedJobs(prev =>
            prev.includes(id) ? prev.filter(j => j !== id) : [...prev, id]
        );
    };

    return (
        <div
            className="min-h-screen px-4 py-8"
            style={{ background: '#f9fafb' }}
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">

                {/* ── Sidebar ── */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-20">
                        <h2 className="text-base font-semibold text-gray-900 mb-5">Filters</h2>

                        {/* Experience */}
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-gray-800">Experience</h3>
                                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Any</span>
                            </div>
                            <div className="relative pt-3 px-1">
                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-600 w-1/3 rounded-full" />
                                </div>
                                <div className="absolute top-1.5 left-[calc(33%-6px)] w-4 h-4 bg-white rounded-full shadow-md border-2 border-emerald-600 cursor-pointer" />
                                <div className="flex justify-between text-xs text-gray-500 mt-3">
                                    <span>0 Yrs</span>
                                    <span>Any</span>
                                </div>
                            </div>
                        </div>

                        {/* Salary */}
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">Salary</h3>
                            <div className="space-y-2.5">
                                {SALARY_OPTIONS.map((item, i) => (
                                    <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                                            {item.label}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-auto">({item.count})</span>
                                    </label>
                                ))}
                                <button className="text-emerald-600 text-xs font-semibold hover:text-emerald-700 transition-colors mt-1 block">
                                    View more
                                </button>
                            </div>
                        </div>

                        {/* Department */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">Department</h3>
                            <div className="space-y-2.5">
                                {DEPARTMENT_OPTIONS.map((item, i) => (
                                    <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                                            {item.label}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-auto">({item.count})</span>
                                    </label>
                                ))}
                                <button className="text-emerald-600 text-xs font-semibold hover:text-emerald-700 transition-colors mt-1 block">
                                    View more
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ── Main ── */}
                <main className="flex-1 min-w-0">
                    {/* Results bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-3 mb-5 gap-3">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-900">1–4</span> of{' '}
                            <span className="font-semibold text-gray-900">3,734</span> jobs
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Sort by:</span>
                            <select className="text-sm border border-gray-200 bg-white text-gray-800 rounded-lg px-3 py-1.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 cursor-pointer">
                                <option>Relevance</option>
                                <option>Date Posted</option>
                                <option>Salary: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Job Cards */}
                    <div className="space-y-4">
                        {DEMO_JOBS.map((job) => (
                            <div
                                key={job.id}
                                className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 p-6 group"
                            >
                                {/* Featured badge */}
                                {job.featured && (
                                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-zinc-900 text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
                                        FEATURED
                                    </div>
                                )}

                                {/* Card header */}
                                <div className="flex justify-between items-start gap-4 mb-3">
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors cursor-pointer leading-snug mb-1.5 truncate">
                                            {job.title}
                                        </h2>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-sm font-medium text-gray-700">{job.company}</span>
                                            {job.rating && (
                                                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded text-xs font-semibold">
                                                    <StarIcon className="w-3 h-3" />
                                                    {job.rating}
                                                    {job.reviews && (
                                                        <span className="text-gray-500 font-normal ml-0.5">({job.reviews.toLocaleString()})</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Save button */}
                                    <button
                                        onClick={() => toggleSave(job.id)}
                                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0"
                                        title={savedJobs.includes(job.id) ? 'Unsave job' : 'Save job'}
                                    >
                                        {savedJobs.includes(job.id) ? (
                                            <BookmarkSolidIcon className="w-5 h-5 text-emerald-600" />
                                        ) : (
                                            <BookmarkIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Meta info */}
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <BriefcaseIcon className="w-4 h-4 text-gray-400" />
                                        {job.experience}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                                        {job.location}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                                    {job.description}
                                </p>

                                {/* Tags */}
                                <div className="flex items-center gap-2 flex-wrap mb-5">
                                    {job.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <span className="text-xs text-gray-500">{job.posted}</span>
                                    <button className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-lg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0">
                                        Easy Apply
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
