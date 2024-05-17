import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getGlobalConfig } from "@/lib/api";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sangeston | Bijan's Official Site",
  description: "Official Site of Bijan",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalConfig = await getGlobalConfig();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header navLinks={globalConfig.navLinks} />
        {children}
        <Footer data={globalConfig.footer} />
      </body>
    </html>
  );
}
