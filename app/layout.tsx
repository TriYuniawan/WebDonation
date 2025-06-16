import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "./providers";
import Navbar from "./components/navbar";
import Footer from "./footer/footer";
import DonationForm from "./donation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Yonlinoku",
  description: "Donation Platfofrm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Web3Provider>
          <Navbar /> {/* 🌐 Bungkus seluruh layout dengan Web3Provider */}
          {children} {/* children adalah page.tsx */}
          <DonationForm />
        </Web3Provider>
        <Footer />

        {/* jadi semua elemen harus berada didalam tag <Web3provider>  
        kalau tidak maka tag diluar web3provider tidak akan bisa konek ke layanan web3 */}
      </body>
    </html>
  );
}
