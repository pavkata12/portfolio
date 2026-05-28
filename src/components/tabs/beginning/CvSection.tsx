import { useState, useRef, useCallback } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { githubUrl } from "@/config/site";

const CvSection = () => {
  const { isCyber } = useTheme();
  const { t } = useLanguage();
  const [showCv, setShowCv] = useState(false);
  const cvContentRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    const opening = !showCv;
    setShowCv(opening);
    if (opening) {
      window.setTimeout(() => {
        cvContentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [showCv]);

  return (
    <div
      className={`relative z-10 ${isCyber ? "bg-black/40 backdrop-blur-sm border-t border-white/10 cyber-content" : "border-t border-slate-700/60 corporate-content"}`}
    >
      <div className={`px-4 sm:px-6 lg:px-8 py-4 sm:py-5 ${!isCyber ? "max-w-5xl mx-auto" : ""}`}>
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={showCv}
          className={`cv-toggle-btn group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 text-left rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.99] touch-manipulation ${
            showCv
              ? isCyber
                ? "bg-cyan-400/10 border border-cyan-400/50 text-gray-100 focus-visible:ring-cyan-400"
                : "bg-sky-500/10 border border-sky-500/50 text-slate-100 focus-visible:ring-sky-500"
              : isCyber
                ? "cv-toggle-btn-cyber bg-black/50 border-2 border-cyan-400/60 text-gray-100 hover:bg-cyan-400/10 hover:border-cyan-400 focus-visible:ring-cyan-400"
                : "cv-toggle-btn-corporate bg-slate-800/80 border-2 border-sky-500/50 text-slate-100 hover:bg-sky-500/10 hover:border-sky-400 focus-visible:ring-sky-500"
          }`}
        >
          <span className="flex items-center gap-3 min-w-0">
            <span
              className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-lg ${
                isCyber ? "bg-cyan-400/15 text-cyan-400" : "bg-sky-500/15 text-sky-400"
              } ${!showCv ? "group-hover:scale-105 transition-transform" : ""}`}
            >
              <FileText className="w-5 h-5" />
            </span>
            <span className="min-w-0">
              <span className={`block ${isCyber ? "font-display text-sm sm:text-base tracking-widest" : "text-base sm:text-lg font-semibold"}`}>
                {t("cv.button")}
              </span>
              {!showCv && (
                <span className={`block text-[10px] sm:text-xs mt-0.5 truncate ${isCyber ? "text-cyan-400/70 font-mono tracking-wide" : "text-slate-400"}`}>
                  {t("cv.buttonHint")}
                </span>
              )}
            </span>
          </span>
          <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border ${isCyber ? "border-cyan-400/40 text-cyan-400" : "border-sky-400/40 text-sky-400"} ${!showCv ? "cv-toggle-chevron" : ""}`}>
            {showCv ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>
      </div>
      {showCv && (
        <div
          ref={cvContentRef}
          className={`scroll-mt-20 p-4 sm:p-6 lg:p-8 pt-0 space-y-4 sm:space-y-6 ${!isCyber ? "max-w-5xl mx-auto" : "px-4 sm:px-6 lg:px-8"}`}
        >          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
            <div className="space-y-6">
              <section>
                <h2 className="font-display text-sm sm:text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                  {t("cv.professionalSummary")}
                </h2>
                <p className="font-body text-sm sm:text-base text-gray-100 leading-relaxed">
                  {t("cv.summaryText")}
                </p>
              </section>

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
  );
};

export default CvSection;
