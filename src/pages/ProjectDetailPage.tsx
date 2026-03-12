import { useParams, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const PROJECT_IDS = ["simracing", "orthodent", "domnapodwalu", "phytolife"] as const;
type ProjectId = (typeof PROJECT_IDS)[number];

const PROJECT_CONFIG: Record<
  ProjectId,
  {
    titleKey: string;
    link: string;
    heroDesktop: string;
    heroMobile?: string;
    hasFeatures: boolean;
    hasGoalStepsResults: boolean;
    showCollabNote: boolean;
    hasTech: boolean;
    hasDuration: boolean;
    hasYear: boolean;
    hasLocation: boolean;
    hasCollab: boolean;
  }
> = {
  simracing: {
    titleKey: "projects.simracing.title",
    link: "https://simracingacademy.eu",
    heroDesktop: "/simracing-desktop.mp4",
    heroMobile: "/simracing-mobile.mp4",
    hasFeatures: true,
    hasGoalStepsResults: false,
    showCollabNote: false,
    hasTech: true,
    hasDuration: true,
    hasYear: true,
    hasLocation: false,
    hasCollab: false,
  },
  orthodent: {
    titleKey: "projects.orthodent.title",
    link: "https://orthodent.bg",
    heroDesktop: "/orthodent-desktop.mp4",
    heroMobile: "/orthodent-mobile.mp4",
    hasFeatures: true,
    hasGoalStepsResults: false,
    showCollabNote: false,
    hasTech: true,
    hasDuration: true,
    hasYear: true,
    hasLocation: false,
    hasCollab: false,
  },
  domnapodwalu: {
    titleKey: "projects.domnapodwalu.title",
    link: "#",
    heroDesktop: "/domnapodwalu-desktop.mp4",
    heroMobile: "/domnapodwalu-mobile.mp4",
    hasFeatures: false,
    hasGoalStepsResults: true,
    showCollabNote: true,
    hasTech: false,
    hasDuration: false,
    hasYear: false,
    hasLocation: true,
    hasCollab: true,
  },
  phytolife: {
    titleKey: "projects.phytolife.title",
    link: "#",
    heroDesktop: "/phytolife-desktop.mp4",
    heroMobile: "/phytolife-mobile.mp4",
    hasFeatures: false,
    hasGoalStepsResults: true,
    showCollabNote: true,
    hasTech: false,
    hasDuration: false,
    hasYear: false,
    hasLocation: false,
    hasCollab: true,
  },
};

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isCyber } = useTheme();

  if (!projectId || !PROJECT_IDS.includes(projectId as ProjectId)) {
    navigate("/", { replace: true });
    return null;
  }

  const id = projectId as ProjectId;
  const config = PROJECT_CONFIG[id];

  return (
    <div className={`min-h-screen text-gray-100 p-4 sm:p-6 lg:p-10 relative ${isCyber ? "bg-transparent" : "bg-gradient-to-b from-black to-[#0a0000]"}`}>
      {/* Cyber theme: same video background as Index */}
      {isCyber && (
        <>
          <video
            src="/hero-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none -z-10"
            aria-hidden
          />
          <div className="fixed inset-0 -z-10 bg-black/30" aria-hidden />
        </>
      )}
      <div className="max-w-[1200px] mx-auto relative z-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2 py-3 px-6 border border-[hsl(var(--primary))] text-[hsl(var(--primary))] font-display text-xs tracking-widest no-underline hover:bg-[hsl(var(--primary))] hover:text-primary-foreground transition-all mb-10"
        >
          <span>←</span> {t("page.backToPortfolio")}
        </Link>

        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[hsl(var(--primary))] uppercase tracking-wider mb-2">
            {t(config.titleKey)}
          </h1>
          <p className="text-lg text-gray-400 tracking-widest">{t(`page.${id}.subtitle`)}</p>
        </div>

        <div className="rounded overflow-hidden border-2 border-[hsl(var(--primary))] bg-black/50 h-[300px] sm:h-[500px] mb-10">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src={config.heroDesktop} type="video/mp4" />
          </video>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-10">
          <div className="space-y-6">
            {config.showCollabNote && (
              <p className="text-sm p-4 bg-[hsl(var(--primary)/0.08)] border-l-4 border-[hsl(var(--primary))]">
                <strong>{t("page.collaboration")}:</strong> {t("page.collabNote")}
              </p>
            )}

            <section>
              <h2 className="font-display text-xl sm:text-2xl text-[hsl(var(--primary))] mb-4 tracking-widest">
                {t("page.overview")}
              </h2>
              {config.hasFeatures ? (
                <>
                  <p className="text-base leading-relaxed text-gray-300 mb-4">{t(`page.${id}.overview1`)}</p>
                  <p className="text-base leading-relaxed text-gray-300 mb-6">{t(`page.${id}.overview2`)}</p>
                  <h3 className="font-display text-lg text-[hsl(var(--primary))] mb-3 tracking-widest">
                    {t("page.keyFeatures")}
                  </h3>
                  <ul className="list-none pl-0 space-y-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                      const key = `page.${id}.feature${i}`;
                      const text = t(key);
                      if (text === key) return null;
                      return (
                        <li key={i} className="pl-6 relative text-gray-300 before:content-['▸'] before:absolute before:left-0 before:text-[hsl(var(--primary))]">
                          {text}
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <>
                  <p className="text-base leading-relaxed text-gray-300 mb-6">{t(`page.${id}.overview`)}</p>
                  <h3 className="font-display text-lg text-[hsl(var(--primary))] mb-2 tracking-widest">
                    {t("page.goal")}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-300 mb-6">{t(`page.${id}.goal`)}</p>
                  <h3 className="font-display text-lg text-[hsl(var(--primary))] mb-2 tracking-widest">
                    {t("page.steps")}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-300 mb-6">{t(`page.${id}.steps`)}</p>
                  <h3 className="font-display text-lg text-[hsl(var(--primary))] mb-2 tracking-widest">
                    {t("page.results")}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-300">{t(`page.${id}.results`)}</p>
                </>
              )}
            </section>
          </div>

          <div className="lg:pt-0">
            <div className="bg-black/40 border border-border rounded-lg p-6 space-y-5">
              <div>
                <div className="font-display text-xs text-[hsl(var(--primary))] tracking-widest mb-1">
                  {t("page.client")}
                </div>
                <div className="text-sm text-gray-100">{t(`page.${id}.client`)}</div>
              </div>
              {config.hasCollab && (
                <div>
                  <div className="font-display text-xs text-[hsl(var(--primary))] tracking-widest mb-1">
                    {t("page.collaboration")}
                  </div>
                  <div className="text-sm text-gray-100">{t(`page.${id}.collab`)}</div>
                </div>
              )}
              <div>
                <div className="font-display text-xs text-[hsl(var(--primary))] tracking-widest mb-1">
                  {t("page.role")}
                </div>
                <div className="text-sm text-gray-100">{t(`page.${id}.role`)}</div>
              </div>
              {config.hasDuration && (
                <div>
                  <div className="font-display text-xs text-[hsl(var(--primary))] tracking-widest mb-1">
                    {t("page.duration")}
                  </div>
                  <div className="text-sm text-gray-100">{t(`page.${id}.duration`)}</div>
                </div>
              )}
              {config.hasYear && (
                <div>
                  <div className="font-display text-xs text-[hsl(var(--primary))] tracking-widest mb-1">
                    {t("page.year")}
                  </div>
                  <div className="text-sm text-gray-100">{t(`page.${id}.year`)}</div>
                </div>
              )}
              {config.hasLocation && (
                <div>
                  <div className="font-display text-xs text-[hsl(var(--primary))] tracking-widest mb-1">
                    {t("page.location")}
                  </div>
                  <div className="text-sm text-gray-100">{t(`page.${id}.location`)}</div>
                </div>
              )}
              {config.hasTech && (
                <div>
                  <div className="font-display text-xs text-[hsl(var(--primary))] tracking-widest mb-2">
                    {t("page.technologies")}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(t(`page.${id}.tech`) as string).split(", ").map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary))] text-[10px] sm:text-xs tracking-wide text-[hsl(var(--primary))]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {config.link !== "#" && (
                <a
                  href={config.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 text-center bg-[hsl(var(--primary))] text-primary-foreground font-display text-xs tracking-widest no-underline hover:opacity-90 transition-opacity mt-4"
                >
                  {t("page.visitWebsite")}
                </a>
              )}
            </div>
          </div>
        </div>

        {config.heroMobile && (
          <div className="mt-10">
            <h2 className="font-display text-xl text-[hsl(var(--primary))] mb-4 tracking-widest">
              {t("page.mobilePreview")}
            </h2>
            <div className="max-w-[200px] rounded overflow-hidden border-2 border-[hsl(var(--primary))] bg-black">
              <video autoPlay muted loop playsInline className="w-full aspect-[9/19] object-contain">
                <source src={config.heroMobile} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
