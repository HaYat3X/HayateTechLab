'use client';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

import { Card } from "@/components/ui/card";
import Image from "next/image";
// import { notFound } from "next/navigation";
// import { Calendar, Clock, Tag, User } from "lucide-react";
import {
  Clock, Tag, Share2, Bookmark, BookmarkCheck,
  Calendar, ChevronLeft, ChevronUp
} from 'lucide-react';
// import Link from 'next/link';

// pages/api/articles/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import TableOfContents from '@/components/mokuji';

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




export default function BlogPost({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();

  const [recordMap, setRecordMap] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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

  if (loading) return <p className="text-center">読み込み中...</p>;
  if (!recordMap) return notFound();


  // const post = posts[Number(params.id)];

  // if (!post) {
  //   notFound();
  // }




  const title = searchParams.get('title');
  const date = searchParams.get('date');
  const readTime = searchParams.get('readTime');
  const excerpt = searchParams.get('excerpt');
  const coverImage = searchParams.get('coverImage');
  const selectedCategories = searchParams.getAll('category'); // ← ✅ これで複数取得

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
    <div className="max-w-4xl mx-auto">
      {/* 記事ヘッダー */}
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
          {/* カテゴリーとメタ情報 */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* <span className={`px-3 py-1 text-sm font-medium rounded-full ${category === 'programming' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
              category === 'design' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                category === 'technology' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                  'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
              }`}>
              {category === 'programming' ? 'プログラミング' :
                category === 'design' ? 'デザイン' :
                  category === 'technology' ? 'テクノロジー' : 'キャリア'}
            </span> */}
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar size={14} className="mr-1" />
              {formatDate(date ?? new Date().toISOString())}
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Clock size={14} className="mr-1" />
              {readTime} 分で読める
            </div>
          </div>

          {/* タイトル */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title ?? "記事のタイトル"}
          </h1>

          {/* リード文 */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {excerpt ?? "記事のリード文"}
          </p>
          
          {/* シェアボタン */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedCategories.map((category) => (
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


          {/* 目次 */}
          <TableOfContents recordMap={recordMap} />

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