'use client';

// =============================================================================
// モジュール
// =============================================================================
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

// =============================================================================
// 自作モジュール
// =============================================================================
import { formatDate } from '@/utils/feature/article/formatDate';
import type { ArticleCardProps } from '@/types/feature/article/props/ArticleCardProps';

const ArticleCard = ({ article }: ArticleCardProps) => {
  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <Link
      href={{
        pathname: `/articles/${article.id}`,
        query: {
          title: article.title,
          date: article.date,
          category: article.category,
          tag: article.tag,
          readTime: article.readTime,
          excerpt: article.excerpt,
          coverImage: article.coverImage,
        },
      }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow group"
    >
      <div>
        <div className="relative aspect-video rounded-t-xl overflow-hidden">
          {article.coverImage && (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700"
            />
          )}
          <div className="text-white absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-sm backdrop-blur-sm">
            {Array.isArray(article.category) ? article.category[0] : article.category}
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-semibold line-clamp-1">
            {article.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 mb-4 line-clamp-1">
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
  );
};

export default ArticleCard;
