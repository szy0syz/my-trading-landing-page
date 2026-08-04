import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full mt-auto pt-2 pb-8 text-center select-none px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="w-full h-px bg-slate-800/80 mb-6" />
        <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide">
          &copy; 2026 jerryshi.com (大飞)
        </p>
      </div>
    </footer>
  );
};
