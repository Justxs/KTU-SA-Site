'use client';

import { useSyncExternalStore } from 'react';

function subscribe(onStoreChange: () => void) {
  if (globalThis.window === undefined) return () => { };

  const notify = () => onStoreChange();
  window.addEventListener('scroll', notify, { passive: true });
  window.addEventListener('resize', notify);

  return () => {
    window.removeEventListener('scroll', notify);
    window.removeEventListener('resize', notify);
  };
}

function getSnapshot(threshold: number) {
  return globalThis.window !== undefined && window.scrollY > threshold;
}

export default function useScrollThreshold(threshold: number) {
  return useSyncExternalStore(subscribe, () => getSnapshot(threshold), () => false);
}
