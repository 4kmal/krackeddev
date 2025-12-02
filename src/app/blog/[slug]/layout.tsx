import { posts } from "../posts";
import type { ReactNode } from "react";

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
