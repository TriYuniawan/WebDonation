import Image from "next/image";

export default function Fly() {
  return (
    <div className="absolute w-80 right-0 mr-100 hidden md:block">
      <div
        className="rounded-2xl bg-red-600 opacity-70 w-80 h-40 z-10 ml-20 
        animate-float-up shadow 
        transition-all duration-300 
        hover:shadow-lg hover:shadow-red-500 hover:-translate-y-1"
      >
        <div className="relative flex flex-col justify-between items-start pt-3 space-y-4 ml-5">
          {/* Saldo + Gambar sejajar */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-xl">Saldo saat ini</span>
            <div className="h-10 w-15  rounded-xl bg-black/20 backdrop-blur-md  ml-25 flex items-center justify-center">
              <Image
                src="/sol.png"
                alt="Character"
                width={24}
                height={24}
                className="max-w-full h-auto"
              />
            </div>
          </div>

          <span className="text-white mt-1 text-xl font-bold ">$10,000.00</span>

          <span className="text-white font-bold mb-6">**** **** **** 795</span>
        </div>
      </div>

      <div
        className="rounded-2xl bg-indigo-700 opacity-70 w-80 h-40 -mt-10 z-20 
        animate-float-down shadow 
        transition-all duration-300 
        hover:shadow-lg hover:shadow-purple-700 hover:-translate-y-1"
      >
        <div className="relative flex flex-col justify-between items-start pt-3 space-y-4 ml-5">
          {/* Saldo + Gambar sejajar */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-xl">Saldo saat ini</span>
            <div className="h-10 w-15  rounded-xl bg-black/20 backdrop-blur-md  ml-25 flex items-center justify-center">
              <Image
                src="/sol.png"
                alt="logo"
                width={24}
                height={24}
                className="max-w-full h-auto"
              />
            </div>
          </div>

          <span className="text-white mt-1 text-xl font-bold ">$10,000.00</span>

          <span className="text-white font-bold mb-6">**** **** **** 795</span>
        </div>
      </div>
    </div>
  );
}
