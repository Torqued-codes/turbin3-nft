import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "../../devnet-wallet.json";
import {
  createSignerFromKeypair,
  generateSigner,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { create, mplCore } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));
umi.use(mplCore());

(async () => {
  try {
    // Pass the JSON metadata URI here, NOT the image URI
    const metadataUri =
      "https://gateway.irys.xyz/7H6HsKsivSPsj8uvfuCZ67ztzU6fSPmRjxFt4zt6FKqY";
    
    const asset = generateSigner(umi);

    console.log("Minting MPL Core NFT with JSON Metadata");

    const tx = await create(umi, {
      asset: asset,
      name: "TORQ",
      uri: metadataUri.trim(),
    }).sendAndConfirm(umi);

    const signature = base58.deserialize(tx.signature)[0];

    console.log("==================================================");
    console.log("NFT Minted Successfully!");
    console.log(`Asset Public Key: ${asset.publicKey}`);
    console.log(`Signature: ${signature}`);
    console.log("==================================================");
    console.log(`Metaplex Core Explorer:\nhttps://core.metaplex.com/explorer/${asset.publicKey}?env=devnet\n`);
    console.log(`Solana Explorer:\nhttps://solscan.io/address/${asset.publicKey}?cluster=devnet\n`);
    console.log("==================================================");
  } catch (e) {
    console.log(`error ${e}`);
  }
})();