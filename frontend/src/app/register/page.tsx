"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [role, setRole] = useState<'CANDIDATE' | 'HR'>('CANDIDATE');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam === 'HR') setRole('HR');
    }, [searchParams]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

            // Save token and role
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('role', data.data.role);

            // Redirect based on role
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
        <div className="flex items-center justify-center min-h-[85vh] py-8">
            <div className="w-full max-w-lg glass p-10 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-2xl shadow-emerald-900/10 border border-neutral-700">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Create an Account</h2>
                    <p className="text-neutral-400 mt-2">Join TalentRank to {role === 'CANDIDATE' ? 'prove your skills' : 'find elite talent'}</p>
                </div>

                {/* Role Toggle */}
                <div className="flex rounded-xl bg-neutral-900/50 p-1 mb-8 border border-neutral-800">
                    <button
                        type="button"
                        onClick={() => setRole('CANDIDATE')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${role === 'CANDIDATE' ? 'bg-green-600 text-white shadow-md' : 'text-neutral-400 hover:text-neutral-200'}`}
                    >
                        Candidate
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('HR')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${role === 'HR' ? 'bg-emerald-600 text-white shadow-md' : 'text-neutral-400 hover:text-neutral-200'}`}
                    >
                        HR / Recruiter
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300 ml-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900/50 border border-neutral-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none text-neutral-100 placeholder:text-neutral-500"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900/50 border border-neutral-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none text-neutral-100 placeholder:text-neutral-500"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900/50 border border-neutral-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none text-neutral-100"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 mt-4 text-white rounded-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 ${role === 'CANDIDATE' ? 'bg-green-600 hover:bg-green-500 shadow-green-600/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'}`}
                    >
                        {loading ? 'Creating Account...' : `Create ${role === 'CANDIDATE' ? 'Candidate' : 'HR'} Profile`}
                    </button>
                </form>

                <p className="text-center text-neutral-400 mt-8 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-green-400 hover:text-green-300 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function Register() {
    return (
        <Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center">Loading...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
