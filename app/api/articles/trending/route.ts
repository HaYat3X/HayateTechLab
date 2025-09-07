// =============================================================================
// モジュール
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';

// =============================================================================
// 自作モジュール
// =============================================================================
import { fetchArticlesFromNotion } from '@/service/ArticleService';
import type { Article } from '@/types/feature/article/interface/ArticleType';

// =============================================================================
// GET: 話題の記事を取得
// =============================================================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // 全ての記事を取得（Notionの`閲覧数`を含む）
    const articles = await fetchArticlesFromNotion();

    // 表示数でソート（降順）
    const trendingArticles = (articles as Article[])
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, limit);
    
    return NextResponse.json({ 
      articles: trendingArticles,
      total: trendingArticles.length 
    }, { status: 200 });
  } catch (error) {
    console.error('話題の記事取得エラー:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
