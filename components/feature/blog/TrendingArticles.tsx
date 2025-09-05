'use client';

// =============================================================================
// モジュール
// =============================================================================
import { useEffect, useState } from 'react';
import { Eye, TrendingUp } from 'lucide-react';

// =============================================================================
// 自作モジュール
// =============================================================================
import type { Article } from '@/types/feature/article/interface/ArticleType';
import ArticleCard from './ArticleCard';

// =============================================================================
// 型定義
// =============================================================================
interface TrendingArticlesProps {
  limit?: number;
  showTitle?: boolean;
  className?: string;
}

// =============================================================================
// コンポーネント
// =============================================================================
const TrendingArticles = ({ 
  limit = 6, 
  showTitle = true,
  className = ""
}: TrendingArticlesProps) => {
  // =============================================================================
  // state
  // =============================================================================
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =============================================================================
  // ライフサイクルフック
  // =============================================================================
  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/articles/trending?limit=${limit}`);
        const data = await res.json();
        
        if (data.articles) {
          setTrendingArticles(data.articles);
        } else {
          setError('記事の取得に失敗しました');
        }
      } catch (err) {
        console.error('話題の記事取得エラー:', err);
        setError('記事の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingArticles();
  }, [limit]);

  // =============================================================================
  // レンダリング
  // =============================================================================
  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showTitle && (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              話題の記事
            </h2>
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showTitle && (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              話題の記事
            </h2>
          </div>
        )}
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (trendingArticles.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showTitle && (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              話題の記事
            </h2>
          </div>
        )}
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">まだ記事がありません</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {showTitle && (
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-800">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                話題の記事
              </h2>
              <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                表示数順で人気記事を表示
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {trendingArticles.map((article, index) => (
          <div 
            key={article.id} 
            className="group relative transform hover:-translate-y-2 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <ArticleCard article={article} />
              
              {/* 表示数バッジ */}
              {article.viewCount && article.viewCount > 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-semibold shadow-lg">
                    <Eye size={12} />
                    <span>{article.viewCount}</span>
                  </div>
                </div>
              )}
              
              {/* ランキング表示 */}
              <div className="absolute top-4 left-4 z-10">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>
              
              {/* ホバー時のオーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;
