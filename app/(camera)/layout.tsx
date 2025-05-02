import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";

const outfitFont = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Grafit",
  description: "An outfit cataloging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (



    <html lang="en">
      <body
        className={`${outfitFont.variable} antialiased flex flex-col h-screen w-full overflow-hidden`}
      >


          {children}


      </body>
    </html>
  );
}
