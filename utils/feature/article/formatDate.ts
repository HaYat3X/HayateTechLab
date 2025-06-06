/**
 * 日付文字列をフォーマットする
 * @param dateString 日付文字列（ISO形式など）
 * @returns フォーマットされた日付文字列（例: "2023年10月1日"）
 */
export const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
