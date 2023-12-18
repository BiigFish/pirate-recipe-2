import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Link from "next/link";
import LoginButton from "@/components/assets/login-button";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Pirate Recipe",
  description: "My recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center max-w-3xl mx-2 md:mx-auto">
          <header className="relative w-full">
            <Link href="/" className="w-fit block sm:mx-auto">
              <h1 className="text-4xl font-bold ">Pirate Recipe</h1>
            </Link>
            <LoginButton />
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
