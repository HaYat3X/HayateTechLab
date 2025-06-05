// =============================================================================
// 自作モジュール
// =============================================================================
import { formatNotionArticles } from "@/utils/feature/article/formatNotionArticles";

/**
 * fetchArticlesFromNotion
 * Notion APIから「公開」状態のページを取得し、整形された記事データとして返す
 */
export async function fetchArticlesFromNotion() {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;

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
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();

  // データ整形して返す
  return formatNotionArticles(data.results);
}
