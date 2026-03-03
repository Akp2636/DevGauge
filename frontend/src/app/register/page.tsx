"use client";
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [role, setRole] = useState<'CANDIDATE' | 'HR'>('CANDIDATE');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam === 'HR') setRole('HR');
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            localStorage.setItem('token', data.data.token);
            localStorage.setItem('role', data.data.role);

            if (data.data.role === 'HR') {
                router.push('/hr/dashboard');
            } else {
                router.push('/candidate/dashboard');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[85vh] py-12 px-4"
            style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)' }}>

            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-slate-200/80 px-8 py-10"
                style={{ animation: 'fadeSlideUp 0.4s ease both' }}>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-sm mb-4 shadow-md shadow-emerald-200">
                        DG
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create your account</h1>
                    <p className="text-slate-500 mt-1.5 text-sm">
                        {role === 'CANDIDATE'
                            ? 'Showcase your skills to top companies'
                            : 'Find and hire the best engineering talent'}
                    </p>
                </div>

                {/* Segmented Role Toggle */}
                <div className="relative flex bg-slate-100 rounded-xl p-1 mb-7 gap-1">
                    {/* Sliding indicator */}
                    <div
                        className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-sm border border-slate-200 transition-transform duration-200 ease-in-out"
                        style={{ transform: role === 'HR' ? 'translateX(calc(100% + 8px))' : 'translateX(0)' }}
                    />
                    <button
                        type="button"
                        onClick={() => setRole('CANDIDATE')}
                        className={`relative flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors duration-150 z-10 ${role === 'CANDIDATE' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        👨‍💻 Candidate
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('HR')}
                        className={`relative flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors duration-150 z-10 ${role === 'HR' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        🏢 HR / Recruiter
                    </button>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/10 hover:border-slate-400"
                            placeholder="Alex Johnson"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/10 hover:border-slate-400"
                            placeholder="you@company.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/10 hover:border-slate-400"
                            placeholder="Min 8 characters"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        style={{
                            background: loading
                                ? '#6b7280'
                                : 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
                            boxShadow: loading ? 'none' : '0 4px 20px rgba(16, 185, 129, 0.35)',
                        }}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Creating Account...
                            </span>
                        ) : (
                            `Create ${role === 'CANDIDATE' ? 'Candidate' : 'HR'} Account →`
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-xs text-slate-400 font-medium">already a member?</span>
                    <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Sign In Link */}
                <Link
                    href="/login"
                    className="flex items-center justify-center w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-150"
                >
                    Sign In to Your Account
                </Link>

                {/* Legal */}
                <p className="text-center text-xs text-slate-400 mt-5 leading-relaxed">
                    By creating an account, you agree to our{' '}
                    <span className="text-slate-600 hover:underline cursor-pointer">Terms of Service</span>
                    {' '}and{' '}
                    <span className="text-slate-600 hover:underline cursor-pointer">Privacy Policy</span>.
                </p>
            </div>

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default function Register() {
    return (
        <Suspense fallback={
            <div className="min-h-[85vh] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <RegisterForm />
        </Suspense>
    );
}
