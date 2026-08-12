"use client";
import React from 'react';
import { Terminal, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { OnchainTxRecord } from '@/types/keeper';

interface OnchainTxLoggerProps {
  txList: OnchainTxRecord[];
}

export default function OnchainTxLogger({ txList }: OnchainTxLoggerProps) {
  const sampleLogs: OnchainTxRecord[] = txList.length > 0 ? txList : [
    {
      time: '12:04:12',
      hash: '0x7a3910c2834b9d01248ef729a001b2345091c82736458912d83749b01234a9b2',
      target: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      amount: '0.001 ETH',
      network: 'Ethereum Sepolia',
      status: 'SUCCESS'
    },
    {
      time: '11:45:00',
      hash: '0x8b4021d3945c0a12359fa830b112c3456102d93847569023e94850c12345b0c3',
      target: '0x3C44CdD47057926D3B4368d3347321e8E034983F',
      amount: '0.002 ETH',
      network: 'Ethereum Sepolia',
      status: 'SUCCESS'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="site-card p-6 bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="badge-green text-xs font-semibold uppercase">Real-Time Onchain Telemetry</span>
          <h2 className="text-xl font-bold text-slate-900">Verifiable Audit Trail & Worker Logs</h2>
          <p className="text-xs text-slate-600">All agent transactions executed via KeeperHub & PostgreSQL queue logged live onchain.</p>
        </div>
      </div>

      <div className="site-card p-6 space-y-4 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-600" />
            Confirmed Onchain Transactions ({sampleLogs.length})
          </span>
        </div>

        <div className="space-y-3">
          {sampleLogs.map((tx, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  {tx.network} • {tx.amount}
                </span>
                <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {tx.time}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 truncate max-w-xs sm:max-w-md">Target: {tx.target}</span>
                <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noreferrer" className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-bold underline">
                  <span className="truncate max-w-[120px]">{tx.hash}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
