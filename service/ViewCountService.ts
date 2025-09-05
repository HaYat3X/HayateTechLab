// =============================================================================
// モジュール
// =============================================================================
import { promises as fs } from 'fs';
import path from 'path';

// =============================================================================
// 型定義
// =============================================================================
interface ViewCountData {
  [articleId: string]: number;
}

// =============================================================================
// 定数
// =============================================================================
const VIEW_COUNT_FILE = path.join(process.cwd(), 'data', 'view-counts.json');

// =============================================================================
// ユーティリティ関数
// =============================================================================
/**
 * 表示数データファイルを読み込む
 */
async function loadViewCounts(): Promise<ViewCountData> {
  try {
    const data = await fs.readFile(VIEW_COUNT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // ファイルが存在しない場合は空のオブジェクトを返す
    return {};
  }
}

/**
 * 表示数データファイルに保存する
 */
async function saveViewCounts(data: ViewCountData): Promise<void> {
  // dataディレクトリが存在しない場合は作成
  const dataDir = path.dirname(VIEW_COUNT_FILE);
  await fs.mkdir(dataDir, { recursive: true });
  
  await fs.writeFile(VIEW_COUNT_FILE, JSON.stringify(data, null, 2));
}

// =============================================================================
// 公開関数
// =============================================================================
/**
 * 記事の表示数を取得する
 * @param articleId - 記事のID
 * @returns 表示数
 */
export async function getViewCount(articleId: string): Promise<number> {
  const viewCounts = await loadViewCounts();
  return viewCounts[articleId] || 0;
}

/**
 * 記事の表示数をインクリメントする
 * @param articleId - 記事のID
 * @returns 更新後の表示数
 */
export async function incrementViewCount(articleId: string): Promise<number> {
  const viewCounts = await loadViewCounts();
  const currentCount = viewCounts[articleId] || 0;
  viewCounts[articleId] = currentCount + 1;
  
  await saveViewCounts(viewCounts);
  return viewCounts[articleId];
}

/**
 * 全ての記事の表示数を取得する
 * @returns 記事IDと表示数のマップ
 */
export async function getAllViewCounts(): Promise<ViewCountData> {
  return await loadViewCounts();
}

/**
 * 表示数でソートされた記事IDの配列を取得する
 * @param limit - 取得する記事数（デフォルト: 10）
 * @returns 表示数順の記事ID配列
 */
export async function getTopViewedArticles(limit: number = 10): Promise<string[]> {
  const viewCounts = await loadViewCounts();
  
  return Object.entries(viewCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([articleId]) => articleId);
}
