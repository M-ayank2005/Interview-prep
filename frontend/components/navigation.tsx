'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { CommandMenu } from '@/components/command-menu';

const mainNavItems = [
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/problems', label: 'Problems' },
	{ href: '/patterns', label: 'Patterns' },
	{ href: '/study-plans', label: 'Study Plans' },
	{ href: '/companies', label: 'Companies' },
];

const moreNavItems = [
	{ href: '/cheat-sheets', label: 'Cheat Sheets' },
	{ href: '/complexity', label: 'Complexity' },
	{ href: '/tips', label: 'Interview Tips' },
	{ href: '/scheduler', label: 'Mock Interviews' },
];

const allNavItems = [...mainNavItems, ...moreNavItems];

export function Navigation() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [moreMenuOpen, setMoreMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<nav className='sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex items-center justify-between h-16'>
					<Link
						href='/dashboard'
						className='font-bold text-lg text-primary hover:opacity-80 transition-opacity flex items-center gap-2'
					>
						<Sparkles className='w-5 h-5' />
						Interview Prep
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden lg:flex items-center gap-1'>
						{mainNavItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.href}
									href={item.href}
									className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
										isActive
											? 'bg-primary text-primary-foreground'
											: 'text-muted-foreground hover:text-foreground hover:bg-muted'
									}`}
								>
									{item.label}
								</Link>
							);
						})}

						{/* More dropdown */}
						<div className='relative'>
							<button
								onClick={() => setMoreMenuOpen(!moreMenuOpen)}
								className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
									moreNavItems.some((item) => pathname === item.href)
										? 'bg-primary text-primary-foreground'
										: 'text-muted-foreground hover:text-foreground hover:bg-muted'
								}`}
							>
								More <ChevronDown className='w-4 h-4' />
							</button>
							{moreMenuOpen && (
								<>
									<div
										className='fixed inset-0 z-10'
										onClick={() => setMoreMenuOpen(false)}
									/>
									<div className='absolute right-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg z-20 py-1'>
										{moreNavItems.map((item) => {
											const isActive = pathname === item.href;
											return (
												<Link
													key={item.href}
													href={item.href}
													className={`block px-4 py-2 text-sm transition-colors ${
														isActive
															? 'bg-primary/10 text-primary'
															: 'text-foreground hover:bg-muted'
													}`}
													onClick={() => setMoreMenuOpen(false)}
												>
													{item.label}
												</Link>
											);
										})}
									</div>
								</>
							)}
						</div>
					</div>

          <div className="flex items-center gap-2">
            <CommandMenu />
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
				</div>

				{/* Mobile Navigation */}
				{mobileMenuOpen && (
					<div className='lg:hidden pb-4 space-y-1'>
						{allNavItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.href}
									href={item.href}
									className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
										isActive
											? 'bg-primary text-primary-foreground'
											: 'text-muted-foreground hover:text-foreground hover:bg-muted'
									}`}
									onClick={() => setMobileMenuOpen(false)}
								>
									{item.label}
								</Link>
							);
						})}
					</div>
				)}
			</div>
		</nav>
	);
}
