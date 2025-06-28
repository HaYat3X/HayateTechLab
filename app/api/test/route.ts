// app/api/notion/start-mcp/route.ts
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

let notionMcpProcess: ReturnType<typeof spawn> | null = null;

export async function GET() {
  if (!notionMcpProcess) {
    notionMcpProcess = spawn("npx", [
      "-y",
      "@notionhq/notion-mcp-server"
    ], {
      env: {
        ...process.env,
        OPENAPI_MCP_HEADERS: JSON.stringify({
          Authorization: `Bearer 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`,
          "Notion-Version": "2022-06-28",
        }),
      },
    });

    if (notionMcpProcess.stdout && notionMcpProcess.stderr) {
      notionMcpProcess.stdout.on("data", (data) => {
        console.log(`[MCP stdout]: ${data}`);
      });
      notionMcpProcess.stderr.on("data", (data) => {
        console.error(`[MCP stderr]: ${data}`);
      });
    }


  }

  return NextResponse.json({ status: "MCP server started" });
}
