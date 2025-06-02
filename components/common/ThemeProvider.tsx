'use client';

// =============================================================================
// モジュール
// =============================================================================
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

/**
 * アプリ全体にテーマ（ライト/ダークモードなど）を提供するプロバイダコンポーネント
 *
 * @param children - テーマ設定の対象となる子コンポーネント
 * @param props - `next-themes` に渡すオプション（defaultTheme, enableSystem など）
 *
 * 使用例（layout.tsx や _app.tsx 内でラップ）：
 * ```tsx
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   <YourApp />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // =============================================================================
  // テンプレート
  // =============================================================================
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
