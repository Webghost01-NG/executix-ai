export type NetworkType = 'sepolia' | 'mainnet' | 'base';

export interface Web3WalletState {
  isConnected: boolean;
  address: string;
  balance: string;
  networkName: string;
  chainId: string;
}

export interface KeeperExecuteResponse {
  success: boolean;
  status: string;
  txHash?: string;
  network?: string;
  explorerUrl?: string;
  executor?: string;
  message?: string;
  stepTimeline?: { step: string; status: 'PASS' | 'FAIL' | 'SKIPPED'; detail: string }[];
}

export interface OnchainTxRecord {
  time: string;
  hash: string;
  target: string;
  amount: string;
  network: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}
