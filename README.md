# ⚡ Executix AI: Autonomous Onchain Execution Engine & Background Worker Architecture

> **Executix AI** is a full-stack, enterprise-grade execution platform engineered for **KeeperHub** and **Model Context Protocol (MCP v1.0)**. It powers deterministic AI agent swaps, vault rebalances, and automated smart contract interactions using PostgreSQL, Docker containerization, a background worker daemon, and Viem/Wagmi Web3 wallet connectivity.

---

## 🏗️ Architecture & Stack Breakdown

```
 ┌─────────────────────────────────────────────────────────────┐
 │                Executix AI Next.js 15 Frontend              │
 └──────────────────────────────┬──────────────────────────────┘
                                │ REST / MCP JSON-RPC
 ┌──────────────────────────────▼──────────────────────────────┐
 │             PostgreSQL Database (Prisma ORM)                │
 │         Stores: AgentJob, OrderIntent, AuditLog             │
 └──────────────────────────────┬──────────────────────────────┘
                                │ Queue Polling
 ┌──────────────────────────────▼──────────────────────────────┐
 │         Executix Background Worker Daemon (ts-node)         │
 │     Evaluates order deadlines, gas limits & DEX routes      │
 └──────────────────────────────┬──────────────────────────────┘
                                │ Direct Execution Writes
 ┌──────────────────────────────▼──────────────────────────────┐
 │           KeeperHub Official Enclave API & SDK              │
 │          Ethereum Sepolia / Base Mainnet Onchain            │
 └─────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quickstart

```bash
# 1. Environment Setup
cp .env.example .env.local

# 2. Start PostgreSQL Container via Docker Compose
docker compose up -d postgres

# 3. Install Dependencies & Generate Prisma Client
npm install
npm run db:generate

# 4. Start Next.js Development Server
npm run dev

# 5. Start Background Worker Daemon (In a second terminal)
npm run dev:worker
```

App is live at `http://localhost:3000`.

---

## 📄 License
MIT License.
