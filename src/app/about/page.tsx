import React from "react";
import AboutClient from "../components/AboutClient";

export const metadata = {
  title: "About",
  description:
    "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
  openGraph: {
    title: "About | HigeSan",
    description:
      "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
    url: "https://higesan.store",
    siteName: "HigeSan",
    images: [
      {
        url: "https://higesan.store/Hige-Logo.png",
        width: 1200,
        height: 630,
        alt: "HigeSan About page",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | HigeSan",
    description:
      "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
    images: ["https://higesan.store/Hige-Logo.png"],
  },
};
export default function About() {
  return <AboutClient />;
}
