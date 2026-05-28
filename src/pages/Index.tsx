import { useState } from "react";
import { X } from "lucide-react";
import HudTopBar from "@/components/HudTopBar";
import CorporateHeader from "@/components/CorporateHeader";
import ProfileSidebar from "@/components/ProfileSidebar";
import QuestSidebar from "@/components/QuestSidebar";
import BottomTabNav from "@/components/BottomTabNav";
import BeginningTab from "@/components/tabs/BeginningTab";
import AchievementsTab from "@/components/tabs/AchievementsTab";
import CreationsTab from "@/components/tabs/CreationsTab";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("beginning");
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [questDrawerOpen, setQuestDrawerOpen] = useState(false);
  const { isCyber } = useTheme();

  const renderTab = () => {
    switch (activeTab) {
      case "beginning": return <BeginningTab onTabChange={setActiveTab} />;
      case "achievements": return <AchievementsTab />;
      case "creations": return <CreationsTab />;
      default: return <BeginningTab />;
    }
  };

  return (
    <div
      className={`h-screen flex flex-col overflow-hidden overflow-x-hidden app-root ${!isCyber ? "theme-corporate" : ""}`}
      data-theme={isCyber ? "cyber" : "corporate"}
    >
      {/* Video background само в cyber режим */}
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
      {!isCyber && <div className="fixed inset-0 -z-10 bg-slate-900" aria-hidden />}

      {/* Top: Cyber HUD или Corporate minimal header */}
      {isCyber ? (
        <HudTopBar
          onOpenProfile={() => setProfileDrawerOpen(true)}
          onOpenQuest={() => setQuestDrawerOpen(true)}
        />
      ) : (
        <CorporateHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenProfile={() => setProfileDrawerOpen(true)}
        />
      )}

      {/* Main content area */}
      <div className={`flex-1 flex min-h-0 ${!isCyber ? "corporate-layout" : ""}`}>
        <div className="hidden md:flex">
          <ProfileSidebar />
        </div>
        <main className={`flex-1 overflow-y-auto overflow-x-hidden min-w-0 ${isCyber ? "px-3 sm:px-0" : "px-4 sm:px-6 lg:px-8"}`}>
          {renderTab()}
        </main>
        <div className="hidden lg:flex">
          <QuestSidebar />
        </div>
      </div>

      {/* Bottom: Cyber tabs или Corporate minimal tabs */}
      <BottomTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Mobile drawers: Profile (left) and Quest (right) */}
      {profileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true" aria-label="Profile">
          <button
            type="button"
            onClick={() => setProfileDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
            aria-hidden
          />
          <div className="relative w-[85vw] max-w-[320px] h-full flex flex-col bg-black/90 backdrop-blur-md border-r border-border/80 shadow-xl animate-slide-in-left">
            <div className="flex items-center justify-end p-2 border-b border-border/80 shrink-0">
              <button
                type="button"
                onClick={() => setProfileDrawerOpen(false)}
                className="p-2 rounded border border-border/80 text-foreground hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close profile"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              <ProfileSidebar drawer />
            </div>
          </div>
        </div>
      )}

      {questDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden justify-end" role="dialog" aria-modal="true" aria-label="Quest">
          <button
            type="button"
            onClick={() => setQuestDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
            aria-hidden
          />
          <div className="relative w-[85vw] max-w-[320px] h-full flex flex-col bg-black/90 backdrop-blur-md border-l border-border/80 shadow-xl animate-slide-in-right">
            <div className="flex items-center justify-end p-2 border-b border-border/80 shrink-0">
              <button
                type="button"
                onClick={() => setQuestDrawerOpen(false)}
                className="p-2 rounded border border-border/80 text-foreground hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close quest"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              <QuestSidebar drawer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
