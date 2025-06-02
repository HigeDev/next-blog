import React from "react";
import ProjectClient from "../components/ProjectClient";
import Head from "next/head";

export const metadata = {
  title: "Project",
  description: "Explore various projects and works developed under HigeSan",
  openGraph: {
    title: "Project | HigeSan",
    description: "Explore various projects and works developed under HigeSan",
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
    description: "Explore various projects and works developed under HigeSan",
    images: ["https://higesan.store/Hige-Logo.png"],
  },
};
export default function Project() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://higesan.store",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Project",
                  item: "https://higesan.store/projek",
                },
              ],
            }),
          }}
        />
      </Head>
      <ProjectClient />
    </>
  );
}
