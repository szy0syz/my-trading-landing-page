import React, { useState } from 'react';

/** 
 * 【0DTE 邪恶波动率微笑 (Evil Volatility Smile)】可拖动互动组件
 * 融入 OTM / ATM / ITM 衍生品值程度 (Moneyness) 指标
 * 默认处于 99.9% 极度夸张下沉邪恶大笑形态
 */
export const EvilVolatilitySmile: React.FC = () => {
  // 默认状态设为 66.6 (EVIL SKEW: 66.6%)
  const [skewLevel, setSkewLevel] = useState<number>(66.6);

  // 极度下沉曲线：baseCurveY 延伸至 97px，呈极致 U 形抛物线
  const baseCurveY = 12 + (skewLevel / 100) * 85; 
  const evilIndex = Math.min(99.9, skewLevel).toFixed(1);
  const ivSkew = Math.round(100 + (skewLevel / 100) * 380); // 100% ~ 480%

  // 动态恶魔眼睛亮度、发光半径与放缩大小
  const eyeOpacity = Math.max(0.12, skewLevel / 100);
  const eyeGlow = (skewLevel / 100) * 16;
  const eyeScale = (0.7 + (skewLevel / 100) * 0.4).toFixed(2);

  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-2 pb-1 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* 顶部包含 OTM / ATM / ITM 极简微型状态栏 (小屏隐藏，sm及以上显示) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-2xl text-[10px] sm:text-xs font-mono mb-1 px-2 text-slate-400">
        {/* 左侧：OTM PUT / ITM CALL 偏斜区 */}
        <span className="flex items-center gap-1.5 text-rose-400">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>OTM PUT / ITM CALL</span>
          <span className="text-rose-300 font-bold">({ivSkew}%)</span>
        </span>

        {/* 中间：ATM 平值交割区 & 邪恶指数 */}
        <span className="text-amber-300 font-semibold tracking-wide flex items-center gap-1">
          <span className="text-xs">😈</span>
          <span>ATM</span>
          <span className="text-slate-500">•</span>
          <span>EVIL SKEW:</span>
          <strong className="text-amber-400 font-bold">{evilIndex}%</strong>
        </span>

        {/* 右侧：OTM CALL / ITM PUT 冲激区 */}
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="text-emerald-300 font-bold">
            {skewLevel > 50 ? 'Γ EXTREME' : 'NORMAL'}
          </span>
          <span>OTM CALL / ITM PUT</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </span>
      </div>

      {/* SVG 邪恶微笑曲线画板 (加大纵向容积 105px) */}
      <div className="relative w-full max-w-2xl h-16 sm:h-20 flex items-center justify-center cursor-ew-resize group mt-2">
        {/* 动态恶魔发光眼睛 (根据拖动弯曲程度 skewLevel 实时变化明暗、尺寸与 Glow 光晕) */}
        <div
          className="absolute top-[1.2rem] left-1/2 flex items-center gap-9 pointer-events-none transition-all duration-75"
          style={{
            opacity: eyeOpacity,
            transform: `translateX(-50%) scale(${eyeScale})`,
          }}
        >
          <span
            className="h-1.5 sm:h-2 w-3 sm:w-4 rounded-full bg-rose-500 rotate-12 transition-all duration-75"
            style={{
              boxShadow: `0 0 ${eyeGlow}px ${eyeGlow / 2}px rgba(244, 63, 94, ${0.4 + (skewLevel / 100) * 0.6})`,
            }}
          />
          <span
            className="h-1.5 sm:h-2 w-3 sm:w-4 rounded-full bg-rose-500 -rotate-12 transition-all duration-75"
            style={{
              boxShadow: `0 0 ${eyeGlow}px ${eyeGlow / 2}px rgba(244, 63, 94, ${0.4 + (skewLevel / 100) * 0.6})`,
            }}
          />
        </div>

        <svg
          className="w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 600 105"
          preserveAspectRatio="none"
        >
          <defs>
            {/* 邪恶微笑多色发光渐变 (深红 OTM Put -> 霓虹金 ATM -> 翡翠绿 OTM Call) */}
            <linearGradient id="evilSmileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="25%" stopColor="#e11d48" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            {/* 高压 Glow 霓虹滤镜 */}
            <filter id="evilGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 夸张大幅度下沉的“邪恶大笑”嘴唇 Bezier 曲线 */}
          <path
            d={`M 30,6 C 110,${baseCurveY + 20} 490,${baseCurveY + 20} 570,6`}
            fill="none"
            stroke="url(#evilSmileGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#evilGlow)"
            className="transition-all duration-75"
          />

          {/* 曲线左端向上勾起的高能尖嘴角落 (Left Evil Smile Tip) */}
          <path
            d="M 30,6 Q 18,-2 12,18"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* 曲线右端向上勾起的高能尖嘴角落 (Right Evil Smile Tip) */}
          <path
            d="M 570,6 Q 582,-2 588,18"
            fill="none"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* 透明 Range 交互滑块：完全靠 cursor-ew-resize 鼠标指示 */}
        <input
          type="range"
          min="10"
          max="100"
          value={skewLevel}
          onChange={(e) => setSkewLevel(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          title="左右拖动调节 0DTE 邪恶波动率微笑"
        />
      </div>
    </section>
  );
};
