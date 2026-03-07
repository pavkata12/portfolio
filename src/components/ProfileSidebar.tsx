import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const LOAD_STEP_MS = 35;
const LOAD_STEP = 0.5;
const HOLD_AT_100_MS = 800;
const HIGHLIGHT_DURATION_MS = 900;

type ProfileSidebarProps = { drawer?: boolean };

const ProfileSidebar = ({ drawer }: ProfileSidebarProps) => {
  const { isCyber } = useTheme();
  const [loadProgress, setLoadProgress] = useState(0);
  const [highlightOpenForHire, setHighlightOpenForHire] = useState(false);
  const profileImage = isCyber ? "/profile.jpg" : "/profile-corporate.png";

  useEffect(() => {
    let progress = 0;
    let holding = false;
    let holdTimeout: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      if (holding) return;
      progress += LOAD_STEP;
      if (progress >= 100) {
        progress = 100;
        setLoadProgress(100);
        setHighlightOpenForHire(true);
        holding = true;
        setTimeout(() => setHighlightOpenForHire(false), HIGHLIGHT_DURATION_MS);
        holdTimeout = setTimeout(() => {
          progress = 0;
          setLoadProgress(0);
          holding = false;
        }, HOLD_AT_100_MS);
      } else {
        setLoadProgress(progress);
      }
    }, LOAD_STEP_MS);
    return () => {
      clearInterval(id);
      clearTimeout(holdTimeout);
    };
  }, []);

  if (!isCyber) {
    return (
      <aside className={`${drawer ? "w-full" : "w-56 shrink-0"} border-r border-slate-700 flex flex-col overflow-y-auto bg-slate-800/80 backdrop-blur-sm`}>
        <div className="p-6">
          <div className="rounded-full overflow-hidden border-2 border-slate-600 w-32 h-32 mx-auto">
            <img
              src={profileImage}
              alt="Pavlin Moinov"
              className="w-full h-full object-cover"
              onError={(e) => {
                if (profileImage !== "/profile.jpg") e.currentTarget.src = "/profile.jpg";
              }}
            />
          </div>
          <h2 className="mt-4 text-center text-slate-100 font-semibold text-lg">Pavlin Moinov</h2>
          <p className="text-center text-sky-400 text-sm">Web Developer</p>
        </div>
        <div className="px-4 pb-4 space-y-4 flex-1">
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Contact</h3>
            <ul className="text-sm text-slate-300 space-y-1">
              <li><a href="tel:+359884823842" className="hover:text-sky-400 transition-colors">+359 884 823 842</a></li>
              <li><a href="mailto:pavkamoinov69@gmail.com" className="hover:text-sky-400 transition-colors truncate block">pavkamoinov69@gmail.com</a></li>
              <li><a href="https://github.com/pavkata12" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Skills</h3>
            <p className="text-sm text-slate-300">Vue.js, Node.js, Python, React, TypeScript, SQLite, PWA</p>
          </div>
          <a
            href="/contact"
            className="block w-full py-2.5 text-center text-sm font-medium text-sky-400 border border-sky-500/50 rounded-lg hover:bg-sky-500/10 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`${drawer ? "w-full" : "w-56 shrink-0"} border-r border-border/80 flex flex-col overflow-y-auto bg-black/40 backdrop-blur-sm`}>
      <div className="p-4">
        <div className="border border-primary overflow-hidden">
          <img
            src={profileImage}
            alt="Pavlin Moinov"
            className="w-full aspect-square object-cover"
            onError={(e) => {
              if (profileImage !== "/profile.jpg") e.currentTarget.src = "/profile.jpg";
            }}
          />
        </div>
      </div>
      <div className="px-4 space-y-4 flex-1">
        <ProfileField label="name" value="PAVLIN MOINOV" />
        <ProfileField label="occupation" value="WEB DEVELOPER" />
        <ProfileField label="corporation" value="FREELANCE" />
        <div className="space-y-1">
          <span className="font-mono text-[9px] text-gray-200 tracking-widest">availability</span>
          <a
            href="/contact"
            className={`w-full border px-3 py-1.5 flex items-center justify-between transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              highlightOpenForHire
                ? "border-primary bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.5)] ring-2 ring-primary/60"
                : "border-primary bg-primary/10 hover:opacity-90"
            }`}
          >
            <span className="font-display text-[10px] tracking-wider text-primary">OPEN FOR HIRE</span>
            <span className="text-primary text-xs">⬡</span>
          </a>
          <div className="mt-2 pt-2 border-t border-border/60">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-display text-[9px] tracking-wider text-primary font-bold">Loading ..</span>
              <span className="font-display text-[9px] tracking-wider text-primary font-bold">{Math.round(loadProgress)}%</span>
            </div>
            <div className="border border-primary h-2 overflow-hidden bg-primary/20">
              <div className="h-full bg-primary transition-[width] duration-150 ease-linear" style={{ width: `${Math.min(100, loadProgress)}%` }} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-border mt-4">
        <span className="font-mono text-[9px] text-gray-200 tracking-widest">Motto</span>
        <p className="font-body text-xs text-gray-200 mt-1 leading-relaxed">Build things that matter.</p>
      </div>
    </aside>
  );
};

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <span className="font-mono text-[9px] text-gray-200 tracking-widest">{label}</span>
    <p className="font-display text-xs tracking-wider text-primary">{value}</p>
  </div>
);

export default ProfileSidebar;
