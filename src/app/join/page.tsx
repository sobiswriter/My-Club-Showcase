import { submitApplication } from "@/app/join/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function JoinPage() {
  const applicationTemplate = `<!-- 
Tell us a bit about yourself.
- What are you passionate about?
- What technologies are you interested in?
- What's your GitHub username?
-->
`;
  return (
    <form action={submitApplication}>
      <div className="container max-w-5xl py-8">
        <div className="mb-4 pb-2 border-b">
            <h1 className="text-2xl font-bold">Submit new application</h1>
            <p className="text-muted-foreground">Become a part of our community!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
                <Label htmlFor="title">Your Name</Label>
                <Input id="title" name="title" placeholder="e.g., Ada Lovelace" className="mt-1" required />
            </div>
            
            <div>
                <Label htmlFor="body">Tell us about yourself</Label>
                <div className="mt-1 border rounded-md">
                    <Textarea
                        id="body"
                        name="body"
                        className="font-code"
                        placeholder="Leave a comment"
                        rows={15}
                        defaultValue={applicationTemplate}
                        required
                    />
                </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="p-4 space-y-4 border rounded-md bg-card">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" className="mt-1" required/>
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input id="linkedin" name="linkedin" placeholder="linkedin.com/in/your-profile" className="mt-1"/>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4 mt-4 border-t">
            <Button type="submit" className="bg-success text-white hover:bg-success/90">Submit new application</Button>
        </div>
      </div>
    </form>
  );
}
