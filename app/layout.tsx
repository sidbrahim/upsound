
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {getServerSession} from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import Sidebar from "@/components/Sidebar";
import '../styles/navbar.css'
import { useState } from "react";


const inter = Inter({ subsets: ["latin"] });

 
export const metadata: Metadata = {
  title: "UPSound",
  description: "A recommender system for music lovers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 


{
  const session = await getServerSession();

  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}> 
        <Sidebar/>
        {children}

        </SessionProvider>
        </body>
    </html>
  );
}
