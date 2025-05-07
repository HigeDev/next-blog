"use client";

import { useUser } from "@clerk/nextjs";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import { MdDelete, MdFileUpload } from "react-icons/md";

import "react-quill-new/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface FormData {
  title?: string;
  category?: string;
  content?: string;
  image?: string;
}

export default function UpdatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const router = useRouter();
  const pathname = usePathname();
  const [publishError, setPublishError] = useState<string | null>(null);

  const lastSegment = pathname.split("/").pop();
  const postId = lastSegment ? parseInt(lastSegment, 10) : null;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await fetch("/api/post/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId }),
        });
        const data = await result.json();
        console.log(data);
        if (result.ok && data.posts?.[0]) {
          setFormData(data.posts[0]);
        }
      } catch (err) {
        console.error("Terjadi kesalahan:", err);
      }
    };

    if (isSignedIn && user?.publicMetadata?.isAdmin) {
      fetchPost();
    }
  }, [postId, isSignedIn, user?.publicMetadata?.isAdmin]);

  const handleChangeImage = async () => {
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("file", file);

    try {
      const res = await fetch("/api/post/image/upload", {
        method: "POST",
        body: formDataImg,
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setFormData({ ...formData, image: data.url });
      } else {
        console.error("Upload gagal");
      }
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
    }
  };
  const handleRemoveImage = async () => {
    try {
      const res = await fetch("/api/post/image/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: formData.image, postId: postId }),
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, image: data.url }));

        try {
          const res = await fetch("/api/post/image/remove", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: formData.image,
              postId: postId,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            setPublishError(data.message || "Error saat mem-publish");
            return;
          }
          setPublishError(null);
        } catch (error) {
          setPublishError("Something went wrong");
        }
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
      const res = await fetch("/api/post/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: user?.publicMetadata?.userId,
          postId: postId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || "Error saat mem-publish");
        return;
      }

      setPublishError(null);
      router.push(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  if (!isLoaded) return null;

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="flex-1"
            />
            <Select
              value={formData.category || "uncategorized"}
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
                const selectedFile = e.target.files?.[0];
                if (selectedFile) setFile(selectedFile);
              }}
            />
            <Button type="button" size="sm" outline onClick={handleChangeImage}>
              <MdFileUpload className="me-2 h-7 w-7" />
              Upload Image
            </Button>
            <Button type="button" size="sm" outline onClick={handleRemoveImage}>
              <MdDelete className="me-2 h-7 w-7" />
              Remove Image
            </Button>
          </div>

          {formData.image && (
            <img
              src={`/uploads/${formData.image}`}
              alt="Preview"
              className="w-full h-72 object-cover"
            />
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mb-12"
            value={formData.content || ""}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />

          <Button type="submit">Update Post</Button>

          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    );
  }

  return (
    <h1 className="text-center text-3xl my-7 font-semibold">
      You are not authorized to view this page
    </h1>
  );
}
