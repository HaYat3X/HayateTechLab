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

const HelloSection: React.FC = () => {
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
      className="relative py-20 overflow-hidden"
      ref={(el) => (sectionsRef.current[0] = el)}
    >
      <div className="absolute inset-0 bg-gradient-to-br -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] animate-fade-in" />
      <div className="text-center relative">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 animate-slide-in">
          HayateTechLab<span className="text-gray-900 dark:text-white">で技術を探求する</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-in animate-delay-200">
          HayateTechLab は、個人エンジニアによる技術検証と知見の記録を目的とした開発ラボです。<br />
          主にフロントエンド、バックエンド、AI、ビジネスなどの分野を中心に、実践ベースの情報を発信しています。
        </p>
        <Link
          to="/articles"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-slide-in animate-delay-300"
        >
          記事を読む <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default HelloSection;
