import React from "react";
import AboutClient from "../components/AboutClient";
import Head from "next/head";

export const metadata = {
  title: "About",
  description:
    "Learn more about Dominicus Agfid and the journey behind HigeSan.",
  openGraph: {
    title: "About | HigeSan",
    description:
      "Learn more about Dominicus Agfid and the journey behind HigeSan.",
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
      "Learn more about Dominicus Agfid and the journey behind HigeSan.",
    images: ["https://higesan.store/Hige-Logo.png"],
  },
};
export default function About() {
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
                  name: "About",
                  item: "https://higesan.store/about",
                },
              ],
            }),
          }}
        />
      </Head>
      <AboutClient />
    </>
  );
}
