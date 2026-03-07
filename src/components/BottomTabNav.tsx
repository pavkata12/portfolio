import { useTheme } from "@/contexts/ThemeContext";

interface BottomTabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "beginning", label: "BEGINNING", labelShort: "About" },
  { id: "achievements", label: "ACHIEVEMENTS", labelShort: "Achievements" },
  { id: "creations", label: "CREATIONS", labelShort: "Projects" },
];

const BottomTabNav = ({ activeTab, onTabChange }: BottomTabNavProps) => {
  const { isCyber } = useTheme();

  if (!isCyber) {
    return (
      <div
        className="sm:hidden h-14 flex items-stretch shrink-0 bg-slate-800/95 border-t border-slate-700"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? "true" : undefined}
              className={`flex-1 flex items-center justify-center text-sm font-medium border-b-2 min-h-[44px] touch-manipulation transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-inset ${
                isActive ? "text-sky-400 border-sky-400" : "text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              {tab.labelShort}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="h-14 sm:h-16 border-t border-border/80 flex items-stretch shrink-0 bg-black/40 backdrop-blur-sm"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            type="button"
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            aria-current={isActive ? "true" : undefined}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 sm:gap-1 border-r border-border last:border-r-0 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset min-h-[44px] touch-manipulation ${
              isActive
                ? "bg-primary/10 border-t-2 border-t-primary text-primary"
                : "hover:bg-secondary/50 active:bg-secondary/70"
            }`}
          >
            <span
              className={`font-display text-[8px] sm:text-[10px] tracking-widest text-center leading-tight px-1 ${
                isActive ? "text-primary" : "text-gray-200"
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <span className="font-mono text-[7px] sm:text-[8px] text-primary">✕</span>
            )}
            <p className="font-mono text-[9px] text-gray-200 max-w-[120px] text-center leading-tight hidden lg:block">
              {tab.id === "beginning" && "EXPLORE THE STARTING POINT AND OVERVIEW"}
              {tab.id === "achievements" && "TRACK MILESTONES AND ACCOMPLISHMENTS"}
              {tab.id === "creations" && "EXPLORE PROJECTS AND CREATIVE WORKS"}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default BottomTabNav;
