import React from 'react';

interface IUseIntersectionObserverProps {
  root?: React.MutableRefObject<any>;
  target?: React.MutableRefObject<any>;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
  onIntersect: () => void;
}

export function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: IUseIntersectionObserverProps) {
  React.useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;
    if (!el) return;

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.current, enabled]);
}
