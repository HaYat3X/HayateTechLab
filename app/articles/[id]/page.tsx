'use client';

// =============================================================================
// モジュール
// =============================================================================
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'
import { Clock, Tag, Calendar, ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
)

// =============================================================================
// 自作モジュール
// =============================================================================
import { formatDate } from '@/utils/feature/article/formatDate';

export default function BlogPost({ params }: { params: { id: string } }) {
  // =============================================================================
  // セットアップ
  // =============================================================================
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const date = searchParams.get('date');
  const readTime = searchParams.get('readTime');
  const excerpt = searchParams.get('excerpt');
  const coverImage = searchParams.get('coverImage');
  const selectedTags = searchParams.getAll('tag');

  // =============================================================================
  // state
  // =============================================================================
  const [recordMap, setRecordMap] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // =============================================================================
  // ライフサイクルフック
  // =============================================================================
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/articles/detail?id=${params.id}`);
        const data = await res.json();
        if (data.recordMap) {
          setRecordMap(data.recordMap);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('記事取得エラー:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  // =============================================================================  
  // レンダリング
  // =============================================================================
  // ローディング中やデータがない場合の処理
  if (loading) return <p className="text-center">読み込み中...</p>;

  // データがない場合は404ページを表示
  if (!recordMap) return notFound();

  // =============================================================================  
  // テンプレート
  // =============================================================================
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/articles"
        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-4"
      >
        <ChevronLeft size={16} className="mr-1" /> 記事一覧に戻る
      </Link>

      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <img
          src={coverImage ?? "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
          alt={title ?? "記事のカバー画像"}
          className="w-full h-64 sm:h-80 object-cover"
        />

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar size={14} className="mr-1" />
              {formatDate(date ?? new Date().toISOString())}
            </div>

            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Clock size={14} className="mr-1" />
              {readTime} 分で読める
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title ?? "記事のタイトル"}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {excerpt ?? "記事のリード文"}
          </p>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedTags.map((category) => (
                <div
                  key={category}
                  className="text-white flex items-center px-3 py-1 rounded-full text-sm bg-primary/90 text-primary-foreground backdrop-blur-sm"
                >
                  <Tag size={16} className="mr-1" />
                  {category}
                </div>
              ))}
            </div>
          )}

          <div className="prose dark:prose-invert prose-indigo max-w-none">
            <NotionRenderer
              recordMap={recordMap}
              fullPage={false}
              darkMode={false}
              components={{
                Code,
                Collection,
                Equation,
                Pdf,
                Modal,
              }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}