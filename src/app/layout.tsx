import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/sidebar";
import { Container } from '@mui/material';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clima Amazônia",
  description: "Monitoramento climático de grandes bacias hidrográficas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col md:flex-row">
          <div className="w-full flex-none md:w-64">
            <SideBar />
          </div>
          <div className="flex-grow">
            <Container maxWidth="lg">{children}</Container>
          </div>
        </div>
      </body>
    </html>
  );
}
