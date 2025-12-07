import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletContextProvider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Pengu Wif Hat | The Coolest Penguin on Solana",
    template: "%s | Pengu Wif Hat",
  },
  description:
    "Join Pengu on his journey to the moon! The most chill penguin memecoin on the Solana blockchain. Slide into the future with $PENGU.",
  keywords: [
    "Pengu Wif Hat",
    "Solana",
    "Memecoin",
    "Crypto",
    "PENGU",
    "Blockchain",
  ],
  authors: [{ name: "Pengu Team" }],
  creator: "Pengu Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://penguwifhat.com",
    title: "Pengu Wif Hat | The Coolest Penguin on Solana",
    description:
      "Join Pengu on his journey to the moon! The most chill penguin memecoin on the Solana blockchain.",
    siteName: "Pengu Wif Hat",
    images: [
      {
        url: "/og-image.png", // We will need to change this image later
        width: 1200,
        height: 630,
        alt: "Pengu Wif Hat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pengu Wif Hat | The Coolest Penguin on Solana",
    description:
      "Join Pengu on his journey to the moon! The most chill penguin memecoin on the Solana blockchain.",
    images: ["/og-image.png"],
    creator: "@penguwifhat",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body>
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  );
}
