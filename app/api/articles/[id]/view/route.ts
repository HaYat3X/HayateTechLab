// =============================================================================
// モジュール
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';

// =============================================================================
// 自作モジュール
// =============================================================================
import { incrementViewCount, getViewCount } from '@/service/ViewCountService';

// =============================================================================
// GET: 記事の表示数を取得
// =============================================================================
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articleId = params.id;
    const viewCount = await getViewCount(articleId);
    
    return NextResponse.json({ viewCount }, { status: 200 });
  } catch (error) {
    console.error('表示数取得エラー:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// =============================================================================
// POST: 記事の表示数をインクリメント
// =============================================================================
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articleId = params.id;
    const newViewCount = await incrementViewCount(articleId);
    
    return NextResponse.json({ viewCount: newViewCount }, { status: 200 });
  } catch (error) {
    console.error('表示数インクリメントエラー:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
