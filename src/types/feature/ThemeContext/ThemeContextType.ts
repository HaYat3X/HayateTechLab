/**
 * 利用可能なテーマモードの型定義
 *
 * - 'light'：ライトモード
 * - 'dark'：ダークモード
 */
export type Theme = 'light' | 'dark';

/**
 * ThemeContext のコンテキスト値の型
 *
 * @property {Theme} theme - 現在のテーマ（light または dark）
 * @property {() => void} toggleTheme - テーマを切り替える関数
 */
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

