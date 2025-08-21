"use client";

import SearchBar from "./SearchBar";
import type { ArticleCategory } from "@/types/feature/article/interface/ArticleCategory";
import { memo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type SortKey = "new" | "old" | "views";

export type ArticleSearchSidebarProps = {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  categories: ArticleCategory[];
  activeCategory: string;
  onCategoryChange: (v: string) => void;
  sort: SortKey;
  onSortChange: (v: SortKey) => void;
  className?: string;
};

const ArticleSearchSidebar: React.FC<ArticleSearchSidebarProps> = ({
  searchTerm,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  className = "",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // クエリを組み立てて /blog/search へ反映
  const applyToURL = (next: {
    q?: string;
    category?: string;
    sort?: SortKey;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    // q
    if (typeof next.q !== "undefined") {
      next.q ? params.set("q", next.q) : params.delete("q");
    }
    // category
    if (typeof next.category !== "undefined") {
      next.category && next.category !== "all"
        ? params.set("category", next.category)
        : params.delete("category");
    }
    // sort（デフォルトを new にして、省略時はクエリから外す）
    if (typeof next.sort !== "undefined") {
      next.sort && next.sort !== "new"
        ? params.set("sort", next.sort)
        : params.delete("sort");
    }

    const qs = params.toString();
    router.replace(qs ? `/blog/search?${qs}` : "/blog/search");
  };

  // カテゴリ・ソートはクリック時に即適用
  const handleCategory = (id: string) => {
    onCategoryChange(id);
    applyToURL({ category: id, q: searchTerm, sort });
  };
  const handleSort = (key: SortKey) => {
    onSortChange(key);
    applyToURL({ sort: key, q: searchTerm, category: activeCategory });
  };

  // 検索はボタンで適用（SearchBarはそのまま）
  const submitSearch = () => {
    applyToURL({ q: searchTerm, category: activeCategory, sort });
  };

  return (
    <aside className={className}>
      <div className="sticky top-24 space-y-4 rounded-2xl p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow group">
        {/* キーワード検索 */}
        <h3 className="font-semibold text-base">キーワードで検索</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchBar value={searchTerm} onChange={onSearchChange} />
          </div>
          <button
            type="button"
            onClick={submitSearch}
            className="shrink-0 rounded-xl border px-3 py-2 text-sm hover:bg-muted/40 dark:bg-gray-700 dark:text-gray-200"
          >
            検索
          </button>
        </div>

        {/* カテゴリー検索 */}
        <h3 className="font-semibold text-base pt-8">カテゴリーで検索</h3>
        <div className="grid grid-cols-1 gap-1">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleCategory(c.id)}
              className={[
                "text-left px-3 py-1 hover:bg-muted/60",
                activeCategory === c.id
                  ? "font-medium"
                  : "text-muted-foreground",
              ].join(" ")}
              aria-pressed={activeCategory === c.id}
            >
              # {c.name}
            </button>
          ))}
        </div>

        {/* 並び替え */}
        <h3 className="font-semibold text-base pt-8">記事を並び替える</h3>
        <div className="space-y-2 text-gray-400">
          <label
            className={`flex items-center gap-2 cursor-pointer px-3 ${sort === "new" ? "text-foreground" : ""
              }`}
          >
            <input
              type="radio"
              name="sort"
              className="accent-current"
              checked={sort === "new"}
              onChange={() => handleSort("new")}
            />
            新しい順
          </label>

          <label
            className={`flex items-center gap-2 cursor-pointer px-3 py-2 ${sort === "old" ? "text-foreground" : ""
              }`}
          >
            <input
              type="radio"
              name="sort"
              className="accent-current"
              checked={sort === "old"}
              onChange={() => handleSort("old")}
            />
            古い順
          </label>

          <label
            className={`flex items-center gap-2 cursor-pointer px-3 ${sort === "views" ? "text-foreground" : ""
              }`}
          >
            <input
              type="radio"
              name="sort"
              className="accent-current"
              checked={sort === "views"}
              onChange={() => handleSort("views")}
            />
            閲覧数が多い順
          </label>
        </div>
      </div>
    </aside>
  );
};

// 再レンダリング最適化（props が同じなら再描画しない）
export default memo(ArticleSearchSidebar);
