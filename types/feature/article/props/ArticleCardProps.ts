// =============================================================================
// 自作モジュール
// =============================================================================
import type { Article } from '@/types/feature/article/interface/ArticleType';

/**
 * ArticleCardコンポーネントのProps定義
 * @property {Article} article - 記事データ
 */
export interface ArticleCardProps {
  article: Article;
};