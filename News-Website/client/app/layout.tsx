import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "News Hub",
  description: "A News application for instant head lines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={` antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
