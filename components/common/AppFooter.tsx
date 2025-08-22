// =============================================================================
// モジュール
// =============================================================================
import { Github, Twitter, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function AppFooter() {
  // =============================================================================
  // セットアップ
  // =============================================================================
  // 現在の年を取得
  const currentYear = new Date().getFullYear();

  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap text-indigo-600 dark:text-indigo-400">
                HayateTechLab
              </span>
            </Link>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md">
              HayateTechLabは、個人エンジニアが日々の技術調査や学びをまとめるための開発ラボです。
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              ページリンク
            </h2>

            <ul className="text-gray-600 dark:text-gray-400 text-sm">
              <li className="mb-2">
                <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  記事一覧
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/about-me" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  私について
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} HayateTechLab. All Rights Reserved.
          </span>

          <div className="flex mt-4 space-x-4 sm:mt-0">
            <Link
              href="https://github.com/HaYat3X" target="_blank"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Github"
            >
              <Github size={20} />
            </Link>

            <Link
              href="https://twitter.com/HaYat3X" target="_blank"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="X"
            >
              <Twitter size={20} />
            </Link>

            <Link
              href="https://wobbly-megaraptor-f23.notion.site/253fab19d29580578efad0a41ad447c9" target="_blank"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Notion"
            >
              <BookOpen size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

