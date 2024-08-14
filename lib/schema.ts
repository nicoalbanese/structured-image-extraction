import { z } from "zod";

export const structuredImageSchema = z.object({
  books: z.array(
    z.object({
      title: z.string(),
      author: z.string(),
    }),
  ),
});
