import React from "react";
import SearchClient from "../components/SearchClient";

export const metadata = {
  title: "Search",
  description:
    "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
  openGraph: {
    title: "Search | HigeSan",
    description:
      "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
    url: "https://higesan.store",
    siteName: "HigeSan",
    images: [
      {
        url: "https://higesan.store/Hige-Logo.png",
        width: 1200,
        height: 630,
        alt: "HigeSan Search page",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search | HigeSan",
    description:
      "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
    images: ["https://higesan.store/Hige-Logo.png"],
  },
};
export default function Search() {
  return <SearchClient />;
}
