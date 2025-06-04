"use client";

import React, { useEffect, useState, use } from "react";
import CallToAction from "@/app/components/CallToAction";
import RecentPosts from "@/app/components/RecentPost";
import { Badge } from "flowbite-react";
import Link from "next/link";
import axios from "axios";
import ShowPostPage from "@/app/components/ShowPost";

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
interface PostPageProps {
  params: { slug: string };
}
export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params); // <-- unwrap Promise

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getBadgeColor = (category: string): string => {
    switch (category) {
      case "Personal Life":
        return "purple";
      case "Stock":
        return "warning";
      case "Programming":
        return "success";
      case "Work":
        return "gray";
      case "Holiday":
        return "pink";
      case "Hobby":
        return "info";
      case "Japan":
        return "indigo";
      case "Other":
        return "dark";
      default:
        return "gray";
    }
  };

  useEffect(() => {
    async function fetchPost() {
      try {
        const result = await axios.post(
          "/api/post/get",
          { slug },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = result.data;
        setPost(data.posts[0]);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Loading...
        </h2>
      </main>
    );
  }

  if (error || !post) {
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
        className="self-center mt-2"
      >
        <Badge
          color={getBadgeColor(post.category)}
          className="w-fit italic text-[14px]"
        >
          {post.category}
        </Badge>
      </Link>
      <div className="flex justify-between p-0 mx-auto w-full max-w-4xl text-xs">
        <img
          src={`/uploads/${post.image}`}
          alt={post.title}
          className="mt-2 p-3 max-h-[600px] w-full object-cover"
        />
      </div>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-3xl">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-3xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <RecentPosts limit={3} />
    </main>
  );
}
