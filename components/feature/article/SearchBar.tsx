'use client';

// =============================================================================
// モジュール
// =============================================================================
import { Search } from 'lucide-react';

// =============================================================================
// 自作モジュール
// =============================================================================
import type { SearchBarProps } from '@/types/feature/article/props/SearchBarProps';

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <div className="relative flex-grow">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="記事を検索..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-sm dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
};

export default SearchBar;
