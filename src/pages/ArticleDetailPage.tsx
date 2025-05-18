import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, Tag, Share2, Bookmark, BookmarkCheck, 
  Calendar, ChevronLeft, ChevronUp 
} from 'lucide-react';
import { mockArticles } from '../data/mockData';
import NotFoundPage from './NotFoundPage';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = mockArticles.find(a => a.id === id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // 記事が見つからない場合は404ページを表示
  if (!article) {
    return <NotFoundPage />;
  }

  // 目次アイテムを生成
  const tocItems: TableOfContentsItem[] = [
    { id: 'introduction', title: '導入', level: 2 },
    { id: 'what-is', title: `${article.title}とは？`, level: 2 },
    { id: 'benefits', title: 'メリット', level: 2 },
    { id: 'how-to-implement', title: '実装方法', level: 2 },
    { id: 'basic-example', title: '基本的な例', level: 3 },
    { id: 'advanced-usage', title: '高度な使い方', level: 3 },
    { id: 'common-pitfalls', title: 'よくある落とし穴', level: 2 },
    { id: 'conclusion', title: 'まとめ', level: 2 },
  ];

  // スクロール監視
  useEffect(() => {
    const handleScroll = () => {
      // スクロールトップボタンの表示/非表示
      setShowScrollTop(window.scrollY > 300);
      
      // アクティブセクションの更新
      const headings = document.querySelectorAll('h2, h3');
      let currentActiveSection = '';
      
      headings.forEach((heading) => {
        const sectionTop = heading.getBoundingClientRect().top;
        if (sectionTop < 100) {
          currentActiveSection = heading.id;
        }
      });
      
      setActiveSection(currentActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // ページトップへスクロール
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // セクションへスクロール
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 記事ヘッダー */}
      <Link 
        to="/articles" 
        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-4"
      >
        <ChevronLeft size={16} className="mr-1" /> 記事一覧に戻る
      </Link>
      
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-64 sm:h-80 object-cover"
        />
        
        <div className="p-6 sm:p-8">
          {/* カテゴリーとメタ情報 */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              article.category === 'programming' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
              article.category === 'design' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
              article.category === 'technology' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
              'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
            }`}>
              {article.category === 'programming' ? 'プログラミング' :
               article.category === 'design' ? 'デザイン' :
               article.category === 'technology' ? 'テクノロジー' : 'キャリア'}
            </span>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar size={14} className="mr-1" />
              {formatDate(article.date)}
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Clock size={14} className="mr-1" />
              {article.readTime} 分で読める
            </div>
          </div>
          
          {/* タイトル */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>
          
          {/* リード文 */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {article.excerpt}
          </p>
          
          {/* アクションボタン */}
          <div className="flex gap-3 mb-8">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isBookmarked 
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {isBookmarked ? (
                <><BookmarkCheck size={16} className="mr-1" /> 保存済み</>
              ) : (
                <><Bookmark size={16} className="mr-1" /> 保存する</>
              )}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Share2 size={16} className="mr-1" /> 共有する
              </button>
              
              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                  <ul className="py-1">
                    <li>
                      <button 
                        onClick={() => {
                          // URLをクリップボードにコピー
                          navigator.clipboard.writeText(window.location.href);
                          setShowShareOptions(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        リンクをコピー
                      </button>
                    </li>
                    <li>
                      <a 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowShareOptions(false)}
                      >
                        Twitterで共有
                      </a>
                    </li>
                    <li>
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowShareOptions(false)}
                      >
                        Facebookで共有
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* 目次 */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">目次</h2>
            <ul className="space-y-1">
              {tocItems.map((item) => (
                <li key={item.id} style={{ marginLeft: `${(item.level - 2) * 16}px` }}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm hover:text-indigo-600 dark:hover:text-indigo-400 ${
                      activeSection === item.id 
                        ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 記事本文 */}
          <div className="prose dark:prose-invert prose-indigo max-w-none">
            <h2 id="introduction" className="scroll-mt-20">導入</h2>
            <p>
              {article.title}は、現代のWeb開発において非常に重要なトピックです。本記事では、その基本から応用まで詳しく解説します。
            </p>
            
            <h2 id="what-is" className="scroll-mt-20">{article.title}とは？</h2>
            <p>
              {article.title}は、{article.category === 'programming' ? 'プログラミング' : 
              article.category === 'design' ? 'デザイン' : 
              article.category === 'technology' ? 'テクノロジー' : 'キャリア'}の分野において革新的なアプローチを提供しています。
              従来の方法と比較して、効率的かつ柔軟な解決策として注目されています。
            </p>
            <p>
              基本的な概念は単純ですが、その応用範囲は非常に広く、様々なシナリオで活用できます。
            </p>
            
            <h2 id="benefits" className="scroll-mt-20">メリット</h2>
            <p>
              {article.title}を導入することで、以下のようなメリットが得られます：
            </p>
            <ul>
              <li>開発効率の大幅な向上</li>
              <li>コードの保守性と再利用性の向上</li>
              <li>パフォーマンスの最適化</li>
              <li>より良いユーザー体験の提供</li>
            </ul>
            
            <h2 id="how-to-implement" className="scroll-mt-20">実装方法</h2>
            <p>
              {article.title}の実装には、いくつかのアプローチがあります。以下では基本的な実装方法から、より高度な使い方まで説明します。
            </p>
            
            <h3 id="basic-example" className="scroll-mt-20">基本的な例</h3>
            <p>
              最も基本的な実装例を以下に示します：
            </p>
            <pre><code>{`// ${article.title}の基本実装
function example() {
  const data = fetchData();
  return processData(data);
}

function processData(input) {
  // データ処理ロジック
  return transformedData;
}`}</code></pre>
            
            <h3 id="advanced-usage" className="scroll-mt-20">高度な使い方</h3>
            <p>
              より高度なシナリオでは、以下のような実装が考えられます：
            </p>
            <pre><code>{`// ${article.title}の高度な実装
class AdvancedImplementation {
  constructor(config) {
    this.config = config;
    this.init();
  }
  
  init() {
    // 初期化ロジック
  }
  
  execute() {
    // 実行ロジック
    return this.optimize(this.process());
  }
  
  process() {
    // 処理ロジック
  }
  
  optimize(result) {
    // 最適化ロジック
    return optimizedResult;
  }
}`}</code></pre>
            
            <h2 id="common-pitfalls" className="scroll-mt-20">よくある落とし穴</h2>
            <p>
              {article.title}を実装する際によくある問題と、その解決策を紹介します：
            </p>
            <ol>
              <li>
                <strong>パフォーマンスの問題</strong> - 大量のデータを処理する際にパフォーマンス低下が起きる場合があります。メモ化や遅延評価などのテクニックを活用しましょう。
              </li>
              <li>
                <strong>複雑性の増加</strong> - 過剰な抽象化によってコードの複雑性が増すことがあります。適切な抽象化レベルを維持することが重要です。
              </li>
              <li>
                <strong>互換性の問題</strong> - 古いブラウザやシステムとの互換性に注意が必要です。必要に応じてポリフィルやフォールバックを用意しましょう。
              </li>
            </ol>
            
            <h2 id="conclusion" className="scroll-mt-20">まとめ</h2>
            <p>
              本記事では、{article.title}について基本から応用まで解説しました。
              この技術を活用することで、より効率的で保守性の高い開発が可能になります。
              実際のプロジェクトに取り入れて、そのメリットを体験してみてください。
            </p>
            <p>
              ご質問やご意見がありましたら、下記のコメント欄またはチャットボットでお問い合わせください。
            </p>
          </div>
          
          {/* タグ */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-gray-500 dark:text-gray-400" />
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                  {article.category === 'programming' ? 'JavaScript' : 
                   article.category === 'design' ? 'UI' : 
                   article.category === 'technology' ? 'AI' : 'スキルアップ'}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                  {article.category === 'programming' ? 'フレームワーク' : 
                   article.category === 'design' ? 'UX' : 
                   article.category === 'technology' ? '機械学習' : 'キャリア'}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                  {article.category === 'programming' ? 'React' : 
                   article.category === 'design' ? 'デザインシステム' : 
                   article.category === 'technology' ? 'ツール' : 'インタビュー'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      {/* 関連記事 */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">関連記事</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {mockArticles
            .filter(a => a.id !== id && a.category === article.category)
            .slice(0, 2)
            .map(relatedArticle => (
              <Link
                key={relatedArticle.id}
                to={`/articles/${relatedArticle.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col sm:flex-row"
              >
                <img
                  src={relatedArticle.coverImage}
                  alt={relatedArticle.title}
                  className="w-full sm:w-1/3 h-48 sm:h-auto object-cover"
                />
                <div className="p-4 sm:p-5 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {relatedArticle.readTime} 分で読める
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
      
      {/* スクロールトップボタン */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-5 bottom-20 z-10 p-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-colors"
          aria-label="ページ上部へ"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ArticleDetailPage;