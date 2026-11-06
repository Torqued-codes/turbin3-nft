import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "../../devnet-wallet.json";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { burn, fetchAsset, mplCore } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com"
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));
umi.use(mplCore());

(async () => {
  try {
    const assetAddress = publicKey("EKaBt5wzS5adhxgj15rpbL5jT4qJQyDiPKiQMMdTQFVV");

    console.log("Fetching TORQ TQ NFT");
    const asset = await fetchAsset(umi, assetAddress);

    console.log("Burning TORQ TQ NFT and reclaiming rent");

    const tx = await burn(umi, {
      asset: asset,
    }).sendAndConfirm(umi);

    const signature = base58.deserialize(tx.signature)[0];

    console.log("==================================================");
    console.log("NFT Burned Successfully & Rent Reclaimed!");
    console.log(`Burn Signature: ${signature}`);
    console.log("==================================================");
  } catch (e) {
    console.error(`Error burning NFT: ${e}`);
  }
})();

