import Link from "next/link";
import CallToAction from "./components/CallToAction";
import RecentPosts from "./components/RecentPost";

export const metadata = {
  title: "Home | HigeSan",
  description:
    "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
  openGraph: {
    title: "Home | HigeSan",
    description:
      "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
    url: "https://higesan.store",
    siteName: "HigeSan",
    images: [
      {
        url: "https://higesan.store/Hige-Logo.png",
        width: 1200,
        height: 630,
        alt: "HigeSan Homepage",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | HigeSan",
    description:
      "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
    images: ["https://higesan.store/Hige-Logo.png"],
  },
};
export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Discover a variety of articles and tutorials on topics such as travel
          adventures, stock trading experiences, programming languages and other
          fascinating topics reflect on my personal journey.
        </p>
        <Link
          href="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="p-3 flex flex-col gap-8 py-7">
        <RecentPosts limit={9} />
        <Link
          href={"/search?category=null"}
          className="text-lg text-teal-500 hover:underline text-center"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
}
