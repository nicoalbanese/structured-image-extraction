"use client";

import { structuredImageSchema } from "@/lib/schema";
import { experimental_useObject as useObject } from "ai/react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const {
    object: analysis,
    submit,
    isLoading,
  } = useObject({
    api: "/api/object",
    schema: structuredImageSchema,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result;
      submit({ image: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <main className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Image Structured Object Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                disabled={!!file}
                onChange={handleFileChange}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={!file || isLoading}>
                {isLoading ? "Extracting..." : "Extract"}
              </Button>
              <Button
                type="button"
                onClick={handleClear}
                variant="destructive"
                disabled={!file || isLoading}
              >
                Clear Image
              </Button>
            </div>
          </form>
          <div className="flex flex-col md:flex-row gap-4">
            {previewUrl && (
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Uploaded Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={previewUrl}
                    width={500}
                    height={500}
                    alt="Uploaded Image"
                    className="rounded-lg w-full h-auto"
                  />
                </CardContent>
              </Card>
            )}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Structured Object</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && analysis === undefined ? (
                  <p className="text-center text-gray-500">
                    Analyzing image...
                  </p>
                ) : analysis && previewUrl ? (
                  <div className="h-fit">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Title</th>
                          <th className="border px-4 py-2">Author</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {analysis?.books?.map((book, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2">{book?.title}</td>
                            <td className="border px-4 py-2">{book?.author}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    Upload an image and click "Extract" to see the results here.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
