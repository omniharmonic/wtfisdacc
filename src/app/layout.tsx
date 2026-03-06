import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WTF is d/acc? | Defensive Accelerationism Explained",
  description:
    "An interactive guide to Vitalik Buterin's d/acc framework. Analyze any project against the decentralized, democratic, differential, defensive acceleration rubric.",
  keywords: [
    "d/acc",
    "defensive accelerationism",
    "Vitalik Buterin",
    "decentralization",
    "crypto",
    "web3",
  ],
  openGraph: {
    title: "WTF is d/acc?",
    description: "Understand d/acc. Analyze any project. Get a score.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dacc-bg text-dacc-text antialiased">
        {children}
      </body>
    </html>
  );
}
