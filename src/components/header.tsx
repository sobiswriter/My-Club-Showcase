import Link from 'next/link';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Members', href: '/members' },
  { name: 'Events', href: '/events' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

function Team7Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15h-3v-2.5h3V17zm0-4.5h-3V10h3v2.5zm0-4.5h-3V5.5h3V8zm6 9h-3v-2.5h3V17zm0-4.5h-3V10h3v2.5z" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-5xl">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Team7Icon className="h-6 w-6" />
            <span className="font-bold">Team7</span>
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
