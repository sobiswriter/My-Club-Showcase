'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Book, Star, GitFork } from 'lucide-react';
import { projects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';
import { cn } from '@/lib/utils';

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-2 mb-2">
        <Book className="w-4 h-4 text-muted-foreground" />
        <Link href="#" className="text-lg font-semibold text-primary hover:underline">
          {project.name}
        </Link>
        <Badge variant="outline" className="h-5">{project.status}</Badge>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{project.description}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full ${project.languageColor}`} />
          <span>{project.language}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>{project.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          <span>{project.forks}</span>
        </div>
        <span>Updated {project.updatedAt}</span>
      </div>
    </div>
  );
}

const TWEEN_FACTOR = 4.2;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

function ProjectGallery() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [tweenValues, setTweenValues] = React.useState<number[]>([])

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    
    const engine = api.internalEngine();
    const scrollSnap = api.scrollSnapList();
    
    const getTweenValues = (): number[] => {
      const values: number[] = [];
      for (const snap of scrollSnap) {
        const diffToTarget = snap - engine.location.get();
        const tweenValue = 1 - Math.abs(diffToTarget / 100);
        values.push(numberWithinRange(tweenValue, 0, 1));
      }
      return values;
    };
    setTweenValues(getTweenValues());
  }, []);

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('select', onSelect)
    api.on('scroll', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
      <div className="embla-3d">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            containScroll: 'trimSnaps'
          }}
          className="w-full"
        >
          <CarouselContent>
            {projects.map((project, index) => {
              const tweenStyle = tweenValues[index] ? {
                transform: `scale(${1 - 0.2 * (1 - tweenValues[index])}) rotateY(${-15 * (1 - tweenValues[index]) * Math.sign(index - (api?.selectedScrollSnap() || 0))}deg)`,
                opacity: 0.5 + 0.5 * tweenValues[index]
              } : {};

              return(
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3 transition-transform duration-500 ease-out">
                <div className="p-1 h-full" style={{...tweenStyle, transformStyle: 'preserve-3d'}}>
                  <Card className='h-full'>
                    <CardContent className="flex flex-col aspect-video items-start justify-between p-4 h-full">
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        width={600}
                        height={400}
                        className="rounded-md object-cover w-full h-3/5"
                        data-ai-hint={project.dataAiHint}
                      />
                      <div className="mt-4 flex-1">
                        <h3 className="text-lg font-semibold text-primary">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )})}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
}


export default function ProjectsPage() {
  return (
    <div className="container max-w-5xl py-8">

      <ProjectGallery />

      <div className="mb-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Input placeholder="Find a project..." className="flex-1" />
           <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Type</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Web Apps</DropdownMenuItem>
                <DropdownMenuItem>Mobile Apps</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Language</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>TypeScript</DropdownMenuItem>
                <DropdownMenuItem>Python</DropdownMenuItem>
                <DropdownMenuItem>Go</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Last updated</DropdownMenuItem>
                <DropdownMenuItem>Name</DropdownMenuItem>
                <DropdownMenuItem>Most stars</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md bg-card text-card-foreground">
        <div className="p-4">
          <h2 className="text-xl font-semibold">All Projects ({projects.length})</h2>
        </div>
        <Separator />
        <div>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
