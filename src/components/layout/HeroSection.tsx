import React from 'react';

/**
 * 0DTE 衍生品核心量化指标
 */
const QUANT_METRICS = {
  thetaDecay: '-98.5%',
  ivSkew: '145% Peak',
  gammaSurge: '50x+ Max',
  deltaShift: '0.05 → 0.92',
} as const;

/** 顶部 0DTE 量化状态标签 */
const QuantBadge: React.FC = () => (
  <div className="animate-hud-breath inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-teal-500/30 shadow-lg shadow-teal-950/50 backdrop-blur-md mb-4 sm:mb-6 text-xs sm:text-sm font-mono tracking-wide text-slate-300">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
    </span>
    <span className="text-rose-400 font-semibold">0DTE OPTIONS</span>
    <span className="text-slate-600">|</span>
    <span className="text-slate-300 font-medium">EXTREME VOLATILITY</span>
    <span className="text-slate-600">•</span>
    <span className="text-slate-400">
      IV <strong className="text-cyan-300 font-medium">180%</strong>
    </span>
  </div>
);

/**
 * 侧边悬浮 HUD 量化指标卡片
 */
interface HudCardProps {
  type: 'risk' | 'yield';
}

const HudCard: React.FC<HudCardProps> = ({ type }) => {
  const isRisk = type === 'risk';
  return (
    <div
      className={`hidden lg:flex flex-col items-start gap-1 p-2.5 rounded-xl bg-slate-950/70 backdrop-blur-md font-mono text-xs w-48 text-left transition-all duration-300 border shadow-lg whitespace-nowrap ${
        isRisk
          ? 'border-rose-500/25 shadow-rose-950/30 hover:border-rose-500/50'
          : 'border-emerald-500/25 shadow-emerald-950/30 hover:border-emerald-500/50'
      }`}
    >
      <div
        className={`flex items-center gap-1.5 text-[11px] font-semibold ${
          isRisk ? 'text-rose-400' : 'text-emerald-400'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full animate-pulse ${
            isRisk ? 'bg-rose-500' : 'bg-emerald-400'
          }`}
        />
        {isRisk ? 'RISK PROFILE' : 'YIELD PROFILE'}
      </div>

      <div className="text-slate-300 text-[11px] mt-0.5 whitespace-nowrap">
        {isRisk ? 'Θ Theta Decay:' : 'Γ Gamma Surge:'}{' '}
        <span
          className={`font-bold ${
            isRisk ? 'text-rose-400' : 'text-emerald-400'
          }`}
        >
          {isRisk ? QUANT_METRICS.thetaDecay : QUANT_METRICS.gammaSurge}
        </span>
      </div>

      <div className="text-slate-400 text-[10px] whitespace-nowrap">
        {isRisk ? 'IV Skew:' : 'Δ Delta Shift:'}{' '}
        <span className={isRisk ? 'text-amber-400' : 'text-cyan-300'}>
          {isRisk ? QUANT_METRICS.ivSkew : QUANT_METRICS.deltaShift}
        </span>
      </div>
    </div>
  );
};

/** 背景衍生品公式与波形轨迹 */
const BackgroundGreeksWave: React.FC = () => (
  <>
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-[0.06] text-[10px] sm:text-xs md:text-sm font-mono tracking-widest text-teal-300 select-none overflow-hidden whitespace-nowrap text-center z-0"
    >
      ∂V/∂t + ½σ²S²(∂²V/∂S²) = rV &nbsp;•&nbsp; Γ Gamma = ∂²V/∂S² &nbsp;•&nbsp;
      Θ Theta = ∂V/∂t &nbsp;•&nbsp; ϕ Charm = ∂Δ/∂t &nbsp;•&nbsp; τ Vanna =
      ∂Δ/∂σ &nbsp;•&nbsp; IV = σ(implied)
    </div>

    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-4 top-1/2 -translate-y-1/2 h-36 z-0 opacity-40"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d="M0,75 Q200,85 400,75 T600,65 Q750,15 850,5 T1000,95"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="2"
          className="animate-wave-flow"
        />
      </svg>
    </div>
  </>
);

/**
 * 页面 Hero Slogan 区域
 */
export const HeroSection: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center py-5 sm:py-8 px-4 text-center select-none max-w-7xl mx-auto w-full">
      <QuantBadge />

      <div className="relative w-full flex flex-col items-center justify-center">
        <BackgroundGreeksWave />

        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8">
          <HudCard type="risk" />

          {/* 主标题 */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
            {/* 末日期权 */}
            <span className="relative group inline-block -translate-x-8 sm:translate-x-0 transition-transform duration-300">
              <span
                className="animate-shimmer-fast"
                style={{
                  background:
                    'linear-gradient(90deg, #f43f5e 0%, #fbbf24 35%, #34d399 70%, #f43f5e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                末日期权
              </span>
            </span>

            {/* 一击翻仓 */}
            <span
              className="translate-x-8 sm:translate-x-0 transition-transform duration-300 inline-block"
              style={{
                background:
                  'linear-gradient(90deg, #ffffff 0%, #6ee7d0 60%, #fde047 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              一击翻仓
            </span>
          </h1>

          <HudCard type="yield" />
        </div>

        {/* 移动端数据卡片 */}
        <div className="lg:hidden mt-3 flex items-center justify-center gap-3 font-mono text-[11px]">
          <div className="px-2.5 py-1 rounded-lg bg-slate-950/70 border border-rose-500/20 text-slate-300">
            <span className="text-rose-400 font-semibold">Θ Theta Decay:</span>{' '}
            {QUANT_METRICS.thetaDecay}
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-slate-950/70 border border-emerald-500/20 text-slate-300">
            <span className="text-emerald-400 font-semibold">
              Γ Gamma Surge:
            </span>{' '}
            {QUANT_METRICS.gammaSurge}
          </div>
        </div>
      </div>
    </section>
  );
};
