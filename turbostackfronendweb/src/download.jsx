import React, { useEffect, useRef, useState } from 'react';
import { 
  Zap, 
  Smartphone, 
  Monitor, 
  Globe, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Sun, 
  Moon 
} from 'lucide-react';

// Composant Helper d'animation au scroll
function AnimateOnScroll({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-10 scale-95'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function DownloadApp() {
  const [darkMode, setDarkMode] = useState(false);
  const canvasRef = useRef(null);

  // Animation interactive de la grille au survol du curseur
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    const gridSize = 36;
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);
      const radius = 180;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cellX = i * gridSize;
          const cellY = j * gridSize;
          const centerX = cellX + gridSize / 2;
          const centerY = cellY + gridSize / 2;

          const dist = Math.hypot(centerX - mouse.x, centerY - mouse.y);

          if (dist < radius) {
            const intensity = 1 - dist / radius;

            ctx.fillStyle = darkMode 
              ? `rgba(54, 143, 139, ${intensity * 0.35})`
              : `rgba(54, 143, 139, ${intensity * 0.25})`;
            ctx.fillRect(cellX + 1, cellY + 1, gridSize - 2, gridSize - 2);

            ctx.strokeStyle = darkMode
              ? `rgba(54, 143, 139, ${intensity * 0.8})`
              : `rgba(54, 143, 139, ${intensity * 0.6})`;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(cellX + 0.5, cellY + 0.5, gridSize - 1, gridSize - 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <div className={`min-h-screen font-sans selection:bg-[#368f8b]/20 selection:text-[#368f8b] relative transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f7f7f7] text-slate-800'
    }`}>
      
      {/* ------------------------------------------------------------- */}
      {/* EFFETS DE FOND & GRILLE DE LABORATOIRE                        */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${darkMode ? 'opacity-[0.12]' : 'opacity-[0.06]'}`} 
          style={{
            backgroundImage: `
              linear-gradient(to right, ${darkMode ? '#94a3b8' : '#3b3b58'} 1px, transparent 1px),
              linear-gradient(to bottom, ${darkMode ? '#94a3b8' : '#3b3b58'} 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
        />

        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-0 pointer-events-none"
        />

        <div className={`absolute top-0 bottom-0 left-1/2 w-[1px] ${darkMode ? 'bg-[#368f8b]/20' : 'bg-[#368f8b]/10'}`} />
        <div className={`absolute left-0 right-0 top-1/3 h-[1px] ${darkMode ? 'bg-[#368f8b]/20' : 'bg-[#368f8b]/10'}`} />

        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl ${darkMode ? 'bg-[#368f8b]/25' : 'bg-[#368f8b]/15'}`} />
        <div className={`absolute top-[45%] -left-32 w-[450px] h-[450px] rounded-full blur-3xl ${darkMode ? 'bg-indigo-900/20' : 'bg-[#3b3b58]/10'}`} />
        <div className={`absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full blur-3xl ${darkMode ? 'bg-emerald-500/15' : 'bg-emerald-400/10'}`} />
      </div>

      {/* 1. HEADER STICKY */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b px-6 lg:px-12 py-4 shadow-xs transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-900/80 border-slate-800/80' 
          : 'bg-white/90 border-slate-200/60'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#368f8b] to-emerald-400 flex items-center justify-center text-white shadow-md shadow-[#368f8b]/20">
              <Zap size={20} />
            </div>
            <span className={`font-extrabold text-xl tracking-tight ${darkMode ? 'text-white' : 'text-[#3b3b58]'}`}>
              TurboStack
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                darkMode 
                  ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title={darkMode ? "Mode Clair" : "Mode Sombre"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="#web-editor"
              className="text-sm font-semibold text-white bg-[#368f8b] hover:bg-[#2d7975] px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lancer le Web Editor</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* 2. EN-TÊTE PRINCIPAL */}
      <section className="relative z-10 pt-16 pb-12 max-w-5xl mx-auto px-6 text-center">
        <AnimateOnScroll delay={100}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#368f8b]/10 text-[#368f8b] text-xs font-semibold border border-[#368f8b]/20 mb-6">
            <Sparkles size={14} />
            <span>Multi-Platform Studio</span>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <h1 className={`text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4 ${
            darkMode ? 'text-white' : 'text-[#3b3b58]'
          }`}>
            Emportez <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#368f8b] to-emerald-400">TurboStack</span> partout avec vous
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <p className={`text-base leading-relaxed max-w-2xl mx-auto ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Développez vos projets directement depuis votre navigateur ou installez l'application native sur votre environnement Linux ou Android avec serveur Go embarqué.
          </p>
        </AnimateOnScroll>
      </section>

      {/* 3. GRILLE DES ACCÈS & TÉLÉCHARGEMENTS */}
      <section className="relative z-10 py-12 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

          {/* CARTE 1 : VERSION WEB */}
          <AnimateOnScroll delay={100} className="h-full">
            <div className={`backdrop-blur-sm border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 h-full relative ${
              darkMode 
                ? 'bg-slate-900/90 border-slate-800' 
                : 'bg-white/90 border-slate-200/80'
            }`}>
              <div>
                <div className="flex justify-center mb-6">
                  <span className="bg-[#3b3b58] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                    <Globe size={13} /> Instant Access
                  </span>
                </div>

                <div className={`w-20 h-20 mx-auto rounded-2xl mb-6 flex items-center justify-center ${
                  darkMode ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-[#3b3b58]'
                }`}>
                  <Globe size={32} />
                </div>

                <h3 className={`text-xl font-bold text-center mb-3 ${darkMode ? 'text-white' : 'text-[#3b3b58]'}`}>
                  Web Editor
                </h3>

                <p className={`text-xs text-center mb-6 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Accédez à l'éditeur complet directement en ligne depuis votre navigateur sans aucune installation.
                </p>

                <div className="space-y-2.5 mb-8">
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>Création visuelle d'API et bases de données</span>
                  </div>
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>Synchronisation directe et sauvegarde JSON</span>
                  </div>
                </div>
              </div>

              <a
                href="/editor"
                className="w-full bg-[#3b3b58] hover:bg-[#2e2e46] text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ouvrir l'éditeur Web</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </AnimateOnScroll>

          {/* CARTE 2 : DESKTOP LINUX (EN AVANT) */}
          <AnimateOnScroll delay={250} className="h-full">
            <div className={`border-2 border-[#368f8b] rounded-3xl p-8 shadow-2xl shadow-[#368f8b]/15 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 h-full relative ${
              darkMode ? 'bg-slate-900' : 'bg-white'
            }`}>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#368f8b] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                Recommandé Desktop
              </div>

              <div>
                <div className="flex justify-center mb-6">
                  <span className="bg-[#368f8b] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                    <Terminal size={13} /> High Performance
                  </span>
                </div>

                <div className={`w-20 h-20 mx-auto rounded-2xl mb-6 flex items-center justify-center text-[#368f8b] ${
                  darkMode ? 'bg-emerald-950/60' : 'bg-emerald-50'
                }`}>
                  <Monitor size={32} />
                </div>

                <h3 className={`text-xl font-bold text-center mb-3 ${darkMode ? 'text-white' : 'text-[#3b3b58]'}`}>
                  TurboStack Desktop
                </h3>

                <p className={`text-xs text-center mb-6 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Application wrapper Webview ultra-rapide avec serveur Go intégré pour Linux (Fedora, Manjaro, Ubuntu).
                </p>

                <div className="space-y-2.5 mb-8">
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>Moteur natif Go sans dépendances lourdes</span>
                  </div>
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>Exportation directe des sources locales</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href="/downloads/turbostack-desktop-x86_64.AppImage"
                  download
                  className="w-full bg-[#368f8b] hover:bg-[#2d7975] text-white text-xs font-bold py-3.5 rounded-xl shadow-lg shadow-[#368f8b]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={15} />
                  <span>Télécharger AppImage (64-bit)</span>
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          {/* CARTE 3 : TSMOBILE ANDROID APK */}
          <AnimateOnScroll delay={400} className="h-full">
            <div className={`backdrop-blur-sm border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 h-full relative ${
              darkMode 
                ? 'bg-slate-900/90 border-slate-800' 
                : 'bg-white/90 border-slate-200/80'
            }`}>
              <div>
                <div className="flex justify-center mb-6">
                  <span className="bg-[#368f8b] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                    <Smartphone size={13} /> Mobile Shell
                  </span>
                </div>

                <div className={`w-20 h-20 mx-auto rounded-2xl mb-6 flex items-center justify-center ${
                  darkMode ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-[#3b3b58]'
                }`}>
                  <Smartphone size={32} />
                </div>

                <h3 className={`text-xl font-bold text-center mb-3 ${darkMode ? 'text-white' : 'text-[#3b3b58]'}`}>
                  TSMobile (Android)
                </h3>

                <p className={`text-xs text-center mb-6 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Application mobile Android enveloppant le serveur Go natif et l'interface Webview avec SQLite local.
                </p>

                <div className="space-y-2.5 mb-8">
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>Mode 100% hors-ligne (Offline First)</span>
                  </div>
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>Base de données SQLite locale embarquée</span>
                  </div>
                </div>
              </div>

              <a
                href="/downloads/tsmobile-v1.0.apk"
                download
                className="w-full bg-[#3b3b58] hover:bg-[#2e2e46] text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={15} />
                <span>Télécharger l'APK Android</span>
              </a>
            </div>
          </AnimateOnScroll>

        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className={`relative z-10 text-white pt-12 pb-8 px-6 lg:px-12 border-t transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#368f8b] border-emerald-600/30'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-emerald-300" />
            <span className="font-bold">TurboStack Ecosystem</span>
          </div>
          <p className="text-emerald-100/70 text-[11px]">
            Copyright © 2026 TurboStack. Tous droits réservés.
          </p>
        </div>
      </footer>

    </div>
  );
}