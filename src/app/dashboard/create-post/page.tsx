"use client";

import { useUser } from "@clerk/nextjs";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";

import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// https://dev.to/a7u/reactquill-with-nextjs-478b
import "react-quill-new/dist/quill.snow.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/navigation"; // tambahkan ini

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const router = useRouter(); // tambahkan ini di dalam komponenmu
  const [publishError, setPublishError] = useState<string | null>(null); // tambahkan ini

  const handleChangeImage = async () => {
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataImg,
      });

      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.url); // simpan URL dari gambar
        console.log(data.url);
        setFormData({ ...formData, image: data.url });
      } else {
        console.error("Upload gagal");
      }
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: user?.publicMetadata?.userId, // pakai optional chaining
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        router.push(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create a post
        </h1>
        {/* PREVIEW IMAGE */}
        {imageUrl && (
          <div className="mt-4">
            <p className="mb-2">Preview:</p>
            <img
              src={`/uploads/${imageUrl}`}
              alt="Preview"
              className="max-w-xs rounded border border-gray-300"
            />
          </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="uncategorized">Select a category</option>
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
                }
              }}
            />
            <Button type="button" size="sm" outline onClick={handleChangeImage}>
              Upload Image
            </Button>
          </div>

          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mb-12"
            // required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />
          <Button type="submit">Publish</Button>
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
