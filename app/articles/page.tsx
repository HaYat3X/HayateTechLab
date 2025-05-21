// pages/articles/index.tsx
"use client"

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // ← こちらが正解

import Link from 'next/link';
import { Search, Clock, Tag, Calendar } from 'lucide-react';
// import { mockArticles } from '@/data/mockData';


export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: 'programming' | 'design' | 'technology' | 'career';
  coverImage: string;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Reactの最新機能を使いこなす',
    excerpt: 'React 18の新機能と、それらをプロジェクトで活用するためのベストプラクティスについて解説します。',
    date: '2025-04-15',
    readTime: 8,
    category: 'programming',
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'モダンUIデザインの原則',
    excerpt: '美しく機能的なUIを設計するための原則と、ユーザーエクスペリエンスを向上させるテクニックを紹介します。',
    date: '2025-04-10',
    readTime: 6,
    category: 'design',
    coverImage: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'AIを活用した開発効率化',
    excerpt: '人工知能を活用して開発プロセスを効率化し、生産性を高める方法について詳しく解説します。',
    date: '2025-04-05',
    readTime: 7,
    category: 'technology',
    coverImage: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    title: 'テック業界でのキャリア構築',
    excerpt: '急速に変化するテクノロジー業界で長期的なキャリアを構築するための戦略とアドバイスを提供します。',
    date: '2025-04-01',
    readTime: 5,
    category: 'career',
    coverImage: 'https://images.pexels.com/photos/3184316/pexels-photo-3184316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    title: 'TypeScriptの高度な型システム',
    excerpt: 'TypeScriptの高度な型システムを理解し、型安全なコードを書くためのテクニックを詳しく解説します。',
    date: '2025-03-28',
    readTime: 9,
    category: 'programming',
    coverImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    title: 'アクセシブルなWebデザイン',
    excerpt: '誰もが利用できるWebサイトを設計するための原則とテクニックについて詳しく解説します。',
    date: '2025-03-22',
    readTime: 7,
    category: 'design',
    coverImage: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '7',
    title: 'エッジコンピューティングの実用例',
    excerpt: 'エッジコンピューティングの実際の応用例と、それがもたらす利点について詳しく解説します。',
    date: '2025-03-18',
    readTime: 6,
    category: 'technology',
    coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '8',
    title: 'リモートワークでの生産性向上',
    excerpt: 'リモートワーク環境での生産性を最大化するための実践的なテクニックとツールを紹介します。',
    date: '2025-03-12',
    readTime: 5,
    category: 'career',
    coverImage: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '9',
    title: 'マイクロフロントエンドアーキテクチャ',
    excerpt: '大規模Webアプリケーションのためのマイクロフロントエンドアーキテクチャの実装方法を解説します。',
    date: '2025-03-08',
    readTime: 10,
    category: 'programming',
    coverImage: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];

const ArticlesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ URLのクエリ取得

  const initialCategory = searchParams.get('category') || 'all'; // ✅ 修正ポイント

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);

  useEffect(() => {
    const categoryParam = searchParams.get('category') || 'all';
    setActiveCategory(categoryParam);
  }, [searchParams]);

  useEffect(() => {
    let result = mockArticles;

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
  }, [activeCategory, searchTerm]);

  const formatDate = (dateString: string) => {
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

      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="relative aspect-video">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ borderRadius: '8px 8px 0 0', height: '200px', width: '100%' }} // 角丸を適用
                  />
                  <div className="text-white absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-sm backdrop-blur-sm">
                    {article.category}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold line-clamp-1" style={{ marginTop: '-20px' }}>{article.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(article.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {article.readTime} 分で読める
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

