// =============================================================================
// モジュール
// =============================================================================
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HelloSection() {
  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <section
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] animate-fade-in" />
      <div className="text-center relative">
        <h1 className="text-6xl font-bold gradient-text animate-slide-in animate-delay-200">
          HayateTechLab<span className="text-gray-900 dark:text-white">で技術を探求する</span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto my-8 leading-relaxed animate-slide-in animate-delay-200">
          HayateTechLabは、個人エンジニアが日々の技術調査や学びをまとめるための開発ラボです。<br />
          フロントエンドやバックエンド、AI、ビジネスなど、幅広い分野で実践的な情報を発信しています。
        </p>
        
        <Link
          href="/articles"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-slide-in animate-delay-300"
        >
          記事を読む <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}