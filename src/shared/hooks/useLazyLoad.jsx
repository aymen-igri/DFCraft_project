import { useState, useRef, useEffect } from "react";

export default function useLazyLoad(items, batchSize = 10) {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef(null);

  // Reset when the list changes (search, category filter, etc.)
  useEffect(() => {
    setVisibleCount(batchSize);
  }, [items.length, batchSize]);

  // Watch the sentinel — when visible, load more
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + batchSize, items.length));
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [items.length, batchSize]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return { visibleItems, hasMore, sentinelRef };
}