import Image from 'next/image';
import Link from 'next/link';
import { members } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin } from 'lucide-react';

function TeamMemberCard({ member }: { member: (typeof members)[0] }) {
    return (
        <div className="flex items-center gap-4">
            <Image
                src={member.avatarUrl}
                alt={member.name}
                width={48}
                height={48}
                className="rounded-full"
                data-ai-hint={member.dataAiHint}
            />
            <div>
                <div className="flex items-center gap-2">
                    <Link href="#" className="font-semibold text-primary hover:underline">{member.name}</Link>
                    <Badge variant="secondary">{member.role}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
        </div>
    );
}

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <article className="prose dark:prose-invert max-w-none prose-headings:border-b prose-headings:pb-2 prose-h1:text-4xl">
        <h1>About Team7</h1>
        
        <div className="p-6 border rounded-md bg-card">
            <h2 className="mt-0">Our Mission</h2>
            <p className="lead text-muted-foreground">
                To create a dynamic, professional, and engaging digital hub. The website will embody our team's mission—to gather, teach, and create value—through a design language that our community knows and trusts.
            </p>
        </div>

        <div className="p-6 mt-8 border rounded-md bg-card">
            <h2>Our Story</h2>
            <p>Founded with a shared passion for code, Team7 has grown into a vibrant community of innovators, thinkers, and creators. We believe in the power of collaboration and open-source principles to drive learning and build meaningful projects. This showcase is a testament to that spirit.</p>
            <p>We host weekly workshops, monthly tech talks, and a semesterly hackathon, all designed to push the boundaries of our knowledge and skills. Whether you're a seasoned developer or just starting, there's a place for you here.</p>
        </div>

        <div className="p-6 mt-8 border rounded-md bg-card">
            <h2>Core Team</h2>
            <div className="space-y-6">
                {members.filter(m => ['President', 'Lead Mentor'].includes(m.role)).map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                ))}
            </div>
        </div>
      </article>
    </div>
  );
}
