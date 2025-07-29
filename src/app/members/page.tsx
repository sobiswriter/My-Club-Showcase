import Link from 'next/link';
import Image from 'next/image';
import { members } from '@/lib/data';
import { Github, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function MemberCard({ member }: { member: (typeof members)[0] }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-md bg-card">
      <Image
        src={member.avatarUrl}
        alt={member.name}
        width={60}
        height={60}
        className="rounded-full"
        data-ai-hint={member.dataAiHint}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
            <Link href="#" className="font-semibold text-primary hover:underline">{member.name}</Link>
        </div>
        <p className="text-sm text-muted-foreground">{member.bio}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <Link href="#" className="flex items-center gap-1 hover:text-primary">
                <Github className="w-4 h-4" />
                <span>{member.socials.github}</span>
            </Link>
            <Link href="#" className="flex items-center gap-1 hover:text-primary">
                <Linkedin className="w-4 h-4" />
                <span>{member.socials.linkedin}</span>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default function MembersPage() {
  return (
    <div className="container max-w-5xl py-8">
      <div className="flex flex-col items-start gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Members</h1>
        <div className="flex w-full gap-2 md:w-auto">
            <Input placeholder="Find a member..." className="flex-1 md:w-64" />
            <Button variant="secondary">Search</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
