"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email.includes('hr')) router.push('/hr/dashboard');
        else router.push('/candidate/dashboard');
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md glass p-8 rounded-3xl animate-in fade-in zoom-in duration-500 shadow-2xl shadow-green-900/20 border border-neutral-700">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-green-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 mb-4 text-xl font-bold">JP</div>
                    <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
                    <p className="text-neutral-400 mt-2">Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900/50 border border-neutral-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none text-neutral-100 placeholder:text-neutral-500"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-sm font-medium text-neutral-300">Password</label>
                            <a href="#" className="text-sm font-medium text-green-400 hover:text-green-300">Forgot password?</a>
                        </div>
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
                        className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold shadow-lg shadow-green-600/20 transition-all hover:-tranneutral-y-0.5"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-neutral-400 mt-8 text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="font-semibold text-green-400 hover:text-green-300 transition-colors">
                        Create one now
                    </Link>
                </p>
            </div>
        </div>
    );
}
