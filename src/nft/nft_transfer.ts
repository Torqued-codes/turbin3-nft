import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "../../devnet-wallet.json";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { transfer, fetchAsset, mplCore } from "@metaplex-foundation/mpl-core";
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
    const recipientAddress = publicKey("6s88Bh3z2p5vcB6xTrBA6F4i1q8eYPioe8MNzD4DB4ut");

    console.log("Fetching TORQ TQ Asset");
    const asset = await fetchAsset(umi, assetAddress);

    console.log("Transferring TORQ TQ NFT");

    const tx = await transfer(umi, {
      asset: asset,
      newOwner: recipientAddress,
    }).sendAndConfirm(umi);

    const signature = base58.deserialize(tx.signature)[0];

    console.log("==================================================");
    console.log("NFT Transferred Successfully!");
    console.log(`Transfer Signature: ${signature}`);
    console.log(`New Owner: ${recipientAddress}`);
    console.log("==================================================");
  } catch (e) {
    console.error(`Error transferring NFT: ${e}`);
  }
})();