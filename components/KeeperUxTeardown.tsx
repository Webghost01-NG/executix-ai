"use client";
import React from 'react';
import { BookOpen, Award, AlertCircle, Lightbulb, Star, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function KeeperUxTeardown() {
  const teardowns = [
    {
      title: "1. PostgreSQL Queue Sync with KeeperHub Relayer",
      status: "PR PROPOSAL",
      severity: "HIGH ARCHITECTURE BENEFIT",
      observation: "First-time AI agent developers building with KeeperHub have to write custom queue polling and retry logic from scratch.",
      recommendation: "Merge `@keeperhub/sdk/worker` helper to automatically connect Prisma PostgreSQL queues to KeeperHub relayers."
    },
    {
      title: "2. CoW Protocol Swap Order Deadline Auto-Renewal",
      status: "OPTIMIZATION OPPORTUNITY",
      severity: "MEDIUM",
      observation: "When market gas spikes on Mainnet/Sepolia, CoW Protocol swap orders expire before KeeperHub relayers complete execution.",
      recommendation: "Expose auto-renewing order intent headers `{ autoRenewDeadline: true, maxSlippagePct: 0.5 }` in KeeperHub API payloads."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="site-card p-6 bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-3xl">
          <span className="badge-green text-xs font-semibold uppercase flex items-center gap-1.5 w-fit">
            <Award className="w-4 h-4 text-emerald-700" />
            Official $1,000 Onboarding UX Improvement Bounty Spec
          </span>
          <h2 className="text-xl font-bold text-slate-900">KeeperHub SDK Friction Teardown & Proposed PR Contributions</h2>
          <p className="text-xs text-slate-600">Technical teardown evaluating `@keeperhub/sdk`, PostgreSQL worker integration, and CoW Protocol DEX swap onboarding friction points.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold shrink-0">
          <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
          <span>Bounty Qualified</span>
        </div>
      </div>

      <div className="space-y-4">
        {teardowns.map((item, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="site-card p-5 space-y-3 bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600" />
                {item.title}
              </h3>
              <span className="badge-green text-[10px]">{item.status}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
              <div className="space-y-1.5 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] text-amber-900 uppercase font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" /> Observation
                </span>
                <p className="text-slate-800 leading-relaxed">{item.observation}</p>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] text-emerald-900 uppercase font-bold flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-700" /> Proposed SDK Solution
                </span>
                <p className="text-slate-800 leading-relaxed">{item.recommendation}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
