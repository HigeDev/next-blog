// app/components/ClientPostPage.tsx
"use client";

import { useEffect, useState } from "react";
import CallToAction from "./CallToAction";
import RecentPosts from "./RecentPost";
import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface Post {
  id: number;
  content: string;
  title: string;
  image: string;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export default function ShowPostPage({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const baseURL =
    typeof window === "undefined"
      ? process.env.API_BASE_URL
      : process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await axios.post(
          `${baseURL}/api/post/get`,
          { slug },
          { headers: { "Content-Type": "application/json" } }
        );

        const data = result.data;
        setPost(data.posts[0]);
      } catch (error) {
        setPost({
          id: 0,
          title: "Failed to load post",
          content: "",
          image: "",
          category: "",
          slug: "",
          createdAt: "",
          updatedAt: "",
          userId: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <p className="text-center mt-10">Loading...</p>
      </main>
    );
  }

  if (!post || post.title === "Failed to load post") {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Post not found
        </h2>
      </main>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>
      <Link
        href={`/search?category=${post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post.category}
        </Button>
      </Link>
      <Image
        src={`/uploads/${post.image}`}
        width={1200}
        height={600}
        alt={post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <RecentPosts limit={3} />
    </main>
  );
}
