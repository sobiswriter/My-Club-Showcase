import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import Hyperspeed from '@/components/hyperspeed';
import { hyperspeedPresets } from '@/lib/hyperspeed-presets';

export default function HomePage() {
  return (
    <div className="relative isolate overflow-hidden bg-background h-screen">
       <Hyperspeed
        effectOptions={hyperspeedPresets.akira}
      />
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40 relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 text-center lg:text-left">
           <p className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Click & hold to see the real magic of hyperspeed!
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mt-4">
            A Hub for Creative Developers
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Showcasing the innovative projects and talented members of Team7. Explore our work, join our events, and become part of the community.
          </p>
          <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
            <Button asChild size="lg" className="shadow-lg shadow-primary/20">
              <Link href="/projects">
                Explore Projects
                <MoveRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="link" size="lg" className="text-foreground">
              <Link href="/about">Learn more <span aria-hidden="true">→</span></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
