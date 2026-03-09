import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { siteConfig } from "@/config/site";

type CorporateHeaderProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenProfile?: () => void;
};

const navItems = [
  { id: "beginning", label: "About" },
  { id: "achievements", label: "Achievements" },
  { id: "creations", label: "Projects" },
];

const CorporateHeader = ({ activeTab, onTabChange, onOpenProfile }: CorporateHeaderProps) => {
  const { toggleCyberfication } = useTheme();
  return (
    <header className="h-14 shrink-0 bg-slate-800/95 backdrop-blur border-b border-slate-700 flex items-center justify-between px-4 sm:px-6 safe-area-top">
      <Link to="/" className="text-slate-100 font-semibold text-lg tracking-tight hover:text-white transition-colors">
        {siteConfig.name}
      </Link>
      <nav className="hidden sm:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={`text-sm font-medium transition-colors ${
              activeTab === item.id ? "text-sky-400" : "text-slate-300 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
        <Link to="/contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Contact
        </Link>
        <button type="button" onClick={toggleCyberfication} className="text-sm font-medium text-slate-500 hover:text-sky-400 transition-colors">
          Cyber style
        </button>
      </nav>
      <div className="flex items-center gap-1">
        <Link
          to="/contact"
          className="sm:hidden text-sm font-medium text-slate-300 hover:text-white min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 touch-manipulation cursor-pointer"
        >
          Contact
        </Link>
        <button
          type="button"
          onClick={toggleCyberfication}
          className="sm:hidden text-sm text-slate-500 hover:text-sky-400 min-h-[44px] min-w-[44px] flex items-center justify-center px-4 touch-manipulation cursor-pointer"
        >
          Cyber
        </button>
        {onOpenProfile && (
          <button
            type="button"
            onClick={onOpenProfile}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 md:hidden touch-manipulation cursor-pointer"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};

export default CorporateHeader;
