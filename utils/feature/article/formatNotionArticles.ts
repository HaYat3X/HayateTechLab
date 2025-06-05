// =============================================================================
// 自作モジュール
// =============================================================================
import { Article } from "@/types/feature/article/interface/ArticleType";

/**
 * Notion APIのレスポンスを整形して、記事データの配列を返す
 * @param results Notion APIからのレスポンスデータ
 * @returns 整形された記事データの配列
 */
export const formatNotionArticles = (results: any[]): Article[] =>
  results.map((page) => {
    const properties = page.properties;

    const rawDate = properties['最終更新日']?.last_edited_time || page.last_edited_time;
    const formattedDate = new Date(rawDate).toISOString().split('T')[0];

    const cover = page.cover;
    const coverImage =
      cover?.type === 'external'
        ? cover.external.url
        : cover?.type === 'file'
          ? cover.file.url
          : 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

    return {
      id: page.id,
      title: properties['タイトル']?.title?.[0]?.plain_text || '無題',
      excerpt: properties['記事の説明']?.rich_text?.[0]?.plain_text || '無題',
      date: formattedDate,
      readTime: properties['読むのにかかる時間']?.rich_text?.[0]?.plain_text || '',
      category: properties['タグ']?.multi_select?.map((tag: any) => tag.name) || [],
      coverImage,
    };
  });
