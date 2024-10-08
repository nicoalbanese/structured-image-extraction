# Structured Image Extraction with Vercel AI SDK

This project uses the Vercel AI SDK to extract structured information from images. It uses the [ `experimental_useObject` ](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-object) hook and [ `streamObject` ](https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-object) function to generate structured data based on a Zod schema.

## Features

- Extract structured data from images using AI
- Real-time streaming of extracted data to the client
- Customizable data schema using Zod
- Built with [ Next.js ](https://nextjs.org) and the [ Vercel AI SDK ](https://sdk.vercel.ai)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- pnpm

You will also need an OpenAI API key.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/nicoalbanese/structured-image-extraction.git
   cd structured-image-extraction
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env.local`:
     ```
     cp .env.example .env.local
     ```
   - Open `.env.local` and add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```

## Usage

To run the development server:

```
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How it works

1. The application uses the `experimental_useObject` hook from the Vercel AI SDK to consume `streamObject` text streams.

2. When an image is uploaded, it's sent to the server where the `streamObject` function processes it using the OpenAI API.

3. The extracted data is streamed back to the client in real-time, conforming to a predefined Zod schema.

4. The structured data is then displayed on the client side.

## Customization

To modify the structure of the extracted data, edit the Zod schema in `lib/schema.ts`.

## More Info

- [Vercel AI SDK](https://sdk.vercel.ai)
- [OpenAI](https://openai.com/)
- [Next.js](https://nextjs.org/)
- [Zod](https://github.com/colinhacks/zod)
