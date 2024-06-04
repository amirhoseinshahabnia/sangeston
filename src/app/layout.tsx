import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { getGlobalConfig } from "@/lib/api";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

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
      <body className={roboto.className}>
        <Header navLinks={globalConfig.navLinks} />
        {children}
        <Footer data={globalConfig.footer} />
      </body>
    </html>
  );
}
