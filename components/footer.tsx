// export function Footer() {
//   return (
//     <footer className="border-t">
//       <div className="container flex h-16 items-center justify-between">
//         <p className="text-sm text-muted-foreground">
//           © 2024 Modern Blog. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }



import React from 'react';
// import { Link } from 'react-router-dom';
import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';


export function Footer() {
  const currentYear = new Date().getFullYear();

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
              プログラミング、ビジネスに関する情報を発信するブログです。新しい技術や知見を共有します。
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              リンク
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 text-sm">
              <li className="mb-2">
                <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  ホーム
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/articles" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  記事一覧
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
            <a
              href="https://github.com/HaYat3X"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Github"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com/HaYat3X"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

