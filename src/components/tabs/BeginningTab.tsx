import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const BeginningTab = () => {
  const { isCyber } = useTheme();

  return (
    <div className={`animate-fade-in min-h-full relative ${!isCyber ? "corporate-content" : ""}`}>
      {/* Hero – cyber: центриран слоган; corporate: като референция – текст вляво, снимка вдясно + бутони + stats */}
      {isCyber ? (
        <section
          className="relative z-10 flex min-h-[40vh] sm:min-h-[60vh] lg:min-h-[85vh] flex-col items-center justify-start pt-6 sm:pt-12 md:pt-16 px-4 sm:px-6 text-center"
          aria-label="Hero"
        >
          <div className="w-full max-w-4xl">
            <p className="font-slogan text-xl sm:text-2xl md:text-3xl lg:text-5xl text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] leading-snug">
              Build things that matter.
            </p>
          </div>
        </section>
      ) : (
        <section
          className="relative z-10 w-full min-h-[70vh] py-12 lg:py-16 bg-gradient-to-br from-slate-600 via-slate-800 to-blue-950 overflow-visible"
          aria-label="Hero"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[60vh] items-stretch px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
            <div className="relative z-20 flex flex-col justify-center order-2 lg:order-1 py-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-400 leading-tight mb-4">
              Pavlin Moinov is right here!
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              С опит в full-stack разработка превръщам идеи в стабилни приложения – Vue.js, Node.js, Python, real-time системи и production-ready решения.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] min-w-[140px] px-6 py-3 bg-white text-slate-900 font-semibold rounded hover:bg-slate-100 transition-colors active:scale-[0.98] touch-manipulation cursor-pointer"
              >
                CHAT WITH ME
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] min-w-[140px] px-6 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white/10 transition-colors active:scale-[0.98] touch-manipulation cursor-pointer"
              >
                START A PROJECT
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex gap-8 sm:gap-12">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-amber-400">100+</p>
                <p className="text-slate-400 text-sm">Projects delivered</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-amber-400">Full-Stack</p>
                <p className="text-slate-400 text-sm">Vue, Node, Python</p>
              </div>
            </div>
          </div>
            <div className="relative order-1 lg:order-2 min-h-[200px] sm:min-h-[240px]" aria-hidden />
          </div>
          {/* Снимка bash в долния десен ъгъл на hero (section е full width) */}
          <div
            className="absolute bottom-0 right-0 z-0 w-72 h-72 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem] xl:w-[28rem] xl:h-[28rem] flex items-end justify-end pointer-events-none"
            style={{
              maskImage: "linear-gradient(to left, transparent 0%, black 35%)",
              WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 35%)",
            }}
          >
            <img
              src="/profile-corporate.png"
              alt="Pavlin Moinov"
              className="h-full w-auto object-contain object-bottom object-right"
            />
          </div>
        </section>
      )}

      {/* CV content */}
      <div className={`relative z-10 ${isCyber ? "bg-black/40 backdrop-blur-sm border-t border-border/80" : "border-t border-slate-700/80"}`}>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* CV content - two columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-6">
            {/* Professional summary */}
            <section>
              <h2 className="font-display text-sm sm:text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                ПРОФЕСИОНАЛНО РЕЗЮМЕ
              </h2>
              <p className="font-body text-sm sm:text-base text-gray-100 leading-relaxed">
                Full-Stack Developer с практически опит в разработка на реални приложения с Vue.js, Node.js и Python. Работил съм по платформа с multi-tier архитектура (frontend + backend + desktop client), real-time синхронизация (WebSocket) и оптимизация за production (PWA, lazy loading и SEO метаданни). Имам опит с бази данни (SQLite), desktop UI (PySide6/Tkinter) и изграждане на функционалности като gamification системи. Търся позиция в софтуерна компания, където да надграждам като developer и да доставям стабилни, поддържани решения.
              </p>
            </section>

            {/* Professional experience */}
            <section>
              <h2 className="font-display text-sm sm:text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                ПРОФЕСИОНАЛЕН ОПИТ
              </h2>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 space-y-1">
                  <h3 className="font-display text-sm text-red-400">Sim Racing Academy – Gaming платформа</h3>
                  <p className="font-mono text-xs text-gray-100">Full-Stack Developer (Freelance) · Септември 2025</p>
                  <p className="font-body text-sm text-gray-100 leading-relaxed">
                    Разработка и поддръжка на full-stack gaming платформа за симулаторна академия с real-time синхронизация и gamification система.
                  </p>
                  <p className="font-body text-xs text-gray-100">
                    <a href="https://simracingacademy.eu" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">simracingacademy.eu</a>
                    {" · "}
                    <a href="https://github.com/pavkata12/simracingacademydesktop-program" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">GitHub Desktop</a>
                  </p>
                  <ul className="space-y-1 pt-1">
                    {["Multi-tier: Vue.js + Node.js + Python desktop + SQLite", "Real-time WebSocket синхронизация (30s)", "Gamification: XP/tokens, 6 нива", "Desktop client (PySide6) + Windows API anti-cheat", "PWA, lazy loading, SEO (JSON-LD, Open Graph)"].map((item, i) => (
                      <li key={i} className="font-body text-xs text-gray-100 pl-2 border-l border-border">▸ {item}</li>
                    ))}
                  </ul>
                  <p className="font-mono text-[10px] text-gray-200 pt-1">Vue.js, Node.js, Python, SQLite, WebSocket, PySide6, PWA</p>
                </div>

                <div className="border-l-2 border-primary pl-4 space-y-1">
                  <h3 className="font-display text-sm text-red-400">Innolab – Миоелектрически протези</h3>
                  <p className="font-mono text-xs text-gray-100">3D оператор (hardware & embedded) · 2023 – 2024</p>
                  <p className="font-body text-sm text-gray-100 leading-relaxed">
                    Проектиране и разработка на функционални миоелектрически протези за горни крайници.
                  </p>
                  <ul className="space-y-1 pt-1">
                    {["3D принтирани корпуси (PLA/TPU)", "Електронна система за 5 пръста с DC мотори (PWM)", "Микроконтролери Arduino/ESP32 за EMG в реално време", "PCB в KiCad, SMD запояване", "LiPo батерии с BMS"].map((item, i) => (
                      <li key={i} className="font-body text-xs text-gray-100 pl-2 border-l border-border">▸ {item}</li>
                    ))}
                  </ul>
                  <p className="font-mono text-[10px] text-gray-200 pt-1">3D print, CAD, Arduino/ESP32, C/C++, EMG, KiCad</p>
                </div>

                <div className="border-l-2 border-primary pl-4 space-y-1">
                  <h3 className="font-display text-sm text-red-400">K N Auto – Инвентарна система</h3>
                  <p className="font-mono text-xs text-gray-100">Python Desktop Developer (Freelance) · 2024</p>
                  <p className="font-body text-sm text-gray-100 leading-relaxed">
                    Standalone desktop приложение за инвентарно управление на автомобилни части. 500+ модела, 40+ марки. Tkinter GUI, PyInstaller .exe.
                  </p>
                  <p className="font-body text-xs">
                    <a href="https://github.com/pavkata12/KNauto" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">GitHub</a>
                  </p>
                  <p className="font-mono text-[10px] text-gray-200">Python, Tkinter, SQLite, PyInstaller</p>
                </div>

                <div className="border-l-2 border-primary pl-4 space-y-1">
                  <h3 className="font-display text-sm text-red-400">Orthodent (orthodent.bg) – Уеб портал за дентални DICOM снимки</h3>
                  <p className="font-mono text-xs text-gray-100">Full-Stack Developer (Freelance) · Февруари 2026</p>
                  <p className="font-body text-sm text-gray-100 leading-relaxed">
                    Уеб платформа за дентална клиника: управление на рентгенови (DICOM) и 3D (STL) снимки, портали за лекари, пациенти и лаборатории, защитени линкове за споделяне, публичен сайт с CMS. Интеграция с рентген апарат чрез DICOM сървър (Orthanc).
                  </p>
                  <p className="font-body text-xs text-gray-100">
                    <a href="https://orthodent.bg" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">orthodent.bg</a>
                  </p>
                  <ul className="space-y-1 pt-1">
                    {["Vue 3 + Node.js/Express, PostgreSQL, Orthanc (DICOM)", "Портали: пациенти (преглед/изтегляне), лекари (качване, търсене), лаборатории (STL)", "Публичен сайт с CMS, защитени временни линкове", "RESTful API, ролева авторизация (JWT)"].map((item, i) => (
                      <li key={i} className="font-body text-xs text-gray-100 pl-2 border-l border-border">▸ {item}</li>
                    ))}
                  </ul>
                  <p className="font-mono text-[10px] text-gray-200 pt-1">Vue 3, Vite, Pinia, Three.js, Node.js, Express, PostgreSQL, Orthanc, Docker</p>
      </div>

                <div className="border-l-2 border-border pl-4 space-y-1">
                  <h3 className="font-display text-sm text-white">Допълнителен опит</h3>
                  <p className="font-body text-sm text-gray-100">Имам опит в работа с клиенти и комуникация с тях – консултиране, изисквания и обратна връзка.</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="font-display text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                ОБРАЗОВАНИЕ
              </h2>
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-display text-sm text-red-400">ПГЕХТ „Проф. Асен Златаров" – Плевен</h3>
                <p className="font-mono text-xs text-gray-100">Юни 2020 · Техник на компютърни системи</p>
                <p className="font-body text-xs text-gray-100 mt-1">Компютърна техника и технологии. C/C++, Python, електроника, микроконтролери, embedded.</p>
              </div>
            </section>

            {/* Certificates */}
            <section>
              <h2 className="font-display text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                СЕРТИФИКАТИ
              </h2>
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-display text-sm text-red-400">STEAM EDUFUTURE – 3D технологии и AR/VR</h3>
                <p className="font-mono text-xs text-gray-100">Март 2020 · № 2020-3DMOD-0206</p>
                <p className="font-body text-xs text-gray-100">3D сканиране, моделиране, добавена/виртуална реалност.</p>
              </div>
            </section>

            {/* Additional info */}
            <section>
              <h2 className="font-display text-base tracking-widest text-white border-b border-primary pb-2 mb-3">
                ДОПЪЛНИТЕЛНА ИНФОРМАЦИЯ
              </h2>
              <ul className="space-y-1">
                {[
                  "Практически опит с биомедицинско инженерство и миоелектрически устройства",
                  "Тестване и валидация на hardware в реални условия",
                  "Четене на електронни схеми, datasheet-ове и техническа документация",
                  "Debugging на embedded системи с осцилоскоп и логически анализатор",
                  "Готовност за обучение в индустриална електротехника",
                ].map((item, i) => (
                  <li key={i} className="font-body text-xs text-gray-100 pl-2 border-l border-primary">▸ {item}</li>
                ))}
              </ul>
            </section>
      </div>

          {/* Sidebar: Contact, Skills, Languages, Interests */}
      <div className="space-y-4">
            <section>
              <h2 className="font-display text-sm tracking-widest text-red-400 border-b border-border pb-1 mb-2">
                КОНТАКТИ
              </h2>
              <ul className="space-y-1.5 font-body text-sm text-gray-100">
                <li>+359 884 823 842</li>
                <li><a href="mailto:pavkamoinov@abv.bg" className="text-red-400 hover:underline">pavkamoinov@abv.bg</a></li>
                <li><a href="https://simracingacademy.eu" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">simracingacademy.eu</a></li>
                <li><a href="https://github.com/pavkata12" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">GitHub</a></li>
                <li>Плевен, България</li>
              </ul>
            </section>
            <section>
              <h2 className="font-display text-sm tracking-widest text-red-400 border-b border-border pb-1 mb-2">
                КЛЮЧОВИ УМЕНИЯ
              </h2>
              <div className="space-y-2">
                {[
                  { name: "Embedded / Arduino/ESP32", pct: 90 },
                  { name: "3D моделиране", pct: 85 },
                  { name: "Python / C/C++", pct: 85 },
                  { name: "PCB & SMD", pct: 80 },
                  { name: "Vue.js / Node.js", pct: 75 },
                  { name: "Motor Control", pct: 80 },
                ].map((s) => (
                  <div key={s.name}>
                    <p className="font-mono text-xs text-white">{s.name}</p>
                    <div className="h-1 bg-secondary overflow-hidden mt-0.5">
                      <div className="h-full bg-primary transition-all" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="font-display text-sm tracking-widest text-red-400 border-b border-border pb-1 mb-2">
                ЕЗИЦИ
              </h2>
              <p className="font-mono text-xs text-white">Български · Роден</p>
              <p className="font-mono text-xs text-gray-100">Английски · Работно ниво (техн. документация)</p>
            </section>
            <section>
              <h2 className="font-display text-sm tracking-widest text-red-400 border-b border-border pb-1 mb-2">
                ИНТЕРЕСИ
        </h2>
              <div className="flex flex-wrap gap-1.5">
                {["Електроника", "Роботика", "3D принтиране", "Програмиране", "Автоматизация"].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 border border-border text-xs font-mono text-gray-100">
                    {tag}
            </span>
                ))}
              </div>
            </section>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BeginningTab;
