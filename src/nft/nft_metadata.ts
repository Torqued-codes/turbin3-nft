import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import wallet from "../../devnet-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(
  irysUploader({
    address: "https://devnet.irys.xyz/",
  }),
);

umi.use(signerIdentity(signer));

(async () => {
  try {
    //change the image uri to your image uri obtained from nft_image.ts
    const image =
      "https://gateway.irys.xyz/6rEm66Nx3s9fpaxSYP5mDxzPzGxsvg9Szd7m7qc6TVX3";

      const metadata = {
      name: "Torq Core NFT",
      symbol: "TORQ",
      description: "An MPL Core NFT created for the Turbin3 assignment.",
      image: image,
      attributes: [
        { trait_type: "Standard", value: "MPL Core" },
        { trait_type: "Network", value: "Solana Devnet" },
      ],
      properties: {
        files: [
          {
            type: "image/png",
            uri: image,
          },
        ],
      },
    };

    const myUri = await umi.uploader.uploadJson(metadata);

    console.log(`metadata uri: ${myUri} `);
  } catch (error) {
    console.log("error", error);
  }
})();