"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import { parseEther, formatEther } from "viem";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

const DONATION_ADDRESS = process.env.DONATION_ADDRESS;

export default function DonationForm() {
  /* ───────── Wagmi hooks ───────── */
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading: loadingBalance } = useBalance({
    address,
    chainId: 11155111,
  });

  /* ───────── Kirim TX ───────── */
  const {
    sendTransaction,
    isLoading: isSending,
    data: txData,
    error: txError,
    reset: resetTx,
  } = useSendTransaction({ chainId: 11155111 });

  /* ───────── Local state ───────── */
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ───────── Deteksi perubahan saldo ───────── */
  const prevBalance = useRef<bigint | null>(null);

  useEffect(() => {
    if (!balanceData) return;

    // Jalankan hanya jika sudah pernah punya saldo sebelumnya
    if (prevBalance.current !== null) {
      const decreased = balanceData.value < prevBalance.current;
      if (decreased) {
        toast.success("Donasi terkirim ✔");

        // 2️⃣ buka modal detail
        setShowModal(true);
      }
    }
    prevBalance.current = balanceData.value;
  }, [balanceData]);

  /* ───────── Handler ───────── */
  const handleDonate = () => {
    setFormError("");
    if (!isConnected) return setFormError("Hubungkan wallet terlebih dahulu.");
    if (!amount || isNaN(+amount) || +amount <= 0)
      return setFormError("Masukkan jumlah ETH yang valid.");
    if (balanceData && +amount > +formatEther(balanceData.value))
      return setFormError("Saldo tidak mencukupi.");

    sendTransaction({ to: DONATION_ADDRESS, value: parseEther(amount) });
  };

  return (
    <>
      <Toaster position="top-center" />

      {/* Fullscreen background */}
      <div className=" min-h-16 bg-white flex items-center mb-60 pt-1 justify-center px-3 py-5">
        <div className="max-w-md w-full p-6 bg-pink-100 rounded-2xl shadow-lg font-bold">
          {/* Saldo */}
          <div className="mb-4 text-sm text-gray-700">
            Saldo&nbsp;
            {loadingBalance
              ? "…"
              : `${balanceData ? formatEther(balanceData.value) : "0"} ETH`}
          </div>

          <input
            type="number"
            min="0"
            step="0.0001"
            placeholder="Jumlah ETH"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-black mb-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={handleDonate}
            disabled={isSending}
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {isSending ? "Mengirim…" : "Kirim Donasi"}
          </button>

          {(formError || txError) && (
            <p className="mt-3 text-red-600 text-sm">
              {formError || txError.message}
            </p>
          )}
        </div>
      </div>

      {/* Modal sukses */}
      <AnimatePresence>
        {showModal && txData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white text-black font-semibold rounded-2xl p-6 max-w-sm w-full text-center shadow-xl"
            >
              <CheckCircle size={48} className="mx-auto text-green-600 mb-2" />
              <h3 className="text-lg font-bold mb-2">Transaksi Berhasil</h3>

              <p className="text-sm mb-4">
                {amount}&nbsp;ETH terkirim ke&nbsp;
                <span className="font-mono break-all">
                  {DONATION_ADDRESS.slice(0, 6)}…{DONATION_ADDRESS.slice(-4)}
                </span>
              </p>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetTx();
                  setAmount("");
                }}
                className="block w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
