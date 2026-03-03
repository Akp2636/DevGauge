import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Portal - Skill Based Rating',
  description: 'A Codeforces-style job portal where talent is ranked by skill signals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 relative overflow-x-hidden">
        {/* Animated background gradient */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-neutral-200/50 to-transparent -z-10 pointer-events-none" />

        <nav className="w-full h-16 glass sticky top-0 z-50 flex items-center justify-between px-8 border-b border-neutral-200/50 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neutral-800 to-neutral-600 flex items-center justify-center font-bold text-white shadow-lg shadow-neutral-400/20">DG</div>
            <a href="/" className="font-bold text-lg tracking-tight text-neutral-800 hover:text-neutral-600">DevGauge</a>
          </div>
          <div className="flex gap-4 items-center">
            <a href="/jobs" className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Jobs</a>
            <a href="/login" className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Login</a>
            <a href="/register" className="px-4 py-2 text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-white rounded-md transition-colors shadow-lg shadow-neutral-900/20">Sign Up</a>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
