"use client";

import React, {
  Suspense,
  useState,
  ChangeEvent,
  FormEvent,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Select, TextInput } from "flowbite-react";
import PostCard from "../components/PostCard";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface SidebarData {
  searchTerm: string;
  sort: string;
  category: string;
}

// Utility untuk wrap promise jadi suspense resource
function wrapPromise<T>(promise: Promise<T>) {
  let status = "pending";
  let result: T;
  let suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

function fetchPosts(params: {
  searchTerm: string;
  sort: string;
  category: string;
  startIndex?: number;
}) {
  return wrapPromise(
    fetch("/api/post/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 9,
        order: params.sort,
        category: params.category,
        searchTerm: params.searchTerm,
        startIndex: params.startIndex || 0,
      }),
    }).then(async (res) => {
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    })
  );
}

function Posts({
  resource,
  onShowMore,
  showMore,
}: {
  resource: { read: () => { posts: Post[] } };
  onShowMore: () => void;
  showMore: boolean;
}) {
  const data = resource.read();

  return (
    <>
      {data.posts.length === 0 && (
        <p className="text-xl text-gray-500">No posts found.</p>
      )}
      <div className="flex flex-wrap gap-4 justify-center">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {showMore && (
        <button
          onClick={onShowMore}
          className="text-teal-500 text-lg hover:underline p-7 w-full"
        >
          Show More
        </button>
      )}
    </>
  );
}

// Komponen ini hanya untuk membaca searchParams dan mengatur ulang state
function SearchParamsReader({
  onParamsRead,
}: {
  onParamsRead: (params: SidebarData) => void;
}) {
  const searchParams = useSearchParams();

  const searchTermFromUrl = searchParams.get("searchTerm") || "";
  const sortFromUrl = searchParams.get("sort") || "desc";
  const categoryFromUrl = searchParams.get("category") || "";

  useEffect(() => {
    onParamsRead({
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });
  }, [searchTermFromUrl, sortFromUrl, categoryFromUrl, onParamsRead]);

  return null;
}

export default function Search() {
  const router = useRouter();

  const [sidebarData, setSidebarData] = useState<SidebarData>({
    searchTerm: "",
    sort: "desc",
    category: "",
  });

  const [showMore, setShowMore] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const handleParamsRead = useCallback((params: SidebarData) => {
    setSidebarData(params);
  }, []);

  const resource = useMemo(() => {
    setShowMore(false);
    setAllPosts([]);
    return fetchPosts(sidebarData);
  }, [sidebarData]);

  async function handleShowMore() {
    const startIndex = allPosts.length;

    try {
      const res = await axios.post("/api/post/get", {
        limit: 9,
        order: sidebarData.sort,
        category: sidebarData.category,
        searchTerm: sidebarData.searchTerm,
        startIndex,
      });

      const data = res.data;

      setAllPosts((prev) => [...prev, ...data.posts]);
      setShowMore(data.posts.length === 9);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    try {
      const data = resource.read();
      setAllPosts(data.posts);
      setShowMore(data.posts.length === 9);
    } catch {
      // Suspense akan handle loading/error
    }
  }, [resource]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setSidebarData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    router.push(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Suspense fallback={null}>
        <SearchParamsReader onParamsRead={handleParamsRead} />
      </Suspense>
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} id="sort" value={sidebarData.sort}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              id="category"
              value={sidebarData.category}
            >
              <option value="">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>
          <Button type="submit" outline>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts results:
        </h1>
        <div className="p-7">
          <Suspense
            fallback={<p className="text-xl text-gray-500">Loading posts...</p>}
          >
            <Posts
              resource={resource}
              onShowMore={handleShowMore}
              showMore={showMore}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
