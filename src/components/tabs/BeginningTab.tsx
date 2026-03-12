import { useTheme } from "@/contexts/ThemeContext";
import CyberHeroSection from "./beginning/CyberHeroSection";
import CorporateHeroSection from "./beginning/CorporateHeroSection";
import CvSection from "./beginning/CvSection";

const BeginningTab = ({ onTabChange }: { onTabChange?: (tab: string) => void }) => {
  const { isCyber } = useTheme();

  return (
    <div className={`animate-fade-in min-h-full relative ${!isCyber ? "corporate-content" : ""}`}>
      {isCyber ? (
        <CyberHeroSection onTabChange={onTabChange} />
      ) : (
        <CorporateHeroSection onTabChange={onTabChange} />
      )}
      <CvSection />
    </div>
  );
};

export default BeginningTab;
