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
// import { Calendar, Clock, Tag, User, ChevronLeft } from "lucide-react";
// import Link from 'next/link';

// pages/api/articles/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import { ChevronLeft } from 'lucide-react';

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

  const [recordMap, setRecordMap] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-4xl mx-auto">
      {/* 記事ヘッダー */}
      <Link
        href="/articles"
        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-4"
      >
        <ChevronLeft size={16} className="mr-1" /> 記事一覧に戻る
      </Link>

      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={true}
        components={{
          Code,
          Collection,
          Equation,
          Pdf,
          Modal,
        }}
      />

    </div>
  );
}