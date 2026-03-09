import { useState, useCallback, useEffect, useRef } from "react";

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
  title: string;
  type: string;
  description: string;
  image: string;
  link: string;
  detailPage: string | null;
  desktopVideo?: string;
  mobileVideo?: string;
  /** MP4 за iPhone (Safari не поддържа WebM). Ако има – използва се за възпроизвеждане на iOS. */
  desktopVideoMp4?: string;
  mobileVideoMp4?: string;
};

/* Same projects as HTML portfolio script.js */
const projects: Project[] = [
  {
    title: "SIM RACING ACADEMY",
    type: "EDUCATIONAL PLATFORM",
    description:
      "Professional academy for sim racing competitions in Pleven. Learn to race like a pro with our simulators and instructors.",
    image: "/simracing-academy.png",
    link: "https://simracingacademy.eu",
    detailPage: "/project-simracing-academy.html",
    desktopVideo: "/simracing-desktop.webm",
    mobileVideo: "/simracing-mobile.webm",
    desktopVideoMp4: "/simracing-desktop.mp4",
    mobileVideoMp4: "/simracing-mobile.mp4",
  },
  {
    title: "ORTHODENT",
    type: "WEB PORTAL FOR DENTAL DICOM IMAGES",
    description:
      "Web platform for a dental clinic: management of DICOM and 3D (STL) images, portals for doctors, patients and laboratories, secure sharing links, and a public site with CMS. Integrated with dental imaging equipment via Orthanc DICOM server. Vue 3, Node.js, Express, PostgreSQL.",
    image: "/orthodent.png",
    link: "https://orthodent.bg",
    detailPage: "/project-orthodent.html",
    desktopVideo: "/orthodent-desktop.webm",
    mobileVideo: "/orthodent-mobile.webm",
    desktopVideoMp4: "/orthodent-desktop.mp4",
    mobileVideoMp4: "/orthodent-mobile.mp4",
  },
  {
    title: "DOM NA PODWALU",
    type: "HISTORIC ACCOMMODATION • LUBLIN",
    description:
      "Уебсайт за историческо настаняване в Лублин – съчетание от исторически чар и съвременен комфорт с онлайн система за резервации за туристи и бизнес пътуващи.",
    image: "/placeholder.svg",
    link: "#",
    detailPage: "/project-dom-na-podwalu.html",
    desktopVideoMp4: "/domnapodwalu-desktop.mp4",
    mobileVideoMp4: "/domnapodwalu-mobile.mp4",
  },
  {
    title: "PHYTOLIFE NUTRACEUTICALS",
    type: "E-COMMERCE • HEALTH & SUPPLEMENTS",
    description:
      "Онлайн бизнес за фармацевтични продукти и натурални добавки. Разширена продуктова гама, SEO видимост и съдържателна стратегия за здравни ръководства.",
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
}: {
  src?: string;
  srcMp4?: string;
  poster: string;
  className?: string;
  aspectClass: string;
  tapToPlay?: boolean;
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
          aria-label="Play video"
        >
          Tap to play
        </button>
      )}
    </div>
  );
};

const getCardStyle = (index: number, isCenter: boolean, isSide: boolean, translateZ: number) => {
  const angle = index * angleStep;
  return {
    transformStyle: "preserve-3d" as const,
    backfaceVisibility: "visible" as const,
    transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
    opacity: isCenter ? 1 : isSide ? 0.7 : 0.4,
    filter: isCenter ? "brightness(1.2)" : isSide ? "brightness(0.7)" : "brightness(0.5)",
    zIndex: isCenter ? 10 : isSide ? 5 : 1,
    borderColor: isCenter ? "hsl(var(--primary))" : isSide ? "rgba(255, 87, 87, 0.3)" : "rgba(255, 87, 87, 0.2)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.9)",
  };
};

const CreationsTab = () => {
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

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    if (rotationOffset === 0) return;
    setTransitionDisabled(true);
    setRotationOffset(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionDisabled(false);
      });
    });
  }, [rotationOffset]);

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

  const handleCardClick = (index: number, project: Project) => {
    if (index === currentIndex) {
      if (project.detailPage) {
        window.location.href = project.detailPage;
      } else if (project.link && project.link !== "#") {
        window.open(project.link, "_blank");
      }
    } else if (!isNarrow) {
      setCurrentIndex(index);
    }
  };

  const renderProjectCard = (project: Project, index: number) => {
    const position = (index - currentIndex + projects.length) % projects.length;
    const isCenter = position === 0;
    const isSide = position === 1 || position === projects.length - 1;

    const isCenterCard = position === 0;
    const clickableOnMobile = isNarrow ? isCenterCard : true;

    return (
      <div
        key={project.title}
        role="button"
        tabIndex={clickableOnMobile ? 0 : -1}
        onClick={() => handleCardClick(index, project)}
        onKeyDown={(e) => {
          if (clickableOnMobile && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleCardClick(index, project);
          }
        }}
        className={`creations-card absolute top-1/2 left-1/2 bg-black/55 border-2 border-border transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden rounded p-4 ${clickableOnMobile ? "cursor-pointer" : "cursor-default pointer-events-none"}`}
        style={{
          ...getCardStyle(index, isCenter, isSide, translateZ),
          width: CARD_W,
          minWidth: CARD_W,
          maxWidth: CARD_W,
          height: CARD_H,
          marginLeft: -CARD_W / 2,
          marginTop: -CARD_H / 2,
        }}
      >
        <h3 className="font-display text-[12px] sm:text-[15px] text-primary mb-1 leading-tight">{project.title}</h3>
        <p className="font-mono text-[8px] sm:text-[9px] text-gray-200 tracking-widest mb-2">{project.type}</p>
        <p className="font-body text-[9px] sm:text-[10px] text-gray-200 leading-relaxed min-h-[32px] sm:min-h-[38px] overflow-hidden line-clamp-3">
          {project.description}
        </p>
        {(project.desktopVideo || project.desktopVideoMp4) && (project.mobileVideo || project.mobileVideoMp4) ? (
          <div className={`flex gap-2 mt-3 ${isNarrow ? "flex-col items-center" : ""}`}>
            {!isNarrow && (
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[8px] text-primary tracking-widest mb-1">DESKTOP</p>
                {isCenter ? (
                  <VideoWithFallback
                    key={`${project.title}-desktop`}
                    src={project.desktopVideo}
                    srcMp4={project.desktopVideoMp4}
                    poster={project.image}
                    aspectClass="w-full aspect-video"
                    className="w-full aspect-video rounded border border-border object-cover"
                    tapToPlay={isNarrow}
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
              <p className="font-mono text-[8px] text-primary tracking-widest mb-1">MOBILE</p>
              {isCenter ? (
                <VideoWithFallback
                  key={`${project.title}-mobile`}
                  src={project.mobileVideo}
                  srcMp4={project.mobileVideoMp4}
                  poster={project.image}
                  aspectClass={isNarrow ? "w-[152px] aspect-[9/19] h-[320px]" : "w-full aspect-[9/19]"}
                  className={isNarrow ? "w-[152px] h-[320px] rounded border border-border object-contain bg-black" : "w-full aspect-[9/19] rounded border border-border object-contain bg-black"}
                  tapToPlay={isNarrow}
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
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (project.detailPage) {
              window.location.href = project.detailPage;
            } else if (project.link && project.link !== "#") {
              window.open(project.link, "_blank");
            }
          }}
          className="mt-3 w-full px-5 py-1.5 border border-primary text-primary font-display text-[9px] tracking-widest hover:bg-primary hover:text-primary-foreground active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        >
          {project.detailPage ? "VIEW DETAILS" : "VIEW LINK"}
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 pb-12 animate-fade-in creations-tab flex flex-col items-center justify-center w-full min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-7rem)]">
      <h2 className="font-display text-xs sm:text-sm tracking-widest text-center text-gray-200 mb-3 sm:mb-4">CREATIONS</h2>

      {/* Slider centered in viewport */}
      <div className="flex items-center gap-2 sm:gap-4 justify-center min-h-[580px] sm:min-h-[520px] w-full max-w-[calc(100vw-2rem)]">
        <button
          type="button"
          onClick={goPrev}
          className="creations-arrow shrink-0 w-10 h-10 sm:w-12 sm:h-12 border border-primary bg-primary/10 text-primary flex items-center justify-center text-xl sm:text-2xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded touch-manipulation"
          aria-label="Previous project"
        >
          ‹
        </button>
        <div
          className="creations-wrapper flex-1 flex items-center justify-center overflow-visible perspective-[1000px] sm:perspective-[1400px] min-w-0 max-w-full"
          style={{ minHeight: `${CARD_H + 24}px` }}
        >
          <div
            className="creations-container relative"
            style={{
              width: CARD_W,
              height: CARD_H,
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotation}deg)`,
              transition: transitionDisabled ? "none" : "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {projects.map((project, index) => renderProjectCard(project, index))}
          </div>
        </div>
        <button
          type="button"
          onClick={goNext}
          className="creations-arrow shrink-0 w-10 h-10 sm:w-12 sm:h-12 border border-primary bg-primary/10 text-primary flex items-center justify-center text-xl sm:text-2xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded touch-manipulation"
          aria-label="Next project"
        >
          ›
        </button>
      </div>

      <div className="text-center mt-3 sm:mt-4 font-display text-[11px] sm:text-[13px] text-gray-200 tracking-widest">
        {currentIndex + 1} / {projects.length}
      </div>
    </div>
  );
};

export default CreationsTab;
