// =============================================================================
// インポート（ライブラリ）
// =============================================================================
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// =============================================================================
// インポート（自作ライブラリ）
// =============================================================================
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const CTASection: React.FC = () => {
  // =============================================================================
  // state
  // =============================================================================
  /**
   * 各セクション要素への参照
   */
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // アニメーションを適用するためのカスタムフック
  useScrollAnimation(sectionsRef.current);

  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <section
      className="relative overflow-hidden"
      ref={el => sectionsRef.current[3] = el}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform -skew-y-6" />
      <div className="relative py-16 px-8 text-center opacity-0 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-6">最新の記事をチェックしよう</h2>
        <p className="mb-8 text-white/90 max-w-2xl mx-auto">
          プログラミング、ビジネスに関する実践的な記事が揃っています。<br />
          一緒に技術を探求しましょう！
        </p>
        <Link
          to="/articles"
          className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-float"
        >
          記事一覧を見る <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;