# PROJECT CONTEXT: PENGU WIF HAT ($PENGU)

## 1. Project Overview

**PENGU WIF HAT** is a gamified "Web2.5" Presale Experience on Solana.

- [cite_start]**Core Concept:** Users buy tokens instantly via SOL transfer and stake them for daily rewards, managed by a centralized backend authority (Hybrid Model), not a smart contract[cite: 2, 16].
- **Vibe:** Cute, 2D Pixel/Cartoon, Meme, High Energy. [cite_start]"Stay Cool, Get Rich"[cite: 8, 9].
- [cite_start]**Primary Color Palette:** Icy Blue, White (Snow), Yellow (Vest), Brown (Hat)[cite: 10].

## 2. Tech Stack

- [cite_start]**Frontend:** Next.js 14 (App Router), Tailwind CSS, Framer Motion (Animations), Zustand (State Management), `@solana/wallet-adapter-react`[cite: 31, 76].
- [cite_start]**Backend:** Next.js API Routes (Serverless Functions)[cite: 32].
- [cite_start]**Database & Realtime:** Supabase (PostgreSQL)[cite: 36].
- [cite_start]**Infrastructure:** Vercel (Deployment), Helius/Alchemy (RPC/Webhook)[cite: 93, 95].
- [cite_start]**Blockchain Interaction:** Backend Signer (Keypair) for auto-dispensing tokens[cite: 35].

## 3. Architecture: The "Backend Authority" Model (Web2.5)

_Crucial: This project does NOT use a presale smart contract. It uses backend logic to manage transfers._

### 3.1. [cite_start]Wallets Setup [cite: 61]

1.  **Treasury Wallet:** Receives SOL from users.
2.  **Dispenser Wallet:** Holds 100% $PENGU supply. Auto-sends token to users upon purchase.
3.  **Staking Wallet:** Receives $PENGU from users who want to stake.
4.  **Rewards Wallet:** Holds $PENGU for staking interest payouts.

### 3.2. Workflows

#### [cite_start]A. Instant Buy Flow [cite: 17, 21]

1.  **User** connects wallet & transfers SOL to **Treasury Wallet**.
2.  **Webhook** detects transaction -> Calls Backend API.
3.  **Backend** validates tx -> Triggers **Dispenser Wallet** to sign & send equivalent $PENGU back to User.
4.  **UI** updates via Supabase Realtime ("Instant Buy" effect).

#### [cite_start]B. Stake-to-Earn Flow [cite: 23, 26]

1.  **User** sends $PENGU to **Staking Wallet**.
2.  **Supabase** records staking entry (User Address, Amount, Timestamp).
3.  **Cron Job (Daily):** Calculates interest (e.g., 1%) -> Triggers **Reward Wallet** to send $PENGU to User.

## 4. UI/UX: Parallax Scrolling Layers

[cite_start]The website is a single long scrolling page with 4 distinct depth layers[cite: 39, 45, 49, 55]:

1.  **The Summit (Hero):** Aurora sky, Mountain peak, Pengu waving.
    - _Features:_ Swap Widget (Input SOL -> Output PENGU), Thermometer Progress Bar.
2.  **The Igloo Village (About):** Igloos, small penguins partying.
    - _Animation:_ Pengu sliding across the screen.
3.  **The Frozen Lake (Tokenomics):** Frozen lake surface, fishing hole.
    - _Visuals:_ Tokenomics displayed on fish/signs (Supply: 1B, Presale: 40%).
4.  **Under the Sea (Roadmap):** Ocean depth, coral, treasure chests.
    - _Visuals:_ Pengu in diving gear. Roadmap on treasure chests.

## [cite_start]5. Database Schema (Supabase) [cite: 86, 25]

### Table: `transactions`

Tracking Buy orders.

- `id` (uuid, pk)
- `tx_hash` (string, unique) - The SOL transfer hash.
- `wallet_address` (string) - Buyer.
- `amount_sol` (numeric)
- `amount_pengu_sent` (numeric)
- `status` (enum: 'pending', 'completed', 'failed')
- `created_at` (timestamp)

### Table: `stakes`

Tracking Staking users.

- `id` (uuid, pk)
- `wallet_address` (string)
- `amount_staked` (numeric)
- `staked_at` (timestamp)
- `last_reward_at` (timestamp)
- `total_rewards_earned` (numeric)

## 6. Development Rules & Guidelines

- [cite_start]**Mobile First:** Ensure Parallax effects are disabled or simplified on mobile to maintain performance[cite: 83].
- **Security:** NEVER expose Private Keys in frontend code. [cite_start]Only use them in Serverless Functions (`process.env`)[cite: 63].
- [cite_start]**Trust Elements:** Publicly display the 3 Wallet Addresses (Treasury, Dispenser, Rewards) on the UI with Solscan links[cite: 98].
- [cite_start]**Components:** Use `ParallaxContainer` to manage scroll depth and `PresaleWidget` for the swap logic[cite: 79, 80].

## [cite_start]7. Task Checklist (Phase 1 - Week 1) [cite: 60]

- [ ] Create SPL Token $PENGU & Assets.
- [ ] Setup Supabase (Tables & Realtime).
- [ ] Implement Wallet Adapter.
- [ ] Build Backend Auto-Sender (Webhook -> Dispenser Logic).
- [ ] Build UI Skeleton (Hero Section + Swap Widget).
