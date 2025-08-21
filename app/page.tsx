'use client';

// =============================================================================
// モジュール
// =============================================================================
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// =============================================================================
// 自作モジュール
// =============================================================================
import SearchBar from '@/components/feature/blog/SearchBar';
import ArticleFilter from '@/components/feature/blog/ArticleFilter';
import type { ArticleCategory } from '@/types/feature/article/interface/ArticleCategory';
import type { Article } from '@/types/feature/article/interface/ArticleType';
import ArticleCard from '@/components/feature/blog/ArticleCard';
import SideMenu, { SortKey } from '@/components/feature/blog/SideMenu';

const ArticlesPage = () => {
  // =============================================================================
  // セットアップ
  // =============================================================================
  const [sort, setSort] = useState<SortKey>("new"); 
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

  const clearFilters = () => {
    setActiveCategory('all');
    setSearchTerm('');
  };

  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <div className="space-y-8">
      <section
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] animate-fade-in" />
        <div className="text-center relative">
          <h1 className="text-6xl font-bold gradient-text animate-slide-in animate-delay-200">
            HayateTechLab<span className="text-gray-900 dark:text-white">で技術を探求する</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto my-8 leading-relaxed animate-slide-in animate-delay-200">
            HayateTechLabは、エンジニアのHayate Takedaが日々の技術調査や学びをまとめた個人ブログです。<br />
            フロントエンドやバックエンド、AI、ビジネスなど、幅広い分野で実践的な情報を発信しています。
          </p>
        </div>
      </section>

      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-6">
        <main >
          <h1 className="text-3xl font-bold gradient-text mb-5">話題の記事</h1>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.slice(0, 4).map((article, index) => (
              index === 0 ? (
                <div key={(article as any).id ?? (article as any).slug ?? article.title} className="col-span-full rounded-xl shadow-md hover:shadow-lg transition-shadow group">
                  <ArticleCard article={article} />
                </div>
              ) : (
                <ArticleCard key={(article as any).id ?? (article as any).slug ?? article.title} article={article} />
              )
            ))}
          </div>

          <h1 className="text-3xl font-bold gradient-text mt-10 pt-5 mb-5">最新の記事</h1>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.slice(0, 19).map((article, index) => (
              index === 0 ? (
                <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow group">
                  <ArticleCard key={(article as any).id ?? (article as any).slug ?? article.title} article={article} />
                </div>
              ) : (
                <ArticleCard key={(article as any).id ?? (article as any).slug ?? article.title} article={article} />
              )
            ))}
          </div>
        </main>

        <SideMenu
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sort={sort}
          onSortChange={setSort}
        />
      </div>
    </div>
  );
};

export default ArticlesPage;
