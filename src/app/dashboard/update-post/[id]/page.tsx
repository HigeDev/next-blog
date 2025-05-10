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

type FormDataFields = {
  title: string;
  content: string;
  category: string;
  image: string;
};

export default function UpdatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormDataFields>({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const router = useRouter();
  const pathname = usePathname();
  const [publishError, setPublishError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  }, [postId, formData.image, isSignedIn, user?.publicMetadata?.isAdmin]);

  const handleChangeImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setFormData({ ...formData, image: url });
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
        console.log("no file");
      }
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
    }
  };

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
    formDataToSend.append("postId", String(postId));

    for (const key in formData) {
      const value = formData[key as keyof FormDataFields];
      formDataToSend.append(key, value);
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/post/update", {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || "Failed to update.");
        return;
      }

      router.push(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
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
                const file = e.target.files?.[0];
                if (file) {
                  setFile(file);
                  handleChangeImage(file);
                }
              }}
            />
            <Button type="button" size="sm" outline onClick={handleRemoveImage}>
              <MdDelete className="me-2 h-7 w-7" />
              Remove Image
            </Button>
          </div>

          {formData.image && (
            <img
              src={
                formData.image.startsWith("blob:")
                  ? formData.image
                  : `/uploads/${formData.image}`
              }
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
