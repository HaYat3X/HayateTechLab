'use client';

// =============================================================================
// モジュール
// =============================================================================
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// =============================================================================
// 自作モジュール
// =============================================================================
import SearchBar from '@/components/feature/article/SearchBar';
import ArticleFilter from '@/components/feature/article/ArticleFilter';
import type { ArticleCategory } from '@/types/feature/article/interface/ArticleCategory';
import type { Article } from '@/types/feature/article/interface/ArticleType';
import ArticleCard from '@/components/feature/article/ArticleCard';

const ArticlesPage = () => {
  // =============================================================================
  // セットアップ
  // =============================================================================
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories: ArticleCategory[] = [
    { id: 'all', name: '全て' },
    { id: 'フロントエンド', name: 'フロントエンド' },
    { id: 'バックエンド', name: 'バックエンド' },
    { id: '自動化・連携', name: '自動化・連携' },
    { id: 'アーキテクチャ・設計', name: 'アーキテクチャ・設計' },
    { id: '開発ツール・環境', name: '開発ツール・環境' },
    { id: 'ドキュメント・構成管理', name: 'ドキュメント・構成管理' },
    { id: '働き方・キャリア', name: '働き方・キャリア' },
    { id: 'プロジェクト管理', name: 'プロジェクト管理' },
    { id: '組織・チーム運営', name: '組織・チーム運営' },
    { id: 'マーケ・戦略', name: 'マーケ・戦略' },
  ];

  // =============================================================================
  // state
  // =============================================================================
  const initialCategory = searchParams.get('category') || 'all';
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');

  // =============================================================================
  // ライフサイクルフック
  // =============================================================================
  /**
   * コンポーネントがマウントされたときに、APIから記事データを取得
   * 取得したデータは、stateに保存され、記事一覧の表示に使用
   */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/articles');
        const data = await res.json();
        console.log('✅ 記事取得成功:', data);
        setArticles(data.articles || []);
      } catch (err) {
        console.error('❌ 記事取得エラー:', err);
      }
    })();
  }, []);

  /**
   * クエリパラメータや検索キーワード、記事データが変更されたときに、
   * アクティブなカテゴリを更新し、それに応じた記事リストをフィルターする。
   */
  useEffect(() => {
    // クエリパラメータからカテゴリを取得（なければ "all"）
    const currentCategory = searchParams.get('category') || 'all';
    setActiveCategory(currentCategory);

    // フィルター処理
    let result = articles;

    // カテゴリフィルター
    if (currentCategory !== 'all') {
      result = result.filter(article => article.category === currentCategory);
    }

    // キーワード検索
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        article =>
          article.title.toLowerCase().includes(lower) ||
          article.excerpt.toLowerCase().includes(lower)
      );
    }

    setFilteredArticles(result);
  }, [searchParams, articles, searchTerm]);

  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold gradient-text">記事一覧</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <ArticleFilter
          categories={categories}
          value={activeCategory}
          onChange={(value) => {
            setActiveCategory(value);
            router.push(`/articles?category=${value}`);
          }}
        />
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            条件に一致する記事が見つかりませんでした。
          </p>
          <button
            onClick={() => {
              router.push('/articles?category=all');
              setSearchTerm('');
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            フィルターをリセット
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
