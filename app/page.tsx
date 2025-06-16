"use client";

import { Inter } from "next/font/google";
import Image from "next/image";
import Fly from "@/app/fly-box/page";
import { useRouter } from "next/navigation";

const Interfont = Inter({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/modal");
  };

  return (
    <>
      <div
        className={`${Interfont.className} flex flex-wrap md:flex-nowrap items-center justify-between bg-fuchsia-100 p-6 md:p-10 min-h-[38rem]`}
      >
        <span className="text-3xl md:text-5xl font-semibold text-gray-800 md:w-1/2 w-full mb-6 md:mb-0 md:pl-5">
          <span>YINLINOKU</span>
          <br />
          <span className="text-red-800"> Decentralized </span>
          <br /> Donation for Charity
          <br />
          <span className="text-xl md:text-2xl ">
            Donasikan hartamu menggunakan teknologi
            <div className="mt-1">
              <span className="text-red-600">Blockchain</span>
            </div>
          </span>
          <br />
          <button
            onClick={handleClick}
            className="inline-block bg-red-600 hover:shadow-[0_0_10px_rgba(255,0,0,0.8)] text-white font-semibold py-2.5 sm:py-3.5 px-6 sm:px-10 rounded-[10px] cursor-pointer transition duration-300 text-sm sm:text-base mt-4"
          >
            Get Started
          </button>
        </span>

        {/* Gambar */}
        <Fly />
        <div className="hidden md:flex w-full md:w-auto justify-center mb-30 ">
          <Image
            src="/Logo.svg"
            alt="Character"
            width={500}
            height={300}
            className="max-w-full h-auto ml-5 "
          />
        </div>
      </div>
      {/* SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 w-screen min-h-[38rem] text-gray-800">
        {/* Box 1 */}
        <div
          className="bg-pink-100 w-full md:w-[30%] h-60 rounded-2xl animate-float-up
        transition-all duration-300  hover:border-red-400 hover:border-2 "
        >
          <div className="flex flex-col justify-between items-center h-full py-4 text-center">
            <span className="bg-[url('/wallet.png')] bg-contain bg-no-repeat bg-center w-12 h-12"></span>
            <span className="text-2xl font-semibold">Connect Wallet</span>
            <span className="text-xl">
              Sambungkan walletmu dengan berbagai chain EVM
            </span>
            <span className="text-xl">dan pilih chain sesuai keinginanmu</span>
          </div>
        </div>

        {/* Box 2 */}
        <div
          className="bg-pink-100 w-full md:w-[30%] h-60 rounded-2xl animate-float-down
        transition-all duration-300  hover:border-red-400 hover:border-2 "
        >
          <div className="flex flex-col justify-between items-center h-full py-4 text-center">
            <span className="bg-[url('/swap.png')] bg-contain bg-no-repeat bg-center w-12 h-12"></span>
            <p className="text-xl font-semibold">Send ke alamat Donasi</p>
            <p className="text-xl">
              mulai dari{" "}
              <span className="text-red-600 font-semibold">1 Rupiah</span>
            </p>
          </div>
        </div>

        {/* Box 3 */}
        <div
          className="bg-pink-100 w-full md:w-[30%] h-60 rounded-2xl animate-float-up
        transition-all duration-300  hover:border-red-400 hover:border-2"
        >
          <div className="flex flex-col justify-between items-center h-full py-4 text-center">
            <span className="bg-[url('/wallet.png')] bg-contain bg-no-repeat bg-center w-12 h-12"></span>
            <span className="text-xl">Donatur dapat melihat transaksi</span>
            <span className="text-xl">
              donasi melalui data <span className="font-bold">onchain</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
