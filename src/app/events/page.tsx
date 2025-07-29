import Link from 'next/link';
import { events } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, AlertCircle } from 'lucide-react';

const typeColors: { [key: string]: string } = {
  Workshop: 'bg-blue-500 hover:bg-blue-600',
  Talk: 'bg-purple-500 hover:bg-purple-600',
  Hackathon: 'bg-green-500 hover:bg-green-600',
};

function EventItem({ event }: { event: (typeof events)[0] }) {
  const statusColor = event.status === 'Open' ? 'text-green-500' : 'text-purple-500';
  const badgeColor = typeColors[event.type] || 'bg-gray-500';

  return (
    <div className="flex items-start gap-4 p-4 border-b">
      <AlertCircle className={`mt-1 h-5 w-5 ${statusColor}`} />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Link href="#" className="font-semibold hover:text-primary">
            {event.title}
          </Link>
          <Badge className={`text-white ${badgeColor}`}>{event.type}</Badge>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span># {event.id} opened by {event.author}</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <div className="container max-w-5xl py-8">
      <div className="flex flex-col items-start gap-4 mb-4 md:flex-row md:items-center">
        <div className="flex-1">
            <Input placeholder="Search all events" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Labels</Button>
          <Button className="bg-success text-white hover:bg-success/90">New Event</Button>
        </div>
      </div>

      <div className="border rounded-md bg-card text-card-foreground">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="#" className="font-semibold">
              <AlertCircle className="inline w-4 h-4 mr-1" />
              {events.filter(e => e.status === 'Open').length} Open
            </Link>
          </div>
        </div>
        <Separator />
        <div>
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
