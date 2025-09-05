// =============================================================================
// モジュール
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';

// =============================================================================
// 自作モジュール
// =============================================================================
import { fetchArticlesFromNotion } from '@/service/ArticleService';
import { getAllViewCounts } from '@/service/ViewCountService';
import type { Article } from '@/types/feature/article/interface/ArticleType';

// =============================================================================
// GET: 話題の記事を取得
// =============================================================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // 全ての記事を取得
    const articles = await fetchArticlesFromNotion();
    
    // 表示数データを取得
    const viewCounts = await getAllViewCounts();
    
    // 記事に表示数を追加
    const articlesWithViewCount: Article[] = articles.map(article => ({
      ...article,
      viewCount: viewCounts[article.id] || 0
    }));
    
    // 表示数でソート（降順）
    const trendingArticles = articlesWithViewCount
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
