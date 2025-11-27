import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Zone | Kracked Devs",
  description:
    "Experimental games built by Kracked Devs. Test, play, and break things.",
  openGraph: {
    title: "Game Zone | Kracked Devs",
    description:
      "Experimental games built by Kracked Devs. Test, play, and break things.",
    url: "/game",
    type: "website",
  },
};

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
