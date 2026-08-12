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
    { id: 'executix', label: 'Swap Pilot', icon: Cpu },
    { id: 'mcp', label: 'MCP Server', icon: Terminal },
    { id: 'logger', label: 'Audit Logs', icon: Zap },
    { id: 'jobs', label: 'Worker Queue', icon: ShieldCheck },
    { id: 'teardown', label: 'SDK Specs', icon: BookOpen },
  ];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* FillPilot Minimal Brand Header */}
          <button 
            onClick={() => setActiveTab('executix')}
            className="flex items-center gap-2.5 cursor-pointer text-left shrink-0"
          >
            <Logo className="w-6 h-6 shrink-0" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base tracking-tight">
                FillPilot <span className="text-slate-500 text-xs font-normal">Base / Sepolia</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-mono font-semibold border border-slate-200">
                CoW Protocol
              </span>
            </div>
          </button>

          {/* Minimal FillPilot Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Minimal Dark Connect Wallet Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleConnectWalletClick}
              disabled={walletLoading}
              className={`btn-dark text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                walletState.isConnected ? 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200' : ''
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>
                {walletLoading ? "Connecting..." : 
                 walletState.isConnected ? `${walletState.address.slice(0,6)}...${walletState.address.slice(-4)}` : "Connect Wallet"}
              </span>
            </button>
          </div>

        </div>
      </div>

      {walletError && (
        <div className="bg-slate-100 border-b border-slate-200 p-2 text-center text-xs text-slate-800 font-medium">
          💡 {walletError} — Click <button onClick={handleConnectWalletClick} className="underline font-bold">Connect Wallet</button> to connect.
        </div>
      )}
    </header>
  );
}
