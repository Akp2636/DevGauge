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
      <body className="min-h-screen bg-[#0a0a0a] text-neutral-50 relative overflow-x-hidden">
        {/* Animated background gradient */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-900/20 to-transparent -z-10 pointer-events-none" />

        <nav className="w-full h-16 glass sticky top-0 z-50 flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-green-600 to-emerald-600 flex items-center justify-center font-bold text-white shadow-lg shadow-green-500/20">JP</div>
            <a href="/" className="font-bold text-lg tracking-tight hover:text-green-300">TalentRank</a>
          </div>
          <div className="flex gap-4">
            <a href="/login" className="px-4 py-2 text-sm font-medium hover:text-green-400 transition-colors">Login</a>
            <a href="/register" className="px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-500 rounded-md transition-colors shadow-lg shadow-green-600/20">Sign Up</a>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
