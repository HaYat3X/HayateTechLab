'use client';

// =============================================================================
// モジュール
// =============================================================================
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'
import Image from 'next/image';
import author from '../../../public/img/Hayate.jpg';
import { Clock, Tag, Calendar, ChevronLeft, Eye } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Link2, Github, Twitter, BookOpen } from 'lucide-react';
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
  const { resolvedTheme } = useTheme();

  // =============================================================================
  // state
  // =============================================================================
  const [recordMap, setRecordMap] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState<number>(0);

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

  // 表示数をインクリメント
  useEffect(() => {
    const incrementView = async () => {
      try {
        const res = await fetch(`/api/articles/${params.id}/view`, {
          method: 'POST',
        });
        const data = await res.json();
        setViewCount(data.viewCount);
      } catch (error) {
        console.error('表示数インクリメントエラー:', error);
      }
    };

    incrementView();
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
    <div className="space-y-8">
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-6">
        <main >
          <Link
            href="/"
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

                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Eye size={14} className="mr-1" />
                  {viewCount} 回表示
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
                  darkMode={resolvedTheme === 'dark'}
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
        </main>

        <aside>
          <div className="sticky top-24 space-y-4 rounded-2xl p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow group">
            {/* ===== ABOUT ME ===== */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300/60 to-transparent dark:via-gray-700/60" />
                <span className="text-xs tracking-[.35em] text-black dark:text-white">- ABOUT ME -</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300/60 to-transparent dark:via-gray-700/60" />
              </div>

              {/* Avatar + Name */}
              {/* Avatar + Name（縦並び／中央寄せ） */}
              <div className="flex flex-col items-center gap-4 pt-3 text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
                  {/* 画像はラッパーを丸くして中を fill + object-cover で綺麗に円形トリミング */}
                  <Image
                    src={author}
                    alt="Hoda avatar"
                    fill
                    sizes="70px"
                    className="object-cover"
                    priority
                  />
                </div>

                <h3 className="text-2xl leading-none text-gray-900 dark:text-gray-100">
                  Hayate Takeda
                </h3>
              </div>


              {/* Bio */}
              <p className="text-sm leading-7 pt-3 text-gray-700 dark:text-white">
                鳥取県出身のエンジニア。<br />
                専門学校でIT技術を学んだ後、20歳でIT業界へ。<br />
                現在はデスクトップアプリやWebアプリの開発を中心に、フロントエンド・バックエンドの開発業務を担当しています。<br />
              </p>

              {/* Links */}
              <ul className="space-y-2 pt-2 text-sm">
                <li>
                  <a href="https://github.com/HaYat3X" target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:opacity-90">
                    <Github className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="font-medium">GitHub</span>
                    <Link2 className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/HaYat3X" target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:opacity-90">
                    <Twitter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="font-medium">X</span>
                    <Link2 className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
                  </a>
                </li>
                <li>
                  <a href="https://wobbly-megaraptor-f23.notion.site/253fab19d29580578efad0a41ad447c9" target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:opacity-90">
                    <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="font-medium">読んだ本</span>
                    <Link2 className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}