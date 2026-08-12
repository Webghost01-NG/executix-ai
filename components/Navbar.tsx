"use client";
import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck, Zap, BookOpen, Terminal, Wallet, LucideIcon } from 'lucide-react';
import Logo from './Logo';
import { Web3WalletState } from '@/types/keeper';
import { connectWeb3Wallet, getInjectedProvider } from '@/lib/wallet';

export type TabType = 'executix' | 'mcp' | 'logger' | 'jobs' | 'teardown';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  walletState: Web3WalletState;
  setWalletState: (wallet: Web3WalletState) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: LucideIcon;
}

export default function Navbar({ activeTab, setActiveTab, walletState, setWalletState }: NavbarProps) {
  const [walletLoading, setWalletLoading] = useState<boolean>(false);
  const [walletError, setWalletError] = useState<string | null>(null);

  useEffect(() => {
    const provider = getInjectedProvider();
    if (provider) {
      provider.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            connectWeb3Wallet().then(setWalletState).catch(() => {});
          }
        })
        .catch(() => {});

      if (provider.on) {
        provider.on('accountsChanged', (accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            connectWeb3Wallet().then(setWalletState).catch(() => {});
          } else {
            setWalletState({ isConnected: false, address: '', balance: '0 ETH', networkName: 'Ethereum Sepolia', chainId: '0xaa36a7' });
          }
        });
      }
    }
  }, [setWalletState]);

  const handleConnectWalletClick = async (): Promise<void> => {
    setWalletLoading(true);
    setWalletError(null);

    try {
      const state = await connectWeb3Wallet();
      setWalletState(state);
      setWalletLoading(false);
    } catch (err: any) {
      setWalletLoading(false);
      setWalletError(err.message || "Could not connect Web3 wallet");
    }
  };

  const navItems: NavItem[] = [
    { id: 'executix', label: 'Agent Console', icon: Cpu },
    { id: 'mcp', label: 'MCP Server', icon: Terminal },
    { id: 'logger', label: 'Audit Logs', icon: Zap },
    { id: 'jobs', label: 'Worker Queue', icon: ShieldCheck },
    { id: 'teardown', label: 'SDK Teardown', icon: BookOpen },
  ];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Title */}
          <button 
            onClick={() => setActiveTab('executix')}
            className="flex items-center gap-3 cursor-pointer text-left group"
          >
            <Logo className="w-8 h-8" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-lg tracking-tight block leading-tight">
                  Executix <span className="text-emerald-600">AI</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold">
                  POSTGRES + WORKER
                </span>
              </div>
              <span className="text-xs text-slate-500 font-normal block">
                Autonomous Onchain DEX Swap & Intent Routing Engine
              </span>
            </div>
          </button>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Connect Wallet Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleConnectWalletClick}
              disabled={walletLoading}
              className={`btn-primary text-sm font-semibold flex items-center gap-2 cursor-pointer ${
                walletState.isConnected ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100' : ''
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>
                {walletLoading ? "Connecting..." : 
                 walletState.isConnected ? `${walletState.address.slice(0,6)}...${walletState.address.slice(-4)} (${walletState.balance})` : "Connect Wallet"}
              </span>
            </button>
          </div>

        </div>
      </div>

      {walletError && (
        <div className="bg-emerald-50 border-b border-emerald-200 p-2 text-center text-xs text-emerald-900 font-medium">
          💡 {walletError} — Click <button onClick={handleConnectWalletClick} className="underline font-bold">Connect Wallet</button> to connect.
        </div>
      )}
    </header>
  );
}
