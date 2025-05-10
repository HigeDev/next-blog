"use client";

import { useUser } from "@clerk/nextjs";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "react-quill-new/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";

// Dynamic import for ReactQuill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Type dipindahkan ke luar komponen
type FormDataFields = {
  title: string;
  content: string;
  category: string;
};

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [publishError, setPublishError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormDataFields>({
    title: "",
    content: "",
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPublishError(null);
    const formDataToSend = new FormData();

    // Validasi sederhana
    if (!formData.title || !formData.content || !formData.category) {
      setPublishError("Please fill all fields.");
      return;
    }

    // Hanya tambahkan file jika memang dipilih
    if (file) {
      formDataToSend.append("file", file);
    }
    formDataToSend.append("userId", String(user?.publicMetadata?.userId || ""));

    for (const key in formData) {
      const value = formData[key as keyof FormDataFields];
      formDataToSend.append(key, value);
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/post/create", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || "Failed to publish.");
        return;
      }

      router.push(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create a post
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              name="title"
              type="text"
              placeholder="Title"
              required
              value={formData.title}
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              name="category"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </Select>
          </div>

          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFile(file);
                  handleChangeImage(file);
                }
              }}
            />
          </div>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-72 object-cover"
            />
          )}

          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mb-12"
            value={formData.content}
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>

          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    );
  } else {
    return (
      <h1 className="text-center text-3xl my-7 font-semibold">
        You are not authorized to view this page
      </h1>
    );
  }
}
