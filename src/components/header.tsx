import Link from 'next/link';
import { Github, Star } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from './ui/separator';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Members', href: '/members' },
  { name: 'Events', href: '/events' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-5xl">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Github className="h-6 w-6" />
            <span className="font-bold">DevClub</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors text-foreground/60 hover:text-foreground/80"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild variant="outline" size="sm">
                <Link href="#">
                    <Star className="mr-2 h-4 w-4" /> Star on GitHub
                </Link>
            </Button>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
