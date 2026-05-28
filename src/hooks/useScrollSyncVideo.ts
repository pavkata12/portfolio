import { useEffect, useRef } from "react";
import { useScrollContainer } from "@/contexts/ScrollContainerContext";

/** Scroll range in pixels – колко скрол = пълен цикъл на видеото */
const SCROLL_RANGE_PX = 800;

/**
 * Синхронизира видеото със скрола – при скрол напред видеото върви напред.
 */
export function useScrollSyncVideo(videoRef: React.RefObject<HTMLVideoElement | null>, enabled = true) {
  const scrollContainerRef = useScrollContainer();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || !scrollContainerRef?.current || !videoRef?.current) return;

    const container = scrollContainerRef.current;
    const video = videoRef.current;

    const updateVideoTime = () => {
      const scrollTop = container.scrollTop;
      const progress = Math.min(1, Math.max(0, scrollTop / SCROLL_RANGE_PX));
      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        video.currentTime = progress * duration;
      }
      rafRef.current = requestAnimationFrame(updateVideoTime);
    };

    video.addEventListener("loadedmetadata", updateVideoTime);
    rafRef.current = requestAnimationFrame(updateVideoTime);

    return () => {
      video.removeEventListener("loadedmetadata", updateVideoTime);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, scrollContainerRef, videoRef]);
}
