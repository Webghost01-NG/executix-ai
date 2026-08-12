"use client";
import React, { useState } from 'react';
import { ShieldCheck, Clock, Plus, CheckCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function KeeperJobScheduler() {
  const [cronExp, setCronExp] = useState<string>("*/5 * * * *");
  const [jobTitle, setJobTitle] = useState<string>("Automated 5-Min Sepolia Vault Health Check");
  const [jobs, setJobs] = useState([
    { id: "job-1", title: "Automated 5-Min Sepolia Vault Health Check", cron: "*/5 * * * *", status: "ACTIVE", lastRun: "2 mins ago" },
    { id: "job-2", title: "CoW Protocol USDC Limit Order Check", cron: "0 * * * *", status: "ACTIVE", lastRun: "45 mins ago" }
  ]);

  const handleAddJob = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!jobTitle) return;

    setJobs(prev => [
      { id: `job-${Date.now()}`, title: jobTitle, cron: cronExp, status: "ACTIVE", lastRun: "Just now" },
      ...prev
    ]);
    setJobTitle("");
  };

  return (
    <div className="space-y-6">
      <div className="site-card p-6 bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="badge-green text-xs font-semibold uppercase">Recurring Onchain Automation</span>
          <h2 className="text-xl font-bold text-slate-900">Background Worker Queue & Jobs Scheduler</h2>
          <p className="text-xs text-slate-600">Schedules recurring agent jobs in PostgreSQL executed by the Executix background worker daemon.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="site-card p-6 space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-600" />
              Schedule New Worker Job
            </span>
          </div>

          <form onSubmit={handleAddJob} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Job Title</label>
              <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g. Automated Sepolia Vault Rebalance..." className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Cron Schedule Expression</label>
              <input type="text" value={cronExp} onChange={(e) => setCronExp(e.target.value)} placeholder="*/5 * * * *" className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono" />
            </div>

            <button type="submit" className="w-full py-3 rounded-xl btn-primary font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer">
              <RefreshCw className="w-4 h-4 text-white" />
              <span>Persist Cron Job to PostgreSQL Queue</span>
            </button>
          </form>
        </div>

        <div className="site-card p-6 space-y-3 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Active Worker Queue Jobs ({jobs.length})
            </span>
          </div>

          <div className="space-y-3">
            {jobs.map((job) => (
              <div key={job.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">{job.title}</span>
                  <span className="text-[11px] font-mono text-slate-500 block">Cron: {job.cron} • Last run: {job.lastRun}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-semibold">{job.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
