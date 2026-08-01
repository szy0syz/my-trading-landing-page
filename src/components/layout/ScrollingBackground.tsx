import React from 'react';

/** 背景 K 线图（4 张 SVG 横向无缝流动） */
export const ScrollingBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden flex items-center"
      style={{ zIndex: 0 }}
    >
      <div className="flex shrink-0 animate-marquee">
        {Array.from({ length: 4 }).map((_, i) => (
          <img
            key={i}
            src="/download.svg"
            alt=""
            className="bg-strip shrink-0"
            style={{ width: '960px', height: 'auto', opacity: 0.12 }}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
};
