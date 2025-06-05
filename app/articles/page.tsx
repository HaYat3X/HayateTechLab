'use client';


// =============================================================================
// モジュール
// =============================================================================
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Clock, Tag, Calendar, Filter } from 'lucide-react';
import { GetStaticProps } from 'next';


// =============================================================================
// 自作モジュール
// =============================================================================
import SearchBar from '@/components/feature/article/SearchBar';
import ArticleFilter from '@/components/feature/article/ArticleFilter';
import type { ArticleCategory } from '@/types/feature/article/interface/ArticleCategory';
import type { Article } from '@/types/feature/article/interface/ArticleType';

const ArticlesPage = () => {
  // =============================================================================
  // セットアップ
  // =============================================================================
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories: ArticleCategory[] = [
    { id: 'all', name: '全て' },
    { id: 'programming', name: 'プログラミング' },
    { id: 'design', name: 'デザイン' },
    { id: 'technology', name: 'テクノロジー' },
    { id: 'career', name: 'キャリア' },

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



  // 共通かつ日付フォーマット関数
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

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

      {/* 記事一覧 */}
      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <Link
              key={article.id}
              href={{
                pathname: `/articles/${article.id}`,
                query: {
                  title: article.title,
                  date: article.date,
                  category: article.category,
                  tag: article.tag,
                  readTime: article.readTime,
                  excerpt: article.excerpt,
                  coverImage: article.coverImage
                }
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow group"
            >
              <div>
                <div className="relative aspect-video">
                  {article.coverImage && (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="object-cover transition-transform duration-700"
                      style={{
                        borderRadius: '8px 8px 0 0',
                        height: '200px',
                        width: '100%'
                      }}
                    />
                  )}
                  <div className="text-white absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-sm backdrop-blur-sm">
                    {Array.isArray(article.category) ? article.category[0] : article.category}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold line-clamp-1 mt-[-20px]">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(article.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {article.readTime || '-'} 分で読める
                    </div>
                  </div>
                </div>
              </div>
            </Link>
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
