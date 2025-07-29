import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code, Grid, MoveRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            A Hub for Creative Developers
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Showcasing the innovative projects and talented members of the Developer&apos;s Club. Explore our work, join our events, and become part of the community.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button asChild size="lg" className="shadow-lg shadow-primary/20">
              <Link href="/projects">
                Explore Projects
                <MoveRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="link" size="lg">
              <Link href="/about">Learn more <span aria-hidden="true">→</span></Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <div className="p-2 rounded-xl bg-foreground/5 ring-1 ring-inset ring-foreground/10" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <div className="w-[400px] h-[300px] rounded-md bg-card border p-4 flex flex-col gap-2 shadow-xl">
                        <div className="flex items-center gap-2">
                            <Code className="text-primary"/>
                            <p className="text-sm font-semibold">server-actions.ts</p>
                        </div>
                        <div className="h-full bg-foreground/5 rounded-sm p-2 text-xs font-mono text-muted-foreground overflow-hidden">
                            <p>&quot;use server&quot;;</p>
                            <p>import &#123; z &#125; from &quot;zod&quot;;</p>
                            <p>const schema = z.object(&#123;</p>
                            <p>  name: z.string().min(1),</p>
                            <p>  email: z.string().email(),</p>
                            <p>&#125;);</p>
                            <p>export async function submit(formData: FormData) &#123;</p>
                            <p>  // ...</p>
                            <p>&#125;</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" style={{ animation: 'glow 4s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  );
}
