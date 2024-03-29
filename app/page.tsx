"use client";
import { useState } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import TXSuccessModal from "@/components/modal";
import {InstantiateResult} from "@cosmjs/cosmwasm-stargate";

export default function Home() {
  // Abstraxion hooks
  const { data: account } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  // General state hooks
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initiateResult, setInitiateResult] = useState<InstantiateResult | null>(null);
  const [txSuccessModalOpen, setTxSuccessModalOpen] = useState(false);

  const instantiateTestContract = async () => {
    setLoading(true);
    try {
      if (!client) {
        setIsOpen(true);
        return;
      }
      const initMsg = {
        metadata: {
          metadata: {
            name: "Abstraxion House",
            hub_url: "abstraxion_house",
            description: "Generalized Abstraction",
            tags: [],
            social_links: [],
            creator: account?.bech32Address,
            thumbnail_image_url: "https://fakeimg.pl/200/",
            banner_image_url: "https://fakeimg.pl/500/",
          },
        },
        ownable: {
          owner: account?.bech32Address,
        },
      };

      const hubResult = await client.instantiate(
        account?.bech32Address || "",
        1,
        initMsg,
        "my-hub",
        {
          amount: [{ amount: "0", denom: "uxion" }],
          gas: "500000",
        }
      );
      setInitiateResult(hubResult);
      setTxSuccessModalOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col max-w-[300px] gap-2 items-center">
        <h1 className="text-2xl font-bold tighter">ABSTRAXION</h1>
        <button
          className="bg-white px-4 py-2 rounded text-black w-full"
          onClick={() => setIsOpen(true)}
        >
          {account ? (
            <div className="flex items-center justify-center">
              <span className="flex w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              CONNECTED
            </div>
          ) : (
            "CONNECT"
          )}
        </button>
        {client && (
        <button
          disabled={loading}
          className="bg-white px-4 py-2 rounded text-black w-full"
          onClick={instantiateTestContract}
        >
          {loading ? "LOADING..." : "INSTANTIATE TEST CONTRACT"}
        </button>)}
      </div>
      <Abstraxion onClose={() => setIsOpen(false)} isOpen={isOpen} />
      <TXSuccessModal isOpen={txSuccessModalOpen} onClose={() => setTxSuccessModalOpen(false)} initiateResult={initiateResult} />
    </main>
  );
}
