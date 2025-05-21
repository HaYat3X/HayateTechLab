'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Clock, Tag, Calendar } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  readTime?: string;
  category?: string;
  coverImage?: string;
}

const ArticlesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');

  // Notion API から記事取得
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles', { cache: 'no-store' });
        const data = await res.json();
        console.log('✅ 記事取得成功:', data);

        setArticles(data.articles || []);

      } catch (err) {
        console.error('❌ 記事取得エラー:', err);
      }
    };
    fetchArticles();
  }, []);

  // クエリが変わったらカテゴリ変更
  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  // フィルターと検索
  useEffect(() => {
    let result = articles;

    if (activeCategory !== 'all') {
      result = result.filter(article => article.category === activeCategory);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        article =>
          article.title.toLowerCase().includes(lower) ||
          article.excerpt.toLowerCase().includes(lower)
      );
    }

    setFilteredArticles(result);
  }, [articles, activeCategory, searchTerm]);

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

      {/* 検索バー */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="記事を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* 記事一覧 */}
      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
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
