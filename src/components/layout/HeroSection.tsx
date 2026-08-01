import React from 'react';

/** 页面头部 Slogan 区域 */
export const HeroSection: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center py-8 px-4 text-center select-none">
      <h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
        style={{
          background: 'linear-gradient(135deg, #ffffff 40%, #6ee7d0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        专注末日期权，日内决胜负
      </h1>
      <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal tracking-wide">
        不留过夜风险&nbsp;·&nbsp;只执行高期望值交易
      </p>
    </section>
  );
};
