import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Team7 Syndicate // Anonymous Developer Club',
  description: 'Pseudonymous showcase of open-source repositories, anonymous operatives, zero-knowledge circuits, and relativistic systems.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head />
      <body className={cn('min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="devclub-theme"
          enableSystem
        >
          <div className="relative flex min-h-dvh flex-col bg-[#0d1117]">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
