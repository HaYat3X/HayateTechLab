// =============================================================================
// モジュール
// =============================================================================
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NavigationSection() {
  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform -skew-y-6" />
      <div className="relative py-16 px-8 text-center opacity-0 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-6">最新の記事をチェックしよう</h2>

        <p className="mb-8 text-white/90 max-w-2xl mx-auto">
          フロントエンドやバックエンド、AI、ビジネスなど、幅広い分野で実践的な情報を発信しています。<br />
          一緒に技術を探求しましょう！
        </p>

        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-float"
        >
          記事を読む <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}