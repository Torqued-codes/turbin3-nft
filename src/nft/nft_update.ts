import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "../../devnet-wallet.json";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { update, fetchAsset, mplCore } from "@metaplex-foundation/mpl-core";
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
    const assetAddress = publicKey("EKaBt5wzS5adhxgj15rpbL5jT4qJQyDiPKiQMMdTQFVV");

    console.log("Fetching existing MPL Core Asset");
    const asset = await fetchAsset(umi, assetAddress);

    console.log("Updating MPL Core NFT metadata on Devnet...");

    const tx = await update(umi, {
      asset: asset,
      name: "TORQ TQ NFT",
      uri: "https://gateway.irys.xyz/7H6HsKsivSPsj8uvfuCZ67ztzU6fSPmRjxFt4zt6FKqY",
    }).sendAndConfirm(umi);

    const signature = base58.deserialize(tx.signature)[0];

    console.log("==================================================");
    console.log("NFT Metadata Updated Successfully!");
    console.log(`Update Signature: ${signature}`);
    console.log("==================================================");
    console.log(`Metaplex Core Explorer:\nhttps://core.metaplex.com/explorer/${assetAddress}?env=devnet\n`);
  } catch (e) {
    console.error(`Error updating NFT: ${e}`);
  }
})();