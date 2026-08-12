"use client";
import React, { useState } from 'react';
import Navbar, { TabType } from '@/components/Navbar';
import ExecutixDashboard from '@/components/ExecutixDashboard';
import OnchainTxLogger from '@/components/OnchainTxLogger';
import KeeperJobScheduler from '@/components/KeeperJobScheduler';
import KeeperUxTeardown from '@/components/KeeperUxTeardown';
import KeeperMcpInspector from '@/components/KeeperMcpInspector';
import { Github } from 'lucide-react';
import { OnchainTxRecord, Web3WalletState } from '@/types/keeper';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('executix');
  const [executedTxs, setExecutedTxs] = useState<OnchainTxRecord[]>([]);
  const [walletState, setWalletState] = useState<Web3WalletState>({
    isConnected: false,
    address: '',
    balance: '0 ETH',
    networkName: 'Ethereum Sepolia',
    chainId: '0xaa36a7'
  });

  const handleTxExecuted = (newTx: OnchainTxRecord): void => {
    setExecutedTxs(prev => [newTx, ...prev]);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        walletState={walletState}
        setWalletState={setWalletState}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'executix' && (
          <ExecutixDashboard walletState={walletState} onTxExecuted={handleTxExecuted} />
        )}
        {activeTab === 'mcp' && (
          <KeeperMcpInspector walletState={walletState} />
        )}
        {activeTab === 'logger' && (
          <OnchainTxLogger txList={executedTxs} />
        )}
        {activeTab === 'jobs' && (
          <KeeperJobScheduler />
        )}
        {activeTab === 'teardown' && (
          <KeeperUxTeardown />
        )}
      </main>

      {/* Enterprise Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-800 font-semibold">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Executix AI</span>
            <span>— Full-Stack PostgreSQL, Docker, Worker & KeeperHub Execution Engine</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Webghost01-NG/executix-ai" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-800 hover:text-emerald-600 flex items-center gap-1.5 underline font-bold"
            >
              <Github className="w-4 h-4 text-slate-900" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
