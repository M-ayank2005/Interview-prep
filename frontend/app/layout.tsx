import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Navigation } from '@/components/navigation';
import { QueryProvider } from '@/components/query-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Interview Prep - Master Your Technical Interview',
  description: 'Production-grade interview preparation platform for SDE roles with comprehensive DSA problems, patterns, company prep, and more.',
  generator: 'v0.app',
  keywords: ['interview prep', 'DSA', 'algorithms', 'data structures', 'leetcode', 'coding interview'],
  authors: [{ name: 'Interview Prep' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${_geist.className} font-sans antialiased bg-background text-foreground`}>
        <QueryProvider>
          <Navigation />
          {children}
          <Toaster position="top-right" richColors closeButton />
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
