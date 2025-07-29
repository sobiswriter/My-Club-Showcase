'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Book, Star, GitFork, ArrowRight } from 'lucide-react';
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';

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


function ProjectGallery() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden group">
                  <CardContent className="p-0 relative">
                    <div className="absolute inset-0 bg-black/50 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <Button asChild variant="secondary" className="group-hover:animate-in group-hover:fade-in group-hover:zoom-in-90 duration-500">
                          <Link href="#">
                            View Project <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                       </Button>
                    </div>
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      width={600}
                      height={400}
                      className="object-cover w-full h-[250px] group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      data-ai-hint={project.dataAiHint}
                    />
                  </CardContent>
                </Card>
                 <div className="mt-4">
                    <h3 className="text-lg font-semibold text-primary">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                  </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
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
