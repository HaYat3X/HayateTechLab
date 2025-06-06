// =============================================================================
// モジュール
// =============================================================================
import { NextResponse } from 'next/server';

// =============================================================================
// 自作モジュール
// =============================================================================
import { fetchArticlesFromNotion } from '@/service/ArticleService';

export async function GET() {
  try {
    const articles = await fetchArticlesFromNotion();
    return NextResponse.json({ articles }, { status: 200 });
  } catch (err) {
    console.error('記事の取得に失敗しました:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}