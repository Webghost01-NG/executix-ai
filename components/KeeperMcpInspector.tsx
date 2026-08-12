"use client";
import React, { useState } from 'react';
import { Terminal, Cpu, Play, CheckCircle2, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { EXECUTIX_MCP_TOOLS } from '@/lib/mcpServer';
import { Web3WalletState } from '@/types/keeper';

interface KeeperMcpInspectorProps {
  walletState: Web3WalletState;
}

export default function KeeperMcpInspector({ walletState }: KeeperMcpInspectorProps) {
  const [selectedTool, setSelectedTool] = useState<string>("executix_submit_intent");
  const [toolPrompt, setToolPrompt] = useState<string>("Sell 100 USDC for WETH by deadline via CoW Protocol and KeeperHub");
  const [targetAddr, setTargetAddr] = useState<string>("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
  const [toolAmount, setToolAmount] = useState<string>("0.001");
  const [mcpOutput, setMcpOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleTestMcpCall = async (): Promise<void> => {
    setLoading(true);
    setMcpOutput(null);

    try {
      const res = await fetch('/api/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedTool,
          arguments: {
            prompt: toolPrompt,
            targetAddress: targetAddr,
            amount: toolAmount,
            network: "sepolia"
          }
        })
      });
      const data = await res.json();
      setMcpOutput(JSON.stringify(data, null, 2));
      setLoading(false);
    } catch (err) {
      setMcpOutput(JSON.stringify({ error: "MCP connection failed" }, null, 2));
      setLoading(false);
    }
  };

  const handleCopyJson = (): void => {
    if (!mcpOutput) return;
    navigator.clipboard.writeText(mcpOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="site-card p-6 bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="badge-green text-xs font-semibold uppercase">
            Executix AI Native MCP Protocol (v1.0) Integration
          </span>
          <h2 className="text-xl font-bold text-slate-900">Executix Agent MCP Tool Inspector</h2>
          <p className="text-xs text-slate-600">
            Allows external AI agents (ElizaOS, OpenClaw, Hermes, Claude Desktop) to submit intent jobs to PostgreSQL and trigger KeeperHub executions natively.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 shrink-0">
          <Cpu className="w-4 h-4 text-emerald-600" />
          <span>Endpoint: /api/mcp</span>
        </div>
      </div>

      {/* Main Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Tool Selection & Request Payload Builder */}
        <div className="site-card p-6 space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              Select Executix MCP Tool
            </span>
            <span className="text-xs text-slate-500 font-medium">3 Tools Available</span>
          </div>

          <div className="space-y-2">
            {EXECUTIX_MCP_TOOLS.map((tool) => (
              <button
                key={tool.name}
                onClick={() => setSelectedTool(tool.name)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedTool === tool.name 
                    ? 'bg-emerald-50 border-emerald-500 text-slate-900 font-bold' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800">{tool.name}</span>
                  {selectedTool === tool.name && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-xs text-slate-500 mt-1">{tool.description}</p>
              </button>
            ))}
          </div>

          {selectedTool === 'executix_submit_intent' && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Intent Prompt Parameter</label>
                <input
                  type="text"
                  value={toolPrompt}
                  onChange={(e) => setToolPrompt(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Target Address</label>
                  <input
                    type="text"
                    value={targetAddr}
                    onChange={(e) => setTargetAddr(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium truncate"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Amount (ETH)</label>
                  <input
                    type="text"
                    value={toolAmount}
                    onChange={(e) => setToolAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleTestMcpCall}
            disabled={loading}
            className="w-full py-3 rounded-xl btn-primary font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Play className="w-4 h-4 text-white fill-white" />
                <span>Invoke MCP Tool ({selectedTool})</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Response Output Card */}
        <div className="site-card p-6 space-y-3 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              MCP JSON-RPC Output Stream
            </span>
            {mcpOutput && (
              <button 
                onClick={handleCopyJson}
                className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 cursor-pointer font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            )}
          </div>

          <div className="p-4 rounded-xl min-h-[300px] max-h-[400px] overflow-y-auto bg-slate-50 border border-slate-200 font-mono text-xs text-slate-900">
            {!mcpOutput && !loading && (
              <div className="h-60 flex flex-col items-center justify-center text-slate-400 text-center space-y-2">
                <Terminal className="w-8 h-8 text-emerald-600 animate-pulse" />
                <p className="text-xs text-slate-700 font-medium">Click 'Invoke MCP Tool' to test JSON-RPC agent execution.</p>
              </div>
            )}

            {loading && (
              <div className="h-60 flex flex-col items-center justify-center text-emerald-700 text-center space-y-2">
                <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-slate-900">Dispatching MCP Enclave Request...</p>
              </div>
            )}

            {mcpOutput && !loading && (
              <motion.pre 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-slate-900 font-medium whitespace-pre-wrap leading-relaxed"
              >
                {mcpOutput}
              </motion.pre>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
