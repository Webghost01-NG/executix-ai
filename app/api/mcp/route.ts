import { NextRequest, NextResponse } from 'next/server';
import { EXECUTIX_MCP_TOOLS, handleMcpToolInvocation } from '@/lib/mcpServer';

export async function GET() {
  return NextResponse.json({
    jsonrpc: "2.0",
    protocolVersion: "1.0",
    serverInfo: {
      name: "Executix AI MCP Server",
      version: "1.0.0",
      description: "Full-Stack Autonomous Onchain Execution Engine for AI Agents"
    },
    tools: EXECUTIX_MCP_TOOLS
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, arguments: args } = body;

    if (!name) {
      return NextResponse.json({ error: "Tool name is required" }, { status: 400 });
    }

    const result = await handleMcpToolInvocation(name, args || {});
    return NextResponse.json({
      jsonrpc: "2.0",
      result
    });
  } catch (err: any) {
    return NextResponse.json({
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: err.message || "Internal MCP Server error"
      }
    }, { status: 500 });
  }
}
