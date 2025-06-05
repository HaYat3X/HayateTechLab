// =============================================================================
// 自作モジュール
// =============================================================================
import type { ArticleCategory } from "../interface/ArticleCategory";

/**
 * ArticleFilterコンポーネントのPropsの型定義
 * @property categories - カテゴリのリスト
 * @property value - 現在選択されているカテゴリのID
 * @property onChange - カテゴリが変更されたときに呼び出されるコールバック関数
 */
export interface ArticleFilterProps {
  categories: ArticleCategory[];
  value: string;
  onChange: (value: string) => void;
}
