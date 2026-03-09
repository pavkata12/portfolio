import { Link } from "react-router-dom";
import { Phone, Mail, Github, ArrowLeft } from "lucide-react";
import { siteConfig, githubUrl } from "@/config/site";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col app-root">
      <video
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none -z-10"
        aria-hidden
      />
      <div className="fixed inset-0 -z-10 bg-black/40" aria-hidden />

      <header className="h-10 bg-black/50 backdrop-blur-sm border-b border-border/80 flex items-center px-4 shrink-0 pt-[env(safe-area-inset-top)]">
        <span className="font-display text-[10px] tracking-widest text-gray-200">CONTACT</span>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-md border border-primary bg-black/60 backdrop-blur-md shadow-xl shadow-black/40">
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
            <h1 className="font-display text-lg tracking-wider text-primary border-b border-primary/40 pb-3">
              OPEN FOR HIRE
            </h1>
            <p className="font-body text-sm text-gray-300">
              Свържи се с мен по някой от начините по-долу.
            </p>

            <div className="space-y-4">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 w-full border border-border hover:border-primary/60 bg-black/30 px-4 py-3 transition-colors group"
              >
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                  {siteConfig.phone}
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 w-full border border-border hover:border-primary/60 bg-black/30 px-4 py-3 min-h-[48px] transition-colors group touch-manipulation"
              >
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  {siteConfig.email}
                </span>
              </a>
              <a
                href={githubUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full border border-border hover:border-primary/60 bg-black/30 px-4 py-3 min-h-[48px] transition-colors group touch-manipulation"
              >
                <Github className="w-5 h-5 text-primary shrink-0" />
                <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                  github.com/{siteConfig.githubUsername}
                </span>
              </a>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-xs tracking-wider text-primary hover:text-primary/80 border border-primary/60 hover:border-primary px-4 py-3 min-h-[44px] transition-colors mt-4 touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to portfolio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
