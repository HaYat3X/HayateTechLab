// =============================================================================
// インポート（ライブラリ）
// =============================================================================
import React, { createContext, useState, useEffect, useContext } from 'react';

// =============================================================================
// インポート（自作モジュール）
// =============================================================================
import { ThemeContextType } from '../types/feature/ThemeContext/ThemeContextType';
import { Theme } from '../types/feature/ThemeContext/ThemeContextType';

// =============================================================================
// セットアップ
// =============================================================================
/**
 * テーマ用のReact Context
 *
 * @type {React.Context<ThemeContextType | undefined>}
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// =============================================================================
// コンポーネント
// =============================================================================
/**
 * アプリ全体にテーマ（ライト・ダーク）を提供するプロバイダーコンポーネント
 *
 * @param {Object} props - コンポーネントのprops
 * @param {React.ReactNode} props.children - 子コンポーネント
 * @returns {JSX.Element} テーマコンテキストをラップした要素
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // =============================================================================
  // State
  // =============================================================================
  /**
   * 現在のテーマ状態を管理
   */
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // =============================================================================
  // 関数
  // =============================================================================
  /**
   * 現在のテーマをトグルする（light ⇄ dark）
   */
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // =============================================================================
  // ライフサイクルフック
  // =============================================================================
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// =============================================================================
// カスタムフック
// =============================================================================
/**
 * テーマコンテキストにアクセスするためのカスタムフック
 *
 * @returns {ThemeContextType} テーマとトグル関数
 * @throws {Error} ThemeProviderの外で呼び出された場合にエラーを投げる
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
