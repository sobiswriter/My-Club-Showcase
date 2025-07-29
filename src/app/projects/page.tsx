import Link from 'next/link';
import { Book, Star, GitFork, History } from 'lucide-react';
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


export default function ProjectsPage() {
  return (
    <div className="container max-w-5xl py-8">
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
          <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>
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
