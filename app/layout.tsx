import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Executix AI - Autonomous Onchain DEX Swap & Worker Engine',
  description: 'Full-stack PostgreSQL, Docker, Background Worker & KeeperHub Execution Engine for AI Agents.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
