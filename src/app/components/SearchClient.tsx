"use client";

import React, {
  Suspense,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Select, TextInput } from "flowbite-react";
import axios from "axios";
import PostCard from "../components/PostCard";

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

function SearchParamsReader({
  onParamsRead,
}: {
  onParamsRead: (params: SidebarData) => void;
}) {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || "";
  const sort = searchParams.get("sort") || "desc";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    onParamsRead({ searchTerm, sort, category });
  }, [searchTerm, sort, category, onParamsRead]);

  return null;
}

export default function SearchClient() {
  const router = useRouter();

  const [sidebarData, setSidebarData] = useState<SidebarData>({
    searchTerm: "",
    sort: "desc",
    category: "",
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const handleParamsRead = useCallback((params: SidebarData) => {
    setSidebarData(params);
  }, []);

  useEffect(() => {
    let cancel = false;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      setPosts([]);

      try {
        const res = await axios.post("/api/post/get", {
          limit: 9,
          order: sidebarData.sort,
          category: sidebarData.category,
          searchTerm: sidebarData.searchTerm,
          startIndex: 0,
        });

        if (!cancel) {
          setPosts(res.data.posts);
          setShowMore(res.data.posts.length === 9);
        }
      } catch (err) {
        if (!cancel) {
          setError("Failed to fetch posts");
        }
      } finally {
        if (!cancel) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      cancel = true;
    };
  }, [sidebarData]);

  const handleShowMore = async () => {
    try {
      const res = await axios.post("/api/post/get", {
        limit: 9,
        order: sidebarData.sort,
        category: sidebarData.category,
        searchTerm: sidebarData.searchTerm,
        startIndex: posts.length,
      });

      const newPosts = res.data.posts;
      setPosts((prev) => [...prev, ...newPosts]);
      setShowMore(newPosts.length === 9);
    } catch {
      console.error("Failed to load more posts");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setSidebarData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams({
      searchTerm: sidebarData.searchTerm,
      sort: sidebarData.sort,
      category: sidebarData.category,
    });
    router.push(`/search?${query.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Suspense hanya digunakan untuk komponen yang baca URL */}
      <Suspense fallback={null}>
        <SearchParamsReader onParamsRead={handleParamsRead} />
      </Suspense>

      {/* Sidebar */}
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
            <Select id="sort" value={sidebarData.sort} onChange={handleChange}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              id="category"
              value={sidebarData.category}
              onChange={handleChange}
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

      {/* Results */}
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts results:
        </h1>
        <div className="p-7">
          {loading && <p className="text-xl text-gray-500">Loading posts...</p>}
          {!loading && error && <p className="text-xl text-red-500">{error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {!loading && !error && posts.length > 0 && (
            <>
              <div className="flex flex-wrap gap-4 justify-center">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="text-teal-500 text-lg hover:underline p-7 w-full"
                >
                  Show More
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
