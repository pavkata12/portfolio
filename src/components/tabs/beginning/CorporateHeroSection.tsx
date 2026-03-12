import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { githubUrl } from "@/config/site";
import { CORPORATE_HERO_TEXT_TIME } from "./constants";

type CorporateHeroSectionProps = {
  onTabChange?: (tab: string) => void;
};

const CorporateHeroSection = ({ onTabChange }: CorporateHeroSectionProps) => {
  const { t } = useLanguage();
  const [showCorporateHeroText, setShowCorporateHeroText] = useState(false);

  return (
    <section
      className="relative z-10 w-full min-h-[55vh] sm:min-h-[65vh] lg:min-h-[80vh] pt-4 pb-8 sm:pt-6 sm:pb-12 lg:py-16 overflow-hidden bg-black"
      aria-label="Hero"
    >
      <video
        key="hero-corporate"
        className="absolute inset-0 w-full h-full object-cover object-center lg:object-cover lg:object-[center_20%] pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        onTimeUpdate={(e) => {
          if (!showCorporateHeroText && e.currentTarget.currentTime >= CORPORATE_HERO_TEXT_TIME) {
            setShowCorporateHeroText(true);
          }
        }}
      >
        <source src="/hero-corporate.mp4" type="video/mp4" />
      </video>
      {showCorporateHeroText && (
        <div className="absolute inset-0 z-[5] bg-black/40 pointer-events-none" aria-hidden />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 min-h-0 lg:min-h-[60vh] items-stretch px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto relative z-10">
        {showCorporateHeroText && (
          <div className="relative z-20 flex flex-col justify-center order-2 lg:order-1 pt-0 pb-4 sm:py-4 lg:py-4 animate-hero-text-delayed">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-amber-400 leading-tight mb-1 sm:mb-2">
              {t("hero.greeting")} {t("site.name")} {t("hero.from")}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">{t("hero.experience")}</p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-xl">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              {onTabChange ? (
                <>
                  <button
                    type="button"
                    onClick={() => onTabChange("creations")}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[120px] px-4 py-2.5 text-sm bg-white text-slate-900 font-semibold rounded hover:bg-slate-100 transition-colors active:scale-[0.98] touch-manipulation cursor-pointer"
                  >
                    {t("hero.creations")}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={githubUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[120px] px-4 py-2.5 text-sm border-2 border-white text-white font-semibold rounded hover:bg-white/10 transition-colors active:scale-[0.98] touch-manipulation cursor-pointer"
                  >
                    {t("hero.github")}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[120px] px-4 py-2.5 text-sm bg-white text-slate-900 font-semibold rounded hover:bg-slate-100 transition-colors active:scale-[0.98] touch-manipulation cursor-pointer"
                  >
                    {t("hero.chat")}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[40px] min-w-[120px] px-4 py-2.5 text-sm border-2 border-white text-white font-semibold rounded hover:bg-white/10 transition-colors active:scale-[0.98] touch-manipulation cursor-pointer"
                  >
                    {t("hero.startProject")}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              )}
            </div>
            <div className="flex gap-4 sm:gap-8">
              <div>
                <p className="text-xl sm:text-3xl font-bold text-amber-400">{t("hero.fullStack")}</p>
                <p className="text-slate-400 text-xs sm:text-sm">{t("hero.tech")}</p>
              </div>
            </div>
          </div>
        )}
        <div className="relative order-1 lg:order-2 min-h-0 sm:min-h-0 lg:min-h-[200px]" aria-hidden />
      </div>
    </section>
  );
};

export default CorporateHeroSection;
