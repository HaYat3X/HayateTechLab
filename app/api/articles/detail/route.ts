// =============================================================================
// モジュール
// =============================================================================
import { NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';
export const dynamic = 'force-dynamic';

/**
 * NotionページのrecordMapを取得するAPIエンドポイント（GET）
 * 
 * クエリパラメータ `?id=ページID` を受け取り、NotionAPIから該当ページの
 * recordMap（ページ構造と内容）を取得して返却
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const pageId = url.searchParams.get('id');

  if (!pageId) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(pageId);
    return NextResponse.json({ recordMap });
  } catch (error) {
    console.error('❌ Notion fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
