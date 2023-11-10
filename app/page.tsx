"use client";
import { useState } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";

export default function Home() {
  // Abstraxion hooks
  const { data: account } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  // General state hooks
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const createHouse = async () => {
    setLoading(true);
    try {
      if (!client) {
        setIsOpen(true);
        return;
      }
      const hubMsg = {
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
        hubMsg,
        "my-hub",
        {
          amount: [{ amount: "0", denom: "uxion" }],
          gas: "500000",
        }
      );
      console.log("Instantiate result", hubResult);
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
        <button
          disabled={loading}
          className="bg-white px-4 py-2 rounded text-black w-full"
          onClick={createHouse}
        >
          {loading ? "LOADING..." : "CREATE XION HOUSE"}
        </button>
      </div>
      <Abstraxion onClose={() => setIsOpen(false)} isOpen={isOpen} />
    </main>
  );
}
