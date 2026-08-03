import { CalendarWidget } from './components/calendar/CalendarWidget';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/layout/HeroSection';
import { ScrollingBackground } from './components/layout/ScrollingBackground';
import { fetchData, prefetch } from './lib/dataFetcher';
import type { AppData } from './types/trading';

prefetch('/data.json');
const dataPromise = fetchData<AppData>('/data.json');

export default function App() {
  return (
    <div className="min-h-dvh relative overflow-x-hidden bg-[#070e1a]">
      <ScrollingBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #070e1a 80%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1 opacity-50 bg-contour-lines mask-radial-fade"
      />

      <main className="relative z-2 min-h-dvh flex flex-col pt-6 sm:pt-4 overflow-hidden">
        {/* 顶部半透明半圆形发散灯光 (Top Spotlight Beam) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-112.5 z-0 opacity-50 transition-opacity duration-300"
        >
          {/* 外层大面积半圆形发散晕光 */}
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-175 sm:w-250 md:w-325 h-80 sm:h-100"
            style={{
              background:
                'radial-gradient(ellipse 60% 75% at 50% 0%, rgba(45, 212, 191, 0.14) 0%, rgba(14, 165, 233, 0.08) 40%, rgba(6, 182, 212, 0.02) 75%, transparent 100%)',
              filter: 'blur(35px)',
            }}
          />
          {/* 顶部灯源中心的柔和光核 */}
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 sm:w-130 md:w-175 h-45 sm:h-60"
            style={{
              background:
                'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(94, 234, 212, 0.15) 40%, transparent 100%)',
              filter: 'blur(25px)',
            }}
          />
        </div>

        <HeroSection />
        <CalendarWidget dataPromise={dataPromise} />
        <Footer />
      </main>
    </div>
  );
}
