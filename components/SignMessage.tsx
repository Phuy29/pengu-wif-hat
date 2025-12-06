"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { FC, useCallback, useState } from "react";
import { Button } from "./ui/button";

export const SignMessage: FC = () => {
  const { publicKey, signMessage } = useWallet();
  const [signature, setSignature] = useState<string | null>(null);

  const onClick = useCallback(async () => {
    try {
      // `publicKey` will be null if the wallet isn't connected
      if (!publicKey) throw new Error("Wallet not connected!");
      // `signMessage` will be undefined if the wallet doesn't support it
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");

      const message = new TextEncoder().encode(
        "Welcome to Pengu Wif Hat! Please sign this message to verify your wallet."
      );
      const signature = await signMessage(message);

      if (!verifySignature(signature, message, publicKey.toBuffer())) {
        throw new Error("Invalid signature!");
      }

      setSignature(bs58.encode(signature));
      alert(`Message signed! Signature: ${bs58.encode(signature)}`);
    } catch (error: any) {
      alert(`Signing failed: ${error?.message}`);
    }
  }, [publicKey, signMessage]);

  // Verify the signature locally to ensure it's correct
  const verifySignature = (
    signature: Uint8Array,
    message: Uint8Array,
    publicKey: Uint8Array
  ) => {
    try {
      const nacl = require("tweetnacl");
      return nacl.sign.detached.verify(message, signature, publicKey);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={onClick}
        disabled={!publicKey || !signMessage}
        className="bg-[#323232] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        Sign Message
      </Button>
      {signature && (
        <div className="text-xs break-all max-w-md text-center">
          <p className="font-bold">Signature:</p>
          <p>{signature}</p>
        </div>
      )}
    </div>
  );
};
