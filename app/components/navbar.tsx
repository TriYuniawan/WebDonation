"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <nav className="bg-white text-black px-4 sm:px-6 lg:px-8 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href={"/"}>
          <img
            src="/logo.svg"
            alt="nyan"
            className="h-8 sm:h-10 w-auto object-contain"
          />
        </Link>

        {/* Connect & Chain */}
        <ul className="flex space-x-3 sm:space-x-6">
          <li>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openConnectModal,
                openAccountModal,
                openChainModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                    className="flex items-center space-x-3"
                  >
                    {!connected ? (
                      <button
                        onClick={openConnectModal}
                        className="inline-block bg-red-600 hover:shadow-[0_0_10px_rgba(255,0,0,0.8)] text-white font-semibold py-2.5 sm:py-3.5 px-6 sm:px-10 rounded-[10px] transition duration-300 text-sm sm:text-base"
                      >
                        Connect
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={openAccountModal}
                          className="inline-block bg-red-600 hover:shadow-[0_0_10px_rgba(255,0,0,0.8)] text-white font-semibold py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-[10px] transition duration-300 text-sm sm:text-base"
                        >
                          {account.displayName}
                        </button>

                        <button
                          onClick={openChainModal}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-600 hover:shadow-[0_0_10px_rgba(255,0,0,0.8)] transition duration-300"
                          title={chain.name}
                        >
                          {chain.hasIcon && chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </li>
        </ul>
      </div>
    </nav>
  );
}
