'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { CommandMenu } from '@/components/command-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mainNavItems = [
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/problems', label: 'Problems' },
];

const allNavItems = [...mainNavItems];

export function Navigation() {
	const pathname = usePathname();
	const { user, logout, isLoading } = useAuth();

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex items-center justify-between h-16'>
					<div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
					  <Link
						  href='/dashboard'
						  className='font-bold text-lg text-primary hover:opacity-80 transition-opacity flex items-center gap-2 ml-2'
					  >
						  <Sparkles className='w-5 h-5' />
						  <span className="hidden sm:inline-block">Interview Prep</span>
					  </Link>
          </div>

					{/* Desktop Navigation */}
					<div className='hidden xl:flex items-center gap-1 flex-1 px-4'>
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

					</div>

          <div className="flex items-center gap-2">
            <CommandMenu />
						
						{!isLoading && (
							user ? (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" className="relative h-8 w-8 rounded-full ml-2">
											<Avatar className="h-8 w-8">
												<AvatarImage src={user.avatar} alt={user.name || 'User'} />
												<AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56" align="end" forceMount>
										<DropdownMenuLabel className="font-normal">
											<div className="flex flex-col space-y-1">
												<p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
												<p className="text-xs leading-none text-muted-foreground">
													{user.email || 'No email'}
												</p>
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => logout()}>
											Log out
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<div className="hidden xl:flex items-center gap-2 ml-2">
									<Button variant="outline" size="sm" asChild>
										<Link href="/login">Log in</Link>
									</Button>
									<Button size="sm" asChild>
										<Link href="/signup">Sign up</Link>
									</Button>
								</div>
							)
						)}
          </div>
				</div>
			</div>
		</nav>
	);
}
