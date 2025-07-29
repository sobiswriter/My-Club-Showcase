import Link from 'next/link';
import { Code, MessageSquare, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const gists = [
  { id: 1, name: "setup-tailwind.js", description: "Quick setup for Tailwind CSS in Next.js", files: 1, comments: 5, language: "JavaScript" },
  { id: 2, name: "server-actions.ts", description: "Using server actions for form submissions", files: 2, comments: 12, language: "TypeScript" },
  { id: 3, name: "deployment.md", description: "Guide to deploying on Vercel", files: 1, comments: 2, language: "Markdown" },
];

export default function BlogPage() {
  return (
    <div className="container max-w-5xl py-8">
        <h1 className="text-3xl font-bold mb-6">Knowledge Hub</h1>
        <div className="space-y-4">
            {gists.map(gist => (
                <div key={gist.id} className="p-4 border-b">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <Link href="#" className="text-primary hover:underline">{gist.name}</Link>
                            <p className="text-sm text-muted-foreground mt-1">{gist.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                <span className="flex items-center gap-1"><Code className="w-4 h-4" /> {gist.files} {gist.files > 1 ? 'files' : 'file'}</span>
                                <Badge variant="outline">{gist.language}</Badge>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                             <Link href="#" className="flex items-center gap-1 hover:text-primary"><Star className="w-4 h-4" /> Star</Link>
                             <Link href="#" className="flex items-center gap-1 hover:text-primary"><MessageSquare className="w-4 h-4" /> {gist.comments}</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
