import { useEffect, useState } from 'react';

/**
 * useViewportFit - 根据视窗宽高动态计算容器缩放比例 (CSS zoom)
 */
export function useViewportFit(
  naturalWidth = 896,
  naturalHeight = 700,
  heroHeight = 180,
): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const availW = window.innerWidth - 32;
      const availH = window.innerHeight - heroHeight - 12;
      const calculatedScale = Math.min(
        1,
        availW / naturalWidth,
        availH / naturalHeight,
      );
      setScale(Math.max(0.35, calculatedScale));
    };

    compute();
    window.addEventListener('resize', compute, { passive: true });
    return () => window.removeEventListener('resize', compute);
  }, [naturalWidth, naturalHeight, heroHeight]);

  return scale;
}
