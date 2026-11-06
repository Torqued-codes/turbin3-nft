# Turbine SPL Token & MPL Core NFT Assignment (Week 1)

This repository contains TypeScript scripts built using `@solana/kit`, `@solana-program/token`, Metaplex Umi, and `@metaplex-foundation/mpl-core` to create, mint, tag metadata, update, transfer, and manage SPL tokens and MPL Core NFTs on Solana Devnet.

---

## 🛠️ Environment & Wallet Setup

- **Keypair Generation:** Generated a local keypair file for Devnet interactions.

  ```bash
  solana-keygen new --outfile ./devnet-wallet.json --force
  ```

- **Retrieve Public Key:**

  ```bash
  solana-keygen pubkey ./devnet-wallet.json
  ```

- **Devnet Airdrop:** Requested 2 SOL on Devnet to fund transaction fees and account rent.

  ```bash
  solana airdrop 2 5Z4StfMBzEa6gp8HxF7dYoVLwn218aAgyS4U7NjRHgwX --url devnet
  ```

- **Check SOL Balance:** Verified account balance prior to script execution.

  ```bash
  solana balance 5Z4StfMBzEa6gp8HxF7dYoVLwn218aAgyS4U7NjRHgwX --url devnet
  ```

## 🚀 Work Completed & Execution Steps

### Part 1: Fungible SPL Token Flow

Executed the complete token lifecycle using `@solana/kit` and `@solana-program/token`:

1. **Initialize Token Mint (`spl_init.ts`):** Created the base Mint Account defining decimals and mint authority.

   ```bash
   npm run spl:init
   ```

2. **Attach On-Chain Metadata (`spl_metadata.ts`):** Attached token identity (Name, Symbol, URI) to the mint account using Metaplex Token Metadata.

   ```bash
   npm run spl:metadata
   ```

3. **Mint Token Supply (`spl_mint.ts`):** Created the wallet's Associated Token Account (ATA) and minted initial supply into it.

   ```bash
   npm run spl:mint
   ```

4. **Transfer Tokens (`spl_transfer.ts`):** Executed an ATA-to-ATA transfer to send token balance to a recipient wallet.

   ```bash
   npm run spl:transfer
   ```

### Part 2: Non-Fungible MPL Core NFT Flow

Executed decentralized storage uploads, Core NFT minting, metadata updates, and ownership transfers using Metaplex Umi:

1. **Upload Asset Image (`nft_image.ts`):** Uploaded `tq-token.png` to decentralized storage via Irys.

   ```bash
   npx tsx src/nft/nft_image.ts
   ```

2. **Upload JSON Metadata (`nft_metadata.ts`):** Serialized and pinned Metaplex-compliant JSON metadata to Irys.

   ```bash
   npx tsx src/nft/nft_metadata.ts
   ```

3. **Mint MPL Core NFT (`nft_mint.ts`):** Minted the Core NFT asset on-chain using the uploaded metadata URI.

   ```bash
   npm run nft:mint
   ```

4. **Update NFT Metadata (`nft_update.ts`):** Updated the NFT name to `"TORQ Core NFT V2"` as the Update Authority.

   ```bash
   npm run nft:update
   ```

5. **Transfer NFT Ownership (`nft_transfer.ts`):** Transferred the MPL Core asset to a recipient wallet address.

   ```bash
   npm run nft:transfer
   ```

## 📝 On-Chain Verification & Proofs

### SPL Token Details

- **Source Associated Token Account (`fromAta`):** `FiYYtX1H9VqRR8QhcPxYcpY3FhRzvCj2WD7oRKeF5CwA`
- **Destination Associated Token Account (`toAta`):** `6s88Bh3z2p5vcB6xTrBA6F4i1q8eYPioe8MNzD4DB4ut`

### MPL Core NFT Details

- **Raw Image URI (Irys):** `https://gateway.irys.xyz/6rEm66Nx3s9fpaxSYP5mDxzPzGxsvg9Szd7m7qc6TVX3`
- **JSON Metadata URI (Irys):** `https://gateway.irys.xyz/7H6HsKsivSPsj8uvfuCZ67ztzU6fSPmRjxFt4zt6FKqY`
- **NFT Asset Address:** `EKaBt5wzS5adhxgj15rpbL5jT4qJQyDiPKiQMMdTQFVV`
- **Mint Transaction Signature:** `G8TLq2oWnEPhqfMxCWKPjXv8VgUJwAK9CpHQqaSgkUGDKRZsSverkRDJMQu1o2k3m6mTACx9QpGdswGepNHddcA`
- **Update Metadata Signature:** `5jBdRJSWXG36XUjYhyYeV4LKHfq2CMiaGqshGJPURTEJY7AwCpUxcGxqXUfSqF7ZGwyvTRbyQU6QJDaoNP3WN7Db`
- **Transfer NFT Signature:** `35XUPJDWkeW5ork3dYX8K4wLTkUwLGvU1qwFJdG3T2JtBwx7Qa3kz7rGGadrQnAbisNtoZBuZ2aKmgEK3q49NLS6`
- **Transferred New Owner:** `6s88Bh3z2p5vcB6xTrBA6F4i1q8eYPioe8MNzD4DB4ut`

<img width="1905" height="943" alt="image" src="https://github.com/user-attachments/assets/d3443a06-26a8-4579-89b4-4e48f2d9595e" />

<img width="1902" height="431" alt="image" src="https://github.com/user-attachments/assets/4c0d081e-0ea9-4cc0-ad2f-15a1a754781a" />

## 🔍 Detailed On-Chain Account Verification Breakdown

Analysis of the minted NFT asset on Solscan / Solana Explorer:

- **Account / Asset Address:** `EKaBt5wzS5adhxgj15rpbL5jT4qJQyDiPKiQMMdTQFVV` (Matches generated asset key)
- **Owner Program:** `CoRE111111111111111111111111111111111111111` (Official Metaplex Core Program ID `CoREEN...ZNhX7d`, proving standard compliance)
- **Instruction Executed:** `createV2` (Confirms exact MPL Core mint instruction executed on-chain)
- **Payer / Signer:** `5Z4StfMBzEa6gp8HxF7dYoVLwn218aAgyS4U7NjRHgwX` (Matches local wallet address derived from `devnet-wallet.json`)

<img width="1907" height="748" alt="image" src="https://github.com/user-attachments/assets/3043038d-138c-4f74-a234-072821826c64" />

## 🔗 Verification Links

- **Metaplex Core Explorer:** [View Asset Card on Metaplex](https://core.metaplex.com/explorer/EKaBt5wzS5adhxgj15rpbL5jT4qJQyDiPKiQMMdTQFVV?env=devnet)
- **Solscan Account View:** [View Asset Account on Solscan](https://solscan.io/address/EKaBt5wzS5adhxgj15rpbL5jT4qJQyDiPKiQMMdTQFVV?cluster=devnet)
- **Solana Explorer (Asset Account):** [View Account on Solana Explorer](https://explorer.solana.com/address/EKaBt5wzS5adhxgj15rpbL5jT4qJQyDiPKiQMMdTQFVV?cluster=devnet)
- **Solana Explorer (Mint Transaction):** [View Mint Transaction](https://explorer.solana.com/tx/G8TLq2oWnEPhqfMxCWKPjXv8VgUJwAK9CpHQqaSgkUGDKRZsSverkRDJMQu1o2k3m6mTACx9QpGdswGepNHddcA?cluster=devnet)
- **Solana Explorer (Update Transaction):** [View Update Signature](https://explorer.solana.com/tx/5jBdRJSWXG36XUjYhyYeV4LKHfq2CMiaGqshGJPURTEJY7AwCpUxcGxqXUfSqF7ZGwyvTRbyQU6QJDaoNP3WN7Db?cluster=devnet)
- **Solana Explorer (Transfer Transaction):** [View Transfer Signature](https://explorer.solana.com/tx/35XUPJDWkeW5ork3dYX8K4wLTkUwLGvU1qwFJdG3T2JtBwx7Qa3kz7rGGadrQnAbisNtoZBuZ2aKmgEK3q49NLS6?cluster=devnet)
