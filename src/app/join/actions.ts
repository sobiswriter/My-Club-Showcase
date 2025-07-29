"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  email: z.string().email(),
  linkedin: z.string().optional(),
});

export async function submitApplication(formData: FormData) {
  const parsed = schema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    email: formData.get("email"),
    linkedin: formData.get("linkedin"),
  });

  if (!parsed.success) {
    // Handle validation errors
    // In a real app, you would return this to the client
    console.error("Validation failed:", parsed.error.errors);
    return { error: "Invalid data" };
  }

  // In a real application, you would save this data to a database.
  console.log("New application received:");
  console.log(parsed.data);

  // You might want to revalidate a path if you were displaying applications
  // e.g., revalidatePath('/admin/applications');

  // For now, we can just log it.
  return { success: true };
}
