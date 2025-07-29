import Image from "next/image";
import Link from "next/link";
import { members } from "@/lib/data";
import { Trophy, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const contributions = [
  { memberId: 1, points: 2048, projects: 5 },
  { memberId: 2, points: 1820, projects: 8 },
  { memberId: 3, points: 1536, projects: 4 },
  { memberId: 4, points: 1250, projects: 3 },
];

export default function WallOfFamePage() {
  const leaderboard = contributions
    .map(c => {
      const member = members.find(m => m.id === c.memberId);
      return { ...member, ...c };
    })
    .sort((a, b) => b.points - a.points);

  return (
    <div className="container max-w-5xl py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Wall of Fame</h1>
        <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <div className="p-4 border rounded-md bg-card">
        <h2 className="text-xl font-semibold mb-4">Top Contributors</h2>
        <div className="space-y-4">
            {leaderboard.map((member) => (
              member.id && (
                <div key={member.id} className="flex items-center gap-4 p-3 border-b last:border-b-0">
                    <Image src={member.avatarUrl!} alt={member.name!} width={40} height={40} className="rounded-full" data-ai-hint={member.dataAiHint} />
                    <div className="flex-1">
                        <Link href="#" className="font-semibold text-primary hover:underline">{member.name}</Link>
                        <p className="text-sm text-muted-foreground">@{member.username}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span>{member.points} Points</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            <span>{member.projects} Projects</span>
                        </div>
                    </div>
                </div>
              )
            ))}
        </div>
      </div>
      
      <div className="mt-8 p-4 border rounded-md bg-card">
          <h2 className="text-xl font-semibold mb-4">Achievement Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge className="px-4 py-2 text-base bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700">Project Pioneer</Badge>
            <Badge className="px-4 py-2 text-base bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700">Knowledge Sharer</Badge>
            <Badge className="px-4 py-2 text-base bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700">Hackathon Winner</Badge>
            <Badge className="px-4 py-2 text-base bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700">Top Contributor</Badge>
          </div>
      </div>
    </div>
  );
}
