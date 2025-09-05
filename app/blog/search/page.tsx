'use client';

// =============================================================================
// モジュール
// =============================================================================
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// =============================================================================
// 自作モジュール
// =============================================================================
import type { ArticleCategory } from '@/types/feature/article/interface/ArticleCategory';
import type { Article } from '@/types/feature/article/interface/ArticleType';
import ArticleCard from '@/components/feature/blog/ArticleCard';
import SideMenu, { SortKey } from '@/components/feature/blog/SideMenu';
import Pagination from '@/components/feature/blog/Pagination';

// 文字列正規化（全角/半角の揺れや大文字小文字を吸収）
const normalize = (s: string) => s.normalize('NFKC').toLowerCase().trim();

const ArticlesPage = () => {
  // =============================================================================
  // セットアップ
  // =============================================================================
  const [sort, setSort] = useState<SortKey>("new");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
  const initialQuery = searchParams.get('q') || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  // 例: 1ページ12件
  const PER_PAGE = 12;
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PER_PAGE));
  const currentPage = Math.min(
    Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1),
    totalPages
  );
  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = filteredArticles.slice(start, start + PER_PAGE);

  useEffect(() => {
    const t = setTimeout(() => {
      // 状態からクエリを組み立て直す
      const next = new URLSearchParams();
      if (searchTerm) next.set('q', searchTerm);
      if (activeCategory && activeCategory !== 'all') next.set('category', activeCategory);
      if (sort && sort !== 'new') next.set('sort', sort);

      // フィルタが変わったので page はリセット（=付けない）
      // ※ Pagination でページ遷移するときだけ page を付ける想定

      const nextQs = next.toString();
      const currentQs = searchParams.toString();
      if (nextQs !== currentQs) {
        router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(t);
    // sort も依存に入れる
  }, [searchTerm, activeCategory, sort, pathname, router, searchParams]);

  // =============================================================================
  // ライフサイクルフック
  // =============================================================================
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/articles');
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error('❌ 記事取得エラー:', err);
      }
    })();
  }, []);

  // URLクエリ変更に追従（外部からの遷移や戻る/進む対応）
  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  // フィルター（カテゴリ + タイトルのみ検索）
  const filtered = useMemo(() => {
    const currentCategory = searchParams.get('category') || 'all';
    const q = normalize(searchParams.get('q') || '');

    let result = articles;

    // カテゴリーのみで検索
    if (currentCategory !== 'all') {
      result = result.filter((a) => a.category === currentCategory);
    }

    // タイトルのみで検索
    if (q) {
      result = result.filter((a) => normalize(a.title).includes(q));
    }

    return result;
  }, [articles, searchParams]);

  useEffect(() => {
    setFilteredArticles(filtered);
  }, [filtered]);

  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-6">
        <main >
          <h1 className="text-3xl font-bold gradient-text mb-5">検索結果</h1>

          {pageItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((article) => (
                <ArticleCard
                  key={(article as any).id ?? (article as any).slug ?? article.title}
                  article={article}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg pt-10">
                条件に一致する記事が見つかりませんでした。
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchTerm('');
                  router.replace('/blog/search');
                }}
                className="mt-4 px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors"
              >
                フィルターをリセット
              </button>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog/search"
            query={{
              q: searchTerm,
              category: activeCategory,
              sort: sort, // 'new' | 'old' （'new'は自動で省略）
            }}
            className="mt-10"
          />
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
