/**
 * 検索バーコンポーネントに渡すプロパティの型定義
 * @property value - 入力欄の現在の値（検索キーワード）
 * @property onChange - 入力値が変更されたときに呼び出されるコールバック関数。引数に入力された文字列を受け取る
 */
export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
