'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Search,
  FileCode,
  Layout,
  BookOpen,
  Building2,
  List,
  Clock // Use Clock instead of History if needed
} from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { PROBLEMS } from '@/lib/problems-data';

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 lg:h-10 lg:w-60 lg:justify-start lg:px-3 lg:text-sm text-muted-foreground mr-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 lg:mr-2" />
        <span className="hidden lg:inline-flex">Search problems...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </Button>
      {mounted && (
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
                <Layout className="mr-2 h-4 w-4" />
                Dashboard
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push('/problems'))}>
                <FileCode className="mr-2 h-4 w-4" />
                Problems
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push('/study-plans'))}>
                <Calendar className="mr-2 h-4 w-4" />
                Study Plans
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push('/companies'))}>
                 <Building2 className="mr-2 h-4 w-4" />
                 Companies
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push('/patterns'))}>
                 <List className="mr-2 h-4 w-4" />
                 Patterns
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Problems (Top Results)">
              {PROBLEMS.map((problem) => (
                <CommandItem
                  key={problem.id}
                  // Using problem name + category for better search matching
                  value={`${problem.name} ${problem.category} ${problem.difficulty}`}
                  onSelect={() => runCommand(() => window.open(problem.url, '_blank'))}
                >
                  <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                          <FileCode className="mr-2 h-4 w-4" />
                          <span>{problem.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">{problem.category}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      )}
    </>
  );
}
