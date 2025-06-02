// =============================================================================
// モジュール
// =============================================================================
import author from '../../../public/img/Hayate.jpg';
import Image from 'next/image';

export default function AboutMeSection() {
  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-12 animate-slide-in animate-delay-200">
        私について
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg opacity-0 animate-slide-in animate-delay-200">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-4/12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl transform rotate-6" />

              <Image
                src={author}
                alt="著者の写真"
                className="relative w-full aspect-square object-cover rounded-xl"
                placeholder="blur"
              />
            </div>
          </div>

          <div className="md:w-8/12">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Hayate Takeda
              </h3>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                鳥取県出身のエンジニア。<br />
                専門学校でIT技術を学んだ後、20歳でIT業界へ。<br />
                現在はデスクトップアプリやWebアプリの開発を中心に、フロントエンド・バックエンドの開発業務を担当しています。<br />
              </p>
              
              <div className="flex flex-wrap gap-3">
                {['フロントエンド開発', 'バックエンド開発', 'UI/UXデザイン'].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}