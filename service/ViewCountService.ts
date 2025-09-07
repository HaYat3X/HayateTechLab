// =============================================================================
// 定数（環境変数）
// =============================================================================
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = '2022-06-28';

// =============================================================================
// 内部関数（Notion API）
// =============================================================================
async function getNotionPage(pageId: string) {
  if (!NOTION_API_KEY) throw new Error('Missing Notion API key');
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch Notion page: ${await res.text()}`);
  return res.json();
}

async function updateNotionPageViewCount(pageId: string, newCount: number) {
  if (!NOTION_API_KEY) throw new Error('Missing Notion API key');
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        '閲覧数': { number: newCount }
      }
    })
  });
  if (!res.ok) throw new Error(`Failed to update Notion page: ${await res.text()}`);
}

// =============================================================================
// 公開関数（Notion連携版）
// =============================================================================
export async function getViewCount(articleId: string): Promise<number> {
  const page = await getNotionPage(articleId);
  const count = page?.properties?.['閲覧数']?.number;
  return typeof count === 'number' ? count : 0;
}

export async function incrementViewCount(articleId: string): Promise<number> {
  const current = await getViewCount(articleId);
  const next = (typeof current === 'number' ? current : 0) + 1;
  await updateNotionPageViewCount(articleId, next);
  return next;
}

export async function getAllViewCounts(): Promise<Record<string, number>> {
  // Notion側で一括取得はクエリが必要だが、現状では未使用のため空実装
  return {};
}

export async function getTopViewedArticles(limit: number = 10): Promise<string[]> {
  // Not used with Notion-backed flow; kept for compatibility
  return [];
}
