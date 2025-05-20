import { useEffect } from 'react';

/**
 * 指定された要素群に対して、スクロールで可視状態になったときに
 * 指定クラス（デフォルトは 'animate-slide-in'）を付与する IntersectionObserver フック。
 *
 * @param elementsRef - 監視対象の要素配列（useRef.current）
 * @param className - 追加するクラス名（デフォルト: 'animate-slide-in'）
 * @param threshold - IntersectionObserver のしきい値（デフォルト: 0.1）
 */
export const useScrollAnimation = (
  elementsRef: (HTMLElement | null)[],
  className: string = 'animate-slide-in',
  threshold: number = 0.1
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
          }
        });
      },
      { threshold }
    );

    elementsRef.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [elementsRef, className, threshold]);
};
