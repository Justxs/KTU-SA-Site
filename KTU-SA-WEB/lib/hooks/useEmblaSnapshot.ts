'use client';

import { useSyncExternalStore } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

type EmblaSnapshot = Readonly<{
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: readonly number[];
}>;

const EMPTY_SCROLL_SNAPS: readonly number[] = Object.freeze([]);
const DEFAULT_SNAPSHOT: EmblaSnapshot = Object.freeze({
  canScrollPrev: false,
  canScrollNext: false,
  selectedIndex: 0,
  scrollSnaps: EMPTY_SCROLL_SNAPS,
});

const emblaSnapshotCache = new WeakMap<EmblaCarouselType, EmblaSnapshot>();
const SUBSCRIBED_EVENTS = ['init', 'reInit', 'resize', 'select', 'slidesChanged'] as const;

function areScrollSnapsEqual(left: readonly number[], right: readonly number[]) {
  if (left.length !== right.length) return false;

  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) return false;
  }

  return true;
}

function getEmblaSnapshot(emblaApi?: EmblaCarouselType): EmblaSnapshot {
  if (!emblaApi) return DEFAULT_SNAPSHOT;

  const scrollSnaps = emblaApi.scrollSnapList();
  const nextSnapshot: EmblaSnapshot = {
    canScrollPrev: emblaApi.canScrollPrev(),
    canScrollNext: emblaApi.canScrollNext(),
    selectedIndex: emblaApi.selectedScrollSnap(),
    scrollSnaps,
  };

  const previousSnapshot = emblaSnapshotCache.get(emblaApi);
  if (
    previousSnapshot?.canScrollPrev === nextSnapshot.canScrollPrev &&
    previousSnapshot.canScrollNext === nextSnapshot.canScrollNext &&
    previousSnapshot.selectedIndex === nextSnapshot.selectedIndex &&
    areScrollSnapsEqual(previousSnapshot.scrollSnaps, nextSnapshot.scrollSnaps)
  ) {
    return previousSnapshot;
  }

  emblaSnapshotCache.set(emblaApi, nextSnapshot);
  return nextSnapshot;
}

export default function useEmblaSnapshot(emblaApi?: EmblaCarouselType) {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (!emblaApi) return () => {};

      const notify = () => onStoreChange();
      for (const event of SUBSCRIBED_EVENTS) emblaApi.on(event, notify);

      return () => {
        for (const event of SUBSCRIBED_EVENTS) emblaApi.off(event, notify);
      };
    },
    () => getEmblaSnapshot(emblaApi),
    () => DEFAULT_SNAPSHOT,
  );
}
