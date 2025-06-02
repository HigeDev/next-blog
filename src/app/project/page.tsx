import React from "react";
import ProjectClient from "../components/ProjectClient";

export const metadata = {
  title: "Project",
  description:
    "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
  openGraph: {
    title: "Project | HigeSan",
    description:
      "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
    url: "https://higesan.store",
    siteName: "HigeSan",
    images: [
      {
        url: "https://higesan.store/Hige-Logo.png",
        width: 1200,
        height: 630,
        alt: "HigeSan Project page",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project | HigeSan",
    description:
      "Welcome to my blog, Discover a variety of articles and tutorials reflect on my personal journey",
    images: ["https://higesan.store/Hige-Logo.png"],
  },
};
export default function Project() {
  return <ProjectClient />;
}
