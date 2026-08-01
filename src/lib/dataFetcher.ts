/**
 * dataFetcher.ts - Map + Promise 缓存请求库
 * 专为 React 19 use(promise) + Suspense 打造，替代简单的 React Query
 */

const cache = new Map<string, Promise<unknown>>();

/** 获取并缓存 JSON 请求，同一 URL 仅请求一次 */
export function fetchData<T>(url: string): Promise<T> {
  if (!cache.has(url)) {
    const promise = fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error(`[dataFetcher] Fetch failed for ${url}: ${res.status}`);
      }
      return res.json() as Promise<T>;
    });
    cache.set(url, promise);
  }
  return cache.get(url) as Promise<T>;
}

/** 预热缓存 */
export function prefetch(url: string): void {
  fetchData(url);
}
