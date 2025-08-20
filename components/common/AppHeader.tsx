'use client';

// =============================================================================
// モジュール
// =============================================================================
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// =============================================================================
// 自作モジュール
// =============================================================================
import { Button } from '@/components/ui/button';

export function AppHeader() {
  // =============================================================================
  // セットアップ
  // =============================================================================
  // Next.jsのテーマ管理フックを使用
  const { theme, setTheme } = useTheme();

  // コンポーネントがマウントされたかどうかを判定するステート
  const [mounted, setMounted] = useState(false);

  // 初回レンダリング後（クライアントマウント時）に mounted を true に設定
  // これにより、テーマなどクライアント側でしか扱えない状態を安全にレンダリングできるようにする
  useEffect(() => setMounted(true), []);
  
  // =============================================================================
  // テンプレート
  // =============================================================================
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">HayateTechLab</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/c"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              記事一覧
            </Link>

            <Link
              href="/about-me"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              私について
            </Link>
            
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 transition-all text-white" />
                ) : (
                  <Moon className="h-5 w-5 transition-all text-gray-950" />
                )}
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header >
  );
};
