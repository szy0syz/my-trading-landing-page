import React from 'react';

/** 页面头部 Slogan 区域 */
export const HeroSection: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center py-6 sm:py-8 px-4 text-center select-none">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
        <span className="text-white">专注末日期权，</span>
        <span
          style={{
            background:
              'linear-gradient(90deg, #ffffff 0%, #6ee7d0 60%, #fde047 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          日内决胜负
        </span>
      </h1>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300/90 font-normal tracking-wide">
        不留过夜风险&nbsp;·&nbsp;只执行高期望值交易
      </p>
    </section>
  );
};

