import { structuredImageSchema } from "@/lib/schema";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";

export async function POST(req: Request) {
  const { image } = await req.json();

  if (!image) {
    return new Response("No image data provided", { status: 400 });
  }

  const result = await streamObject({
    schema: structuredImageSchema,
    model: openai("gpt-4o"),
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe the image based on the schema." },
          {
            image,
            type: "image",
          },
        ],
      },
    ],
  });

  return result.toTextStreamResponse();
}
