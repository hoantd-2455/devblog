import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import ThemeControls from "../components/theme-controls";
import QueryProvider from "../components/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevBlog — Next.js learning",
  description: "DevBlog: học JavaScript, React và Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <QueryProvider>
          <ThemeProvider>
            <ThemeControls />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
