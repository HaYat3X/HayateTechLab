'use client';

import { useEffect, useState } from 'react';

type TocItem = {
  id: string;
  title: string;
  level: number;
};

export default function TableOfContents({ recordMap }: { recordMap: any }) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // ブロックから目次を抽出
  useEffect(() => {
    if (!recordMap?.block) return;

    const items: TocItem[] = Object.entries(recordMap.block)
      .map(([id, block]: any) => {
        const type = block.value?.type;
        const title = block.value?.properties?.title?.[0]?.[0];
        if (!['heading_1', 'heading_2', 'heading_3'].includes(type)) return null;

        const level = type === 'heading_1' ? 1 : type === 'heading_2' ? 2 : 3;
        return { id, title, level };
      })
      .filter(Boolean) as TocItem[];

    setTocItems(items);
  }, [recordMap]);

  // IntersectionObserverで現在位置を追跡（オプション）
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '0% 0% -80% 0%',
        threshold: 1.0
      }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">目次</h2>
      <ul className="space-y-1">
        {tocItems.map((item) => (
          <li key={item.id} style={{ marginLeft: `${(item.level - 2) * 16}px` }}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`text-sm hover:text-indigo-600 dark:hover:text-indigo-400 ${activeSection === item.id
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300'
                }`}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
