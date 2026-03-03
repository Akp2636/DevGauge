"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
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
        <div
            className="flex items-center justify-center min-h-[85vh] px-4 py-12"
            style={{ background: 'linear-gradient(160deg, #f9fafb 0%, #f3f4f6 100%)' }}
        >
            <div
                className="w-full bg-white rounded-2xl border border-gray-200"
                style={{
                    maxWidth: 420,
                    padding: 48,
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 10px 40px -8px rgba(0,0,0,0.1)',
                    animation: 'authFadeUp 0.35s ease both',
                }}
            >
                {/* Brand */}
                <div className="flex flex-col items-center mb-8">
                    <div
                        className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-900 text-white font-bold text-sm mb-5 select-none"
                        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
                    >
                        DG
                    </div>
                    <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Welcome back</h1>
                    <p className="text-sm text-zinc-500 mt-1">Sign in to your DevGauge account</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-800 mb-1.5">
                            Email address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="w-full px-3.5 py-2.5 text-sm text-zinc-900 bg-white border border-gray-200 rounded-xl outline-none placeholder:text-zinc-400 transition-all hover:border-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-zinc-800">
                                Password
                            </label>
                            <a href="#" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3.5 py-2.5 text-sm text-zinc-900 bg-white border border-gray-200 rounded-xl outline-none placeholder:text-zinc-400 transition-all hover:border-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Signing in...
                            </span>
                        ) : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-zinc-400">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Create account */}
                <Link
                    href="/register"
                    className="flex items-center justify-center w-full py-2.5 rounded-xl border border-gray-200 text-zinc-800 text-sm font-semibold hover:bg-gray-50 hover:border-zinc-300 transition-all duration-150"
                >
                    Create an account
                </Link>

                <p className="text-center text-xs text-zinc-400 mt-5 leading-relaxed">
                    By continuing you agree to our{' '}
                    <span className="text-zinc-600 hover:underline cursor-pointer">Terms</span>
                    {' '}and{' '}
                    <span className="text-zinc-600 hover:underline cursor-pointer">Privacy Policy</span>.
                </p>
            </div>

            <style>{`
                @keyframes authFadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
