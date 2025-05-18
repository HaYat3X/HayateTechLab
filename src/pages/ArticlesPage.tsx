import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Filter, Clock, Tag } from 'lucide-react';
import { mockArticles } from '../data/mockData';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: 'all', name: '全て' },
  { id: 'programming', name: 'プログラミング' },
  { id: 'design', name: 'デザイン' },
  { id: 'technology', name: 'テクノロジー' },
  { id: 'career', name: 'キャリア' },
];

const ArticlesPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';
  
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);

  // URLクエリパラメータが変更されたときにカテゴリーを更新
  useEffect(() => {
    const category = queryParams.get('category') || 'all';
    setActiveCategory(category);
  }, [location, queryParams]);

  // 検索とフィルタリングを適用
  useEffect(() => {
    let result = mockArticles;
    
    // カテゴリーでフィルタリング
    if (activeCategory !== 'all') {
      result = result.filter(article => article.category === activeCategory);
    }
    
    // 検索語でフィルタリング
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(
        article => 
          article.title.toLowerCase().includes(lowercasedTerm) || 
          article.excerpt.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    setFilteredArticles(result);
  }, [activeCategory, searchTerm]);

  // 日付をフォーマットする関数
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">記事一覧</h1>
      
      {/* 検索バーとフィルター */}
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="relative sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* カテゴリータブ（大画面用） */}
      <div className="hidden sm:flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* 記事リスト */}
      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link 
              key={article.id} 
              to={`/articles/${article.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    article.category === 'programming' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                    article.category === 'design' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                    article.category === 'technology' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {article.category === 'programming' ? 'プログラミング' :
                     article.category === 'design' ? 'デザイン' :
                     article.category === 'technology' ? 'テクノロジー' : 'キャリア'}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {formatDate(article.date)}
                  </div>
                  <div className="flex items-center">
                    <Tag size={14} className="mr-1" />
                    {article.readTime} 分で読める
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
              setActiveCategory('all');
              setSearchTerm('');
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            フィルターをリセット
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;