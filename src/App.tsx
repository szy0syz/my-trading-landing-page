import { ScrollingBackground } from './components/layout/ScrollingBackground';
import { HeroSection } from './components/layout/HeroSection';
import { CalendarWidget } from './components/calendar/CalendarWidget';
import { fetchData, prefetch } from './lib/dataFetcher';
import { useViewportFit } from './hooks/useViewportFit';
import type { AppData } from './types/trading';

const HERO_HEIGHT = 180;

// 预热并读取数据
prefetch('/data.json');
const dataPromise = fetchData<AppData>('/data.json');

export default function App() {
  const scale = useViewportFit(896, 700, HERO_HEIGHT);

  return (
    <div className="h-dvh overflow-hidden relative bg-[#070e1a]">
      {/* 滚动 SVG 背景 */}
      <ScrollingBackground />

      {/* 渐变遮罩，聚焦中心 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #070e1a 80%)',
        }}
      />

      {/* 主界面 */}
      <main className="relative z-[2] h-full flex flex-col">
        <HeroSection />
        <div className="flex-1 overflow-hidden">
          <CalendarWidget dataPromise={dataPromise} scale={scale} />
        </div>
      </main>
    </div>
  );
}
