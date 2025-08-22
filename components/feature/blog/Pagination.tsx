"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination (library-free)
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  basePath = "/blog/search",
  query = {},
  windowSize = 5,
  className = "",
}) => {
  const pages = useMemo(() => {
    const size = Math.min(windowSize, totalPages);
    let from = Math.max(1, currentPage - Math.floor(size / 2));
    let to = from + size - 1;
    if (to > totalPages) {
      to = totalPages;
      from = Math.max(1, to - size + 1);
    }
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  }, [currentPage, totalPages, windowSize]);

  const hrefFor = (page: number) => {
    const q: any = { ...query };
    if (page > 1) q.page = String(page);
    else delete q.page;

    const params = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => {
      const val = v == null ? "" : String(v);
      if (!val) return;
      if (k === "category" && val === "all") return;
      if (k === "sort" && val === "new") return;
      params.set(k, val);
    });

    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center justify-center gap-3 text-sm ${className}`}
      aria-label="Pagination"
    >
      {/* 前へ（左アイコン） */}
      <Link
        href={hrefFor(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`flex items-center justify-center w-8 h-8 rounded-md border hover:bg-muted ${currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>

      <div className="flex items-center gap-1">
        {pages[0] > 1 && (
          <>
            <Link
              className="px-3 py-1 rounded-md border hover:bg-muted dark:text-white"
              href={hrefFor(1)}
            >
              1
            </Link>
            {pages[0] > 2 && <span className="px-1">…</span>}
          </>
        )}

        {pages.map((p) => (
          <Link
            key={p}
            href={hrefFor(p)}
            className={`px-3 py-1 rounded-md border dark:text-white hover:bg-muted ${p === currentPage
                ? "bg-primary text-primary-foreground border-primary"
                : ""
              }`}
          >
            {p}
          </Link>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="px-1">…</span>
            )}
            <Link
              className="px-3 py-1 rounded-md border hover:bg-muted dark:text-white"
              href={hrefFor(totalPages)}
            >
              {totalPages}
            </Link>
          </>
        )}
      </div>

      {/* 次へ（右アイコン） */}
      <Link
        href={hrefFor(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-8 h-8 rounded-md border hover:bg-muted ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }`}
      >
        <ChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  );
};

export default Pagination;
