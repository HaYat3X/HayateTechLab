/**
 * 記事のインターフェース定義
 * @property id - 記事の一意な識別子
 * @property title - 記事のタイトル
 * @property excerpt - 記事の抜粋
 * @property date - 記事の公開日（ISO形式）
 * @property readTime - 記事を読むのにかかる時間
 * @property category - 記事のカテゴリー
 * @property coverImage - 記事のカバー画像URL
 */
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  readTime?: string;
  category?: string;
  coverImage?: string;
}
