'use client';

// =============================================================================
// モジュール
// =============================================================================
import { Filter } from 'lucide-react';

// =============================================================================
// 自作モジュール
// =============================================================================
import type { ArticleFilterProps } from '@/types/feature/article/props/CategorySelectProps';

const ArticleFilter: React.FC<ArticleFilterProps> = ({ categories, value, onChange }) => {
  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <div className="relative sm:max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Filter size={18} className="text-gray-400" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
      >
        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ArticleFilter;
