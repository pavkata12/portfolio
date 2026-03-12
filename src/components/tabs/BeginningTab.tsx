import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAudio } from "@/contexts/AudioContext";
import { useLoaderComplete } from "@/contexts/LoaderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { siteConfig, githubUrl } from "@/config/site";

const BeginningTab = ({ onTabChange }: { onTabChange?: (tab: string) => void }) => {
  const { isCyber } = useTheme();
  const { t } = useLanguage();
  const { heroSoundEnabled } = useAudio();
  const loaderComplete = useLoaderComplete();
  const [showCorporateHeroText, setShowCorporateHeroText] = useState(false);
  const [showCyberHeroText, setShowCyberHeroText] = useState(false);
  const [showCyberHeroBtn1, setShowCyberHeroBtn1] = useState(false);
  const [showCyberHeroBtn2, setShowCyberHeroBtn2] = useState(false);
  const [showCv, setShowCv] = useState(false);

  // При превключване на тема – ресет на hero текста и бутони
  useEffect(() => {
    if (!isCyber) {
      setShowCorporateHeroText(false);
    } else {
      setShowCyberHeroText(false);
      setShowCyberHeroBtn1(false);
      setShowCyberHeroBtn2(false);
    }
  }, [isCyber]);

  return (
    <div className={`animate-fade-in min-h-full relative ${!isCyber ? "corporate-content" : ""}`}>
      {/* Hero – cyber и corporate: един и същ layout – видео фон, текст вляво, червен/amber текст според тема */}
      {isCyber ? (
        <>
        <section
          className="relative z-10 w-full min-h-[55vh] sm:min-h-[65vh] lg:min-h-[80vh] pt-4 pb-8 sm:pt-6 sm:pb-12 lg:py-16 overflow-hidden bg-black"
          aria-label="Hero"
        >
          {/* Only mount video after loader finishes so it starts from 0, not ~4s in */}
          {loaderComplete && (
            <video
              key="hero-cyber"
              className="absolute inset-0 w-full h-full object-cover object-center lg:object-cover lg:object-[center_20%] pointer-events-none"
              autoPlay
              muted={!heroSoundEnabled}
              loop
              playsInline
              aria-hidden
              onTimeUpdate={(e) => {
                const t = e.currentTarget.currentTime;
                if (t >= 2 && !showCyberHeroBtn1) setShowCyberHeroBtn1(true);
                if (t >= 4 && !showCyberHeroBtn2) setShowCyberHeroBtn2(true);
                if (t >= 1 && !showCyberHeroText) setShowCyberHeroText(true);
              }}
            >
              <source src="/hero-cyber.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 flex flex-col z-10">
            {/* Top: centered greeting only */}
            {showCyberHeroText && (
              <div className="flex-shrink-0 pt-8 sm:pt-12 lg:pt-16 text-center px-4 animate-hero-text-delayed">
                <h1 className="hero-cyber-greeting text-2xl sm:text-4xl lg:text-5xl leading-tight">
                  {t("hero.greeting")}
                </h1>
              </div>
            )}
            {/* Cyber hero buttons: on top of the holograms – left (GITHUB) pops at 4s, right (PROJECTS) at 2s */}
            <div className="absolute left-[18%] sm:left-[20%] lg:left-[22%] top-[66%] -translate-y-1/2 z-30">
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
            <div className="absolute right-[10%] sm:right-[12%] lg:right-[14%] top-[73%] -translate-y-1/2 z-30">
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
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-x-4 sm:gap-x-6 gap-y-2 text-center sm:text-left">
            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="hero-cyber-text text-lg sm:text-2xl font-bold">{t("hero.fullStack")}</span>
              <span className="hero-cyber-text text-xs sm:text-sm opacity-90">{t("hero.tech")}</span>
            </div>
            <p className="hero-cyber-text text-xs sm:text-sm max-w-xl flex-1 min-w-0">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 sm:gap-x-4 gap-y-0">
              <span className="hero-cyber-text text-xs sm:text-sm font-medium">{t("hero.from")}</span>
              <span className="hero-cyber-text text-xs sm:text-sm opacity-90">{t("hero.experience")}</span>
            </div>
          </div>
        </section>
        </>
      ) : (
        <section
          className="relative z-10 w-full min-h-[55vh] sm:min-h-[65vh] lg:min-h-[80vh] pt-4 pb-8 sm:pt-6 sm:pb-12 lg:py-16 overflow-hidden bg-black"
          aria-label="Hero"
        >
          {/* Видео фон – вертикално видео:
              - мобилно/таблет: запълва целия hero (cover), без празни ленти
              - десктоп: запълва целия hero (cover), лек crop, фокус леко под горния край */}
          <video
            key="hero-corporate"
            className="absolute inset-0 w-full h-full object-cover object-center lg:object-cover lg:object-[center_20%] pointer-events-none"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            onTimeUpdate={(e) => {
              if (!showCorporateHeroText && e.currentTarget.currentTime >= 6.5) {
                setShowCorporateHeroText(true);
              }
            }}
          >
            <source src="/hero-corporate.mp4" type="video/mp4" />
          </video>
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
      )}

      {/* CV section – бутон CV, при клик се разгъва съдържанието */}
      <div className={`relative z-10 ${isCyber ? "bg-black/40 backdrop-blur-sm border-t border-border/80" : "border-t border-slate-700/80"}`}>
        <button
          type="button"
          onClick={() => setShowCv((v) => !v)}
          className={`w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
            isCyber ? "hover:bg-white/5 text-gray-200" : "hover:bg-slate-700/50 text-slate-200"
          }`}
          aria-expanded={showCv}
        >
          <span className="font-display text-sm sm:text-base tracking-widest">
            {t("cv.button")}
          </span>
          {showCv ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />}
        </button>
        {showCv && (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* CV content - two columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-6">
            {/* Professional summary */}
            <section>
              <h2 className="font-display text-sm sm:text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                {t("cv.professionalSummary")}
              </h2>
              <p className="font-body text-sm sm:text-base text-gray-100 leading-relaxed">
                {t("cv.summaryText")}
              </p>
            </section>

            {/* Professional experience */}
            <section>
              <h2 className="font-display text-sm sm:text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                {t("cv.professionalExperience")}
              </h2>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 space-y-1">
                  <h3 className="font-display text-sm text-red-400">{t("cv.simracing.title")}</h3>
                  <p className="font-mono text-xs text-gray-100">{t("cv.simracing.role")}</p>
                  <p className="font-body text-sm text-gray-100 leading-relaxed">{t("cv.simracing.desc")}</p>
                  <p className="font-body text-xs text-gray-100">
                    <a href="https://simracingacademy.eu" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">simracingacademy.eu</a>
                    {" · "}
                    <a href="https://github.com/pavkata12/simracingacademydesktop-program" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">GitHub Desktop</a>
                  </p>
                  <ul className="space-y-1 pt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="font-body text-xs text-gray-100 pl-2 border-l border-border">▸ {t(`cv.simracing.bullet${i}`)}</li>
                    ))}
                  </ul>
                  <p className="font-mono text-[10px] text-gray-200 pt-1">{t("cv.simracing.techs")}</p>
                </div>

                <div className="border-l-2 border-primary pl-4 space-y-1">
                  <h3 className="font-display text-sm text-red-400">{t("cv.innolab.title")}</h3>
                  <p className="font-mono text-xs text-gray-100">{t("cv.innolab.role")}</p>
                  <p className="font-body text-sm text-gray-100 leading-relaxed">{t("cv.innolab.desc")}</p>
                  <ul className="space-y-1 pt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="font-body text-xs text-gray-100 pl-2 border-l border-border">▸ {t(`cv.innolab.bullet${i}`)}</li>
                    ))}
                  </ul>
                  <p className="font-mono text-[10px] text-gray-200 pt-1">{t("cv.innolab.techs")}</p>
                </div>

                <div className="border-l-2 border-primary pl-4 space-y-1">
                  <h3 className="font-display text-sm text-red-400">{t("cv.knauto.title")}</h3>
                  <p className="font-mono text-xs text-gray-100">{t("cv.knauto.role")}</p>
                  <p className="font-body text-sm text-gray-100 leading-relaxed">{t("cv.knauto.desc")}</p>
                  <p className="font-body text-xs">
                    <a href="https://github.com/pavkata12/KNauto" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">GitHub</a>
                  </p>
                  <p className="font-mono text-[10px] text-gray-200">{t("cv.knauto.techs")}</p>
                </div>

                <div className="border-l-2 border-primary pl-4 space-y-1">
                  <h3 className="font-display text-sm text-red-400">{t("cv.orthodent.title")}</h3>
                  <p className="font-mono text-xs text-gray-100">{t("cv.orthodent.role")}</p>
                  <p className="font-body text-sm text-gray-100 leading-relaxed">{t("cv.orthodent.desc")}</p>
                  <p className="font-body text-xs text-gray-100">
                    <a href="https://orthodent.bg" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">orthodent.bg</a>
                  </p>
                  <ul className="space-y-1 pt-1">
                    {[1, 2, 3, 4].map((i) => (
                      <li key={i} className="font-body text-xs text-gray-100 pl-2 border-l border-border">▸ {t(`cv.orthodent.bullet${i}`)}</li>
                    ))}
                  </ul>
                  <p className="font-mono text-[10px] text-gray-200 pt-1">{t("cv.orthodent.techs")}</p>
                </div>

                <div className="border-l-2 border-border pl-4 space-y-1">
                  <h3 className="font-display text-sm text-white">{t("cv.extraExperienceTitle")}</h3>
                  <p className="font-body text-sm text-gray-100">{t("cv.extraExperienceDesc")}</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="font-display text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                {t("cv.education")}
              </h2>
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-display text-sm text-red-400">{t("cv.school.name")}</h3>
                <p className="font-mono text-xs text-gray-100">{t("cv.school.degree")}</p>
                <p className="font-body text-xs text-gray-100 mt-1">{t("cv.school.desc")}</p>
              </div>
            </section>

            {/* Certificates */}
            <section>
              <h2 className="font-display text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                {t("cv.certificates")}
              </h2>
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-display text-sm text-red-400">{t("cv.cert.steam.title")}</h3>
                <p className="font-mono text-xs text-gray-100">{t("cv.cert.steam.date")}</p>
                <p className="font-body text-xs text-gray-100">{t("cv.cert.steam.desc")}</p>
              </div>
            </section>

            {/* Additional info */}
            <section>
              <h2 className="font-display text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                {t("cv.additionalInfo")}
              </h2>
              <ul className="space-y-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="font-body text-xs text-gray-100 pl-2 border-l border-primary">▸ {t(`cv.additional${i}`)}</li>
                ))}
              </ul>
            </section>
      </div>

          {/* Sidebar: Contact, Skills, Languages, Interests */}
      <div className="space-y-4">
            <section>
              <h2 className="font-display text-sm tracking-widest text-red-400 border-b border-border pb-1 mb-2">
                {t("cv.contacts")}
              </h2>
              <ul className="space-y-1.5 font-body text-sm text-gray-100">
                <li>+359 884 823 842</li>
                <li><a href="mailto:pavkamoinov@abv.bg" className="text-red-400 hover:underline">pavkamoinov@abv.bg</a></li>
                <li><a href="https://simracingacademy.eu" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">simracingacademy.eu</a></li>
                <li><a href={githubUrl()} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">GitHub</a></li>
                <li>{t("cv.location")}</li>
              </ul>
            </section>
            <section>
              <h2 className="font-display text-sm tracking-widest text-red-400 border-b border-border pb-1 mb-2">
                {t("cv.keySkills")}
              </h2>
              <div className="space-y-2">
                {[
                  { key: "cv.skill.embedded", pct: 90 },
                  { key: "cv.skill.modeling3d", pct: 85 },
                  { key: "cv.skill.python", pct: 85 },
                  { key: "cv.skill.pcb", pct: 80 },
                  { key: "cv.skill.vue", pct: 75 },
                  { key: "cv.skill.motor", pct: 80 },
                ].map((s) => (
                  <div key={s.key}>
                    <p className="font-mono text-xs text-white">{t(s.key)}</p>
                    <div className="h-1 bg-secondary overflow-hidden mt-0.5">
                      <div className="h-full bg-primary transition-all" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="font-display text-sm tracking-widest text-red-400 border-b border-border pb-1 mb-2">
                {t("cv.languages")}
              </h2>
              <p className="font-mono text-xs text-white">{t("cv.lang.bg")}</p>
              <p className="font-mono text-xs text-gray-100">{t("cv.lang.en")}</p>
            </section>
            <section>
              <h2 className="font-display text-sm tracking-widest text-red-400 border-b border-border pb-1 mb-2">
                {t("cv.interests")}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="px-2 py-0.5 border border-border text-xs font-mono text-gray-100">
                    {t(`cv.interest${i}`)}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default BeginningTab;
