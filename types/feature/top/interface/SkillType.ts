/**
 * 各スキル項目を表すインターフェース
 * @property name スキルの名称（例: "React"）
 * @property icon スキルを表すアイコン画像のURL
 */
interface SkillItem {
    name: string;
    icon: string;
}

/**
 * スキルカテゴリを表すインターフェース
 * @property category カテゴリ名（例: "フロントエンド"）
 * @property icon カテゴリ全体を代表するアイコンのURL
 * @property items このカテゴリに属するスキル項目の配列
 */
export interface SkillCategory {
    category: string;
    icon: string;
    items: SkillItem[];
}