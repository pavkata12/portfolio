import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const useIsNarrow = () => {
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 639px)");
    setIsNarrow(m.matches);
    const listener = () => setIsNarrow(m.matches);
    m.addEventListener("change", listener);
    return () => m.removeEventListener("change", listener);
  }, []);
  return isNarrow;
};

type Project = {
  id: string;
  titleKey: string;
  typeKey: string;
  descKey: string;
  image: string;
  link: string;
  detailPage: string | null;
  desktopVideo?: string;
  mobileVideo?: string;
  desktopVideoMp4?: string;
  mobileVideoMp4?: string;
};

const projects: Project[] = [
  {
    id: "simracing",
    titleKey: "projects.simracing.title",
    typeKey: "projects.simracing.type",
    descKey: "projects.simracing.description",
    image: "/simracing-academy.png",
    link: "https://simracingacademy.eu",
    detailPage: "/project-simracing-academy.html",
    desktopVideo: "/simracing-desktop.webm",
    mobileVideo: "/simracing-mobile.webm",
    desktopVideoMp4: "/simracing-desktop.mp4",
    mobileVideoMp4: "/simracing-mobile.mp4",
  },
  {
    id: "orthodent",
    titleKey: "projects.orthodent.title",
    typeKey: "projects.orthodent.type",
    descKey: "projects.orthodent.description",
    image: "/orthodent.png",
    link: "https://orthodent.bg",
    detailPage: "/project-orthodent.html",
    desktopVideo: "/orthodent-desktop.webm",
    mobileVideo: "/orthodent-mobile.webm",
    desktopVideoMp4: "/orthodent-desktop.mp4",
    mobileVideoMp4: "/orthodent-mobile.mp4",
  },
  {
    id: "domnapodwalu",
    titleKey: "projects.domnapodwalu.title",
    typeKey: "projects.domnapodwalu.type",
    descKey: "projects.domnapodwalu.description",
    image: "/placeholder.svg",
    link: "#",
    detailPage: "/project-dom-na-podwalu.html",
    desktopVideoMp4: "/domnapodwalu-desktop.mp4",
    mobileVideoMp4: "/domnapodwalu-mobile.mp4",
  },
  {
    id: "phytolife",
    titleKey: "projects.phytolife.title",
    typeKey: "projects.phytolife.type",
    descKey: "projects.phytolife.description",
    image: "/placeholder.svg",
    link: "#",
    detailPage: "/project-phytolife.html",
    desktopVideoMp4: "/phytolife-desktop.mp4",
    mobileVideoMp4: "/phytolife-mobile.mp4",
  },
];

const angleStep = 360 / projects.length;

/** Video with poster; on error shows poster. src = webm (optional), srcMp4 = MP4 (used on iOS or when no webm). tapToPlay за блокиран autoplay. */
const VideoWithFallback = ({
  src,
  srcMp4,
  poster,
  className,
  aspectClass,
  tapToPlay = false,
  tapToPlayLabel = "",
}: {
  src?: string;
  srcMp4?: string;
  poster: string;
  className?: string;
  aspectClass: string;
  tapToPlay?: boolean;
  tapToPlayLabel?: string;
}) => {
  const [failed, setFailed] = useState(false);
  const [showTapOverlay, setShowTapOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    const tryPlay = () => {
      video.play().catch(() => {
        if (tapToPlay) setShowTapOverlay(true);
      });
    };
    tryPlay();
    video.addEventListener("canplay", tryPlay);
    return () => video.removeEventListener("canplay", tryPlay);
  }, [src, srcMp4, failed, tapToPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !tapToPlay) return;
    const onPlaying = () => setShowTapOverlay(false);
    video.addEventListener("playing", onPlaying);
    return () => video.removeEventListener("playing", onPlaying);
  }, [tapToPlay]);

  const handleTapToPlay = () => {
    videoRef.current?.play();
    setShowTapOverlay(false);
  };

  if (failed) {
    return (
      <div
        className={`${aspectClass} rounded border border-border bg-black bg-cover bg-center`}
        style={{ backgroundImage: `url(${poster})` }}
      />
    );
  }
  return (
    <div className="relative rounded overflow-hidden">
      <video
        ref={videoRef}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={className}
        onError={() => setFailed(true)}
      >
        {srcMp4 && <source src={srcMp4} type="video/mp4" />}
        {src && <source src={src} type="video/webm" />}
      </video>
      {tapToPlay && showTapOverlay && (
        <button
          type="button"
          onClick={handleTapToPlay}
          className="absolute inset-0 flex items-center justify-center bg-black/60 text-primary font-display text-[10px] tracking-wider"
          aria-label={tapToPlayLabel}
        >
          {tapToPlayLabel}
        </button>
      )}
    </div>
  );
};

const getCardStyle = (
  index: number,
  isCenter: boolean,
  isSide: boolean,
  translateZ: number,
  isCyber: boolean,
) => {
  const angle = index * angleStep;
  const borderColor = isCyber
    ? isCenter
      ? "rgba(0, 229, 255, 0.65)"
      : isSide
        ? "rgba(255, 60, 60, 0.25)"
        : "rgba(255, 255, 255, 0.12)"
    : isCenter
      ? "rgb(56, 189, 248)"
      : isSide
        ? "rgba(148, 163, 184, 0.45)"
        : "rgba(100, 116, 139, 0.35)";

  return {
    transformStyle: "preserve-3d" as const,
    backfaceVisibility: "hidden" as const,
    transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
    opacity: isCenter ? 1 : isSide ? 0.55 : 0.25,
    zIndex: isCenter ? 10 : isSide ? 5 : 1,
    borderColor,
    boxShadow: isCenter
      ? isCyber
        ? "0 0 32px rgba(0, 229, 255, 0.15), 0 20px 60px rgba(0,0,0,0.9)"
        : "0 16px 48px rgba(15, 23, 42, 0.55)"
      : "0 8px 32px rgba(0,0,0,0.45)",
  };
};

const TRANSITION_MS = 700;

const CreationsTab = () => {
  const { t } = useLanguage();
  const { isCyber } = useTheme();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDisabled, setTransitionDisabled] = useState(false);
  const isNarrow = useIsNarrow();
  const CARD_W = isNarrow ? 300 : 420;
  const CARD_H = isNarrow ? 540 : 480;
  const translateZ = isNarrow ? 320 : 600;

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const next = (currentIndex + 1) % projects.length;
    if (next === 0 && currentIndex === projects.length - 1) {
      setRotationOffset((o) => o - 360);
    }
    setCurrentIndex(next);
  }, [isTransitioning, currentIndex]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prev = (currentIndex - 1 + projects.length) % projects.length;
    if (prev === projects.length - 1 && currentIndex === 0) {
      setRotationOffset((o) => o + 360);
    }
    setCurrentIndex(prev);
  }, [isTransitioning, currentIndex]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      const n = projects.length;
      const forward = (index - currentIndex + n) % n;
      const backward = (currentIndex - index + n) % n;
      setIsTransitioning(true);
      setRotationOffset((o) => {
        if (forward <= backward) {
          if (forward > 0 && index < currentIndex) return o - 360;
        } else if (backward > 0 && index > currentIndex) {
          return o + 360;
        }
        return o;
      });
      setCurrentIndex(index);
    },
    [isTransitioning, currentIndex],
  );

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== containerRef.current || e.propertyName !== "transform") return;
      setIsTransitioning(false);
      if (rotationOffset === 0) return;
      setTransitionDisabled(true);
      setRotationOffset(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionDisabled(false);
        });
      });
    },
    [rotationOffset],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const startX = touchStartX.current;
      touchStartX.current = null;
      if (startX == null || isTransitioning) return;
      const deltaX = (e.changedTouches[0]?.clientX ?? startX) - startX;
      if (Math.abs(deltaX) < 48) return;
      if (deltaX > 0) goPrev();
      else goNext();
    },
    [goPrev, goNext, isTransitioning],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  const rotation = -currentIndex * angleStep + rotationOffset;
  const activeProject = projects[currentIndex];

  const openProject = useCallback(
    (project: Project) => {
      if (project.detailPage) {
        navigate(`/project/${project.id}`);
      } else if (project.link && project.link !== "#") {
        window.open(project.link, "_blank");
      }
    },
    [navigate],
  );

  const renderOrder = [...projects.keys()].sort((a, b) => {
    const posA = (a - currentIndex + projects.length) % projects.length;
    const posB = (b - currentIndex + projects.length) % projects.length;
    const layer = (pos: number) => {
      if (pos === 0) return 2;
      if (pos === 1 || pos === projects.length - 1) return 1;
      return 0;
    };
    return layer(posA) - layer(posB);
  });

  const renderProjectCard = (project: Project, index: number) => {
    const position = (index - currentIndex + projects.length) % projects.length;
    const isCenter = position === 0;
    const isSide = position === 1 || position === projects.length - 1;

    return (
      <div
        key={project.id}
        aria-hidden={!isCenter}
        className={`creations-card pointer-events-none absolute top-1/2 left-1/2 border-2 overflow-hidden p-4 ${
          isCyber
            ? "bg-black/60 border-border rounded backdrop-blur-sm"
            : "bg-slate-800/90 border-slate-600/60 rounded-xl backdrop-blur-sm"
        } ${isTransitioning ? "" : "transition-[opacity,box-shadow,border-color] duration-300 ease-out"}`}
        style={{
          ...getCardStyle(index, isCenter, isSide, translateZ, isCyber),
          width: CARD_W,
          minWidth: CARD_W,
          maxWidth: CARD_W,
          height: CARD_H,
          marginLeft: -CARD_W / 2,
          marginTop: -CARD_H / 2,
        }}
      >
        <h3
          className={`mb-1 leading-tight ${
            isCyber
              ? "font-display text-[12px] sm:text-[15px] text-cyan-400"
              : "text-sm sm:text-base font-semibold text-slate-100"
          }`}
        >
          {t(project.titleKey)}
        </h3>
        <p
          className={`mb-2 ${
            isCyber
              ? "font-mono text-[8px] sm:text-[9px] text-red-400/90 tracking-widest"
              : "text-[10px] sm:text-xs font-medium uppercase tracking-wide text-sky-400/90"
          }`}
        >
          {t(project.typeKey)}
        </p>
        <p
          className={`leading-relaxed min-h-[32px] sm:min-h-[38px] overflow-hidden line-clamp-3 ${
            isCyber ? "font-body text-[9px] sm:text-[10px] text-gray-200" : "text-xs sm:text-sm text-slate-300"
          }`}
        >
          {t(project.descKey)}
        </p>
        {(project.desktopVideo || project.desktopVideoMp4) && (project.mobileVideo || project.mobileVideoMp4) ? (
          <div className={`flex gap-2 mt-3 ${isNarrow ? "flex-col items-center" : ""}`}>
            {!isNarrow && (
              <div className="flex-1 min-w-0">
                <p className={`font-mono text-[8px] tracking-widest mb-1 ${isCyber ? "text-cyan-400" : "text-primary"}`}>{t("creations.desktop")}</p>
                {isCenter ? (
                  <VideoWithFallback
                    key={`${project.id}-desktop`}
                    src={project.desktopVideo}
                    srcMp4={project.desktopVideoMp4}
                    poster={project.image}
                    aspectClass="w-full aspect-video"
                    className="w-full aspect-video rounded border border-border object-cover"
                    tapToPlay={isNarrow}
                    tapToPlayLabel={t("creations.tapToPlay")}
                  />
                ) : (
                  <div
                    className="w-full aspect-video rounded border border-border object-cover bg-black bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                )}
              </div>
            )}
            <div className={isNarrow ? "flex flex-col items-center shrink-0" : "flex-1 max-w-[120px] min-w-0"}>
              <p className={`font-mono text-[8px] tracking-widest mb-1 ${isCyber ? "text-cyan-400" : "text-primary"}`}>{t("creations.mobile")}</p>
              {isCenter ? (
                <VideoWithFallback
                  key={`${project.id}-mobile`}
                  src={project.mobileVideo}
                  srcMp4={project.mobileVideoMp4}
                  poster={project.image}
                  aspectClass={isNarrow ? "w-[152px] aspect-[9/19] h-[320px]" : "w-full aspect-[9/19]"}
                  className={isNarrow ? "w-[152px] h-[320px] rounded border border-border object-contain bg-black" : "w-full aspect-[9/19] rounded border border-border object-contain bg-black"}
                  tapToPlay={isNarrow}
                  tapToPlayLabel={t("creations.tapToPlay")}
                />
              ) : (
                <div
                  className={isNarrow ? "w-[152px] h-[320px] rounded border border-border object-contain bg-black bg-cover bg-center" : "w-full aspect-[9/19] rounded border border-border object-contain bg-black bg-cover bg-center"}
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="mt-3 h-[100px] rounded border border-border overflow-hidden flex items-center justify-center bg-secondary">
            <img
              src={project.image}
              alt={t(project.titleKey)}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>
    );
  };

  const arrowClass = isCyber
    ? "creations-arrow shrink-0 w-10 h-10 sm:w-12 sm:h-12 border border-cyan-400/40 bg-cyan-400/5 text-cyan-400 flex items-center justify-center hover:bg-cyan-400/15 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded touch-manipulation disabled:opacity-40 disabled:pointer-events-none"
    : "creations-arrow shrink-0 w-10 h-10 sm:w-12 sm:h-12 border border-slate-600 bg-slate-800/80 text-sky-400 flex items-center justify-center hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg touch-manipulation disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div
      className={`p-4 sm:p-6 pb-12 animate-fade-in creations-tab flex flex-col items-center justify-center w-full min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-7rem)] ${
        isCyber ? "cyber-content" : "corporate-content"
      }`}
    >
      <h2
        className={`text-center mb-3 sm:mb-4 ${
          isCyber
            ? "font-display text-xs sm:text-sm tracking-widest text-gray-200"
            : "text-lg sm:text-xl font-semibold text-slate-100"
        }`}
      >
        {t("creations.title")}
      </h2>

      <div
        className="flex items-center gap-2 sm:gap-4 justify-center min-h-[580px] sm:min-h-[520px] w-full max-w-[calc(100vw-2rem)]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={isTransitioning}
          className={arrowClass}
          aria-label={t("creations.prev")}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="creations-wrapper flex-1 flex flex-col items-center justify-center overflow-visible perspective-[1000px] sm:perspective-[1400px] min-w-0 max-w-full">
          <div
            className="relative flex items-center justify-center"
            style={{ width: CARD_W, minHeight: `${CARD_H + 24}px` }}
          >
            <div
              ref={containerRef}
              className="creations-container relative will-change-transform"
              style={{
                width: CARD_W,
                height: CARD_H,
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg)`,
                transition: transitionDisabled
                  ? "none"
                  : `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {renderOrder.map((index) => renderProjectCard(projects[index], index))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => openProject(activeProject)}
            className={
              isCyber
                ? "relative z-50 mt-3 shrink-0 px-5 py-2.5 border border-cyan-400/60 text-cyan-400 font-display text-[9px] sm:text-[10px] tracking-widest hover:bg-cyan-400/15 hover:border-cyan-400 active:scale-[0.98] transition-all cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                : "relative z-50 mt-4 shrink-0 px-6 py-2.5 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-400 active:scale-[0.98] transition-colors cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            }
            style={{ width: CARD_W, maxWidth: "100%" }}
          >
            {activeProject.detailPage ? t("creations.viewDetails") : t("creations.viewLink")}
          </button>
        </div>
        <button
          type="button"
          onClick={goNext}
          disabled={isTransitioning}
          className={arrowClass}
          aria-label={t("creations.next")}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 mt-4 sm:mt-5">
        <div className="flex items-center gap-2" role="tablist" aria-label={t("creations.title")}>
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={t(project.titleKey)}
              disabled={isTransitioning}
              onClick={() => goToIndex(index)}
              className={`h-2 rounded-full transition-all duration-200 touch-manipulation disabled:opacity-50 ${
                index === currentIndex
                  ? isCyber
                    ? "w-6 bg-cyan-400 shadow-[0_0_8px_#00e5ff]"
                    : "w-6 bg-sky-400"
                  : isCyber
                    ? "w-2 bg-cyan-400/25 hover:bg-cyan-400/45"
                    : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
        <p
          className={
            isCyber
              ? "font-display text-[11px] sm:text-[13px] text-gray-200 tracking-widest"
              : "text-sm text-slate-400 tabular-nums"
          }
        >
          {currentIndex + 1} / {projects.length}
        </p>
      </div>
    </div>
  );
};

export default CreationsTab;
