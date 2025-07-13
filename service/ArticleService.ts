// =============================================================================
// 自作モジュール
// =============================================================================
import { formatNotionArticles } from "@/utils/feature/article/formatNotionArticles";

/**
 * fetchArticlesFromNotion
 * Notion APIから「公開」状態のページを取得し、整形された記事データとして返す
 */
export async function fetchArticlesFromNotion() {
  const NOTION_API_KEY = process.env.NOTION_API_KEY || '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';
  const DATABASE_ID = process.env.NOTION_DATABASE_ID || '1d4fab19d29580a2bc13d8f559d5fa7a';

  // 認証情報チェック
  if (!NOTION_API_KEY || !DATABASE_ID) {
    throw new Error('Missing Notion credentials');
  }

  // NotionAPIから「公開」記事を取得
  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      filter: {
        property: '公開',
        select: { equals: '公開' },
      },
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    console.error('Notion API fetch error:', response.statusText);
    throw new Error(await response.text());
  }

  const data = await response.json();

  // データ整形して返す
  return formatNotionArticles(data.results);
}
