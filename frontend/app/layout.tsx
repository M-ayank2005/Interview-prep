import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { AppSidebar } from '@/components/app-sidebar';
import { Navigation } from '@/components/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { QueryProvider } from '@/components/query-provider';
import { AuthProvider } from '@/components/auth-provider';
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
          <AuthProvider>
            <SidebarProvider>
              <Navigation />
              <AppSidebar />
              <SidebarInset className="overflow-hidden pt-16">
                <div className="flex-1 overflow-auto">
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
