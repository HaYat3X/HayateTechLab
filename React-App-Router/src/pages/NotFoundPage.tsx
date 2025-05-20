import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">ページが見つかりません</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        お探しのページは存在しないか、移動または削除された可能性があります。
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
      >
        <Home size={20} className="mr-2" /> ホームに戻る
      </Link>
    </div>
  );
};

export default NotFoundPage;