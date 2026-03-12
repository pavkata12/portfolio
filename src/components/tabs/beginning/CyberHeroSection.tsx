import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { useLoaderComplete } from "@/contexts/LoaderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { githubUrl } from "@/config/site";
import {
  MOBILE_BREAKPOINT,
  CYBER_GREETING_TIME,
  CYBER_BTN1_TIME,
  CYBER_BTN2_TIME,
  CYBER_GREETING_TIME_MOBILE,
  CYBER_BTN1_TIME_MOBILE,
  CYBER_BTN2_TIME_MOBILE,
} from "./constants";

type CyberHeroSectionProps = {
  onTabChange?: (tab: string) => void;
};

const CyberHeroSection = ({ onTabChange }: CyberHeroSectionProps) => {
  const { t } = useLanguage();
  const { heroSoundEnabled } = useAudio();
  const loaderComplete = useLoaderComplete();
  const [showCyberHeroText, setShowCyberHeroText] = useState(false);
  const [showCyberHeroBtn1, setShowCyberHeroBtn1] = useState(false);
  const [showCyberHeroBtn2, setShowCyberHeroBtn2] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const tGreet = isMobile ? CYBER_GREETING_TIME_MOBILE : CYBER_GREETING_TIME;
  const tBtn1 = isMobile ? CYBER_BTN1_TIME_MOBILE : CYBER_BTN1_TIME;
  const tBtn2 = isMobile ? CYBER_BTN2_TIME_MOBILE : CYBER_BTN2_TIME;

  const handleTimeUpdate = (time: number) => {
    if (time >= tGreet && !showCyberHeroText) setShowCyberHeroText(true);
    if (time >= tBtn1 && !showCyberHeroBtn1) setShowCyberHeroBtn1(true);
    if (time >= tBtn2 && !showCyberHeroBtn2) setShowCyberHeroBtn2(true);
  };

  return (
    <>
      <section
        className="relative z-10 w-full min-h-[85vh] sm:min-h-[65vh] lg:min-h-[80vh] pt-4 pb-20 sm:pt-6 sm:pb-12 lg:py-16 overflow-hidden bg-transparent"
        aria-label="Hero"
      >
        {loaderComplete && (
          <video
            key={isMobile ? "hero-cyber-mobile" : "hero-cyber"}
            className={`absolute inset-0 w-full h-full object-center pointer-events-none ${isMobile ? "object-cover" : "object-contain"}`}
            autoPlay
            muted={isMobile || !heroSoundEnabled}
            loop
            playsInline
            preload="auto"
            poster="/hero-cyber.png"
            aria-hidden
            onTimeUpdate={(e) => handleTimeUpdate(e.currentTarget.currentTime)}
          >
            <source src={isMobile ? "/hero-cyber-mobile.mp4" : "/hero-cyber.mp4"} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 flex flex-col z-10">
          {showCyberHeroText && (
            <div className="flex-shrink-0 pt-8 sm:pt-12 lg:pt-16 text-center px-4 animate-hero-text-delayed">
              <h1 className="hero-cyber-greeting text-2xl sm:text-4xl lg:text-5xl leading-tight">
                {t("hero.greeting")}
              </h1>
            </div>
          )}
          {/* Mobile: buttons centered at bottom */}
          <div className="sm:hidden absolute bottom-6 left-0 right-0 flex justify-center gap-3 px-4 z-30">
            {onTabChange ? (
              <>
                <div className={`flex transition-all duration-500 ease-out ${showCyberHeroBtn2 ? "hero-btn-pop-left" : "opacity-0 translate-x-[-24px]"}`}>
                  <a href={githubUrl()} target="_blank" rel="noopener noreferrer" className="hero-cyber-btn-outline inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[100px] px-3 py-2.5 text-xs font-semibold rounded active:scale-[0.98] touch-manipulation cursor-pointer">
                    {t("hero.github")} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className={`flex transition-all duration-500 ease-out ${showCyberHeroBtn1 ? "hero-btn-pop-right" : "opacity-0 translate-x-[24px]"}`}>
                  <button type="button" onClick={() => onTabChange("creations")} className="hero-cyber-btn-outline inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[100px] px-3 py-2.5 text-xs font-semibold rounded active:scale-[0.98] touch-manipulation cursor-pointer">
                    {t("hero.creations")} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={`flex transition-all duration-500 ease-out ${showCyberHeroBtn2 ? "hero-btn-pop-left" : "opacity-0 translate-x-[-24px]"}`}>
                  <Link to="/contact" className="hero-cyber-btn-outline inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[100px] px-3 py-2.5 text-xs font-semibold rounded active:scale-[0.98] touch-manipulation cursor-pointer">
                    {t("hero.startProject")} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className={`flex transition-all duration-500 ease-out ${showCyberHeroBtn1 ? "hero-btn-pop-right" : "opacity-0 translate-x-[24px]"}`}>
                  <Link to="/contact" className="hero-cyber-btn-outline inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[100px] px-3 py-2.5 text-xs font-semibold rounded active:scale-[0.98] touch-manipulation cursor-pointer">
                    {t("hero.chat")} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </>
            )}
          </div>
          {/* Desktop: buttons on holograms */}
          <div className="hidden sm:block absolute left-[18%] sm:left-[20%] lg:left-[22%] top-[66%] -translate-y-1/2 z-30">
            {onTabChange ? (
              <div className={`flex transition-all duration-500 ease-out ${showCyberHeroBtn2 ? "hero-btn-pop-left" : "opacity-0 translate-x-[-24px]"}`}>
                <a
                  href={githubUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cyber-btn-outline inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[120px] px-4 py-2.5 text-sm font-semibold rounded active:scale-[0.98] touch-manipulation cursor-pointer"
                >
                  {t("hero.github")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className={`flex transition-all duration-500 ease-out ${showCyberHeroBtn2 ? "hero-btn-pop-left" : "opacity-0 translate-x-[-24px]"}`}>
                <Link
                  to="/contact"
                  className="hero-cyber-btn-outline inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[120px] px-4 py-2.5 text-sm font-semibold rounded active:scale-[0.98] touch-manipulation cursor-pointer"
                >
                  {t("hero.startProject")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
          <div className="hidden sm:block absolute right-[10%] sm:right-[12%] lg:right-[14%] top-[73%] -translate-y-1/2 z-30">
            {onTabChange ? (
              <div className={`flex transition-all duration-500 ease-out ${showCyberHeroBtn1 ? "hero-btn-pop-right" : "opacity-0 translate-x-[24px]"}`}>
                <button
                  type="button"
                  onClick={() => onTabChange("creations")}
                  className="hero-cyber-btn-outline inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[120px] px-4 py-2.5 text-sm font-semibold rounded active:scale-[0.98] touch-manipulation cursor-pointer"
                >
                  {t("hero.creations")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className={`flex transition-all duration-500 ease-out ${showCyberHeroBtn1 ? "hero-btn-pop-right" : "opacity-0 translate-x-[24px]"}`}>
                <Link
                  to="/contact"
                  className="hero-cyber-btn-outline inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[120px] px-4 py-2.5 text-sm font-semibold rounded active:scale-[0.98] touch-manipulation cursor-pointer"
                >
                  {t("hero.chat")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Line below hero: Full-Stack intro */}
      <section
        className="w-full px-4 sm:px-6 lg:px-10 py-4 sm:py-5 bg-black/40 backdrop-blur-sm border-t border-white/10"
        aria-label="About"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-y-3 sm:gap-y-0 gap-x-4 sm:gap-x-6 text-center sm:text-left">
          <div className="flex items-baseline gap-2 sm:gap-3">
            <span className="hero-cyber-text text-base sm:text-2xl font-bold">{t("hero.fullStack")}</span>
            <span className="hero-cyber-text text-[10px] sm:text-sm opacity-90">{t("hero.tech")}</span>
          </div>
          <p className="hero-cyber-text text-[10px] sm:text-sm max-w-xl flex-1 min-w-0 order-last sm:order-none w-full sm:w-auto">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 sm:gap-x-4 gap-y-0">
            <span className="hero-cyber-text text-[10px] sm:text-sm font-medium">{t("hero.from")}</span>
            <span className="hero-cyber-text text-[10px] sm:text-sm opacity-90">{t("hero.experience")}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default CyberHeroSection;
