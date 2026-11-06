import React, { useEffect, useRef } from 'react';
import { 
  Zap, 
  Home, 
  ArrowLeft, 
  Terminal, 
  Sparkles, 
  Sun, 
  Moon, 
  AlertTriangle 
} from 'lucide-react';

// Dictionnaire de traductions (FR / EN)
const translations = {
  fr: {
    navHome: "Accueil",
    navAbout: "À propos",
    navSub: "Tarifs",
    navDownload: "Télécharger",
    login: "Connexion",
    code404: "ERREUR 404",
    title: "Page introuvable dans la stack",
    desc: "Oups ! La route ou la ressource que vous recherchez n'existe pas ou a été déplacée. Vérifiez l'URL ou revenez à l'accueil.",
    btnHome: "Retourner à l'accueil",
    btnBack: "Page précédente",
    consoleBoxTitle: "TurboStack Routing Engine",
    consoleLog: "[404_NOT_FOUND] Route mismatch: path does not resolve to any active handler.",
  },
  en: {
    navHome: "Home",
    navAbout: "About",
    navSub: "Subscription",
    navDownload: "Download",
    login: "Log In",
    code404: "ERROR 404",
    title: "Page not found in stack",
    desc: "Oops! The route or resource you are looking for does not exist or has been moved. Check the URL or return to the homepage.",
    btnHome: "Back to Home",
    btnBack: "Previous Page",
    consoleBoxTitle: "TurboStack Routing Engine",
    consoleLog: "[404_NOT_FOUND] Route mismatch: path does not resolve to any active handler.",
  }
};

export default function NotFoundPage({ darkMode = false, setDarkMode, lang = 'fr', setLang }) {
  const t = translations[lang] || translations.fr;
  const canvasRef = useRef(null);

  // Animation interactive de la grille au passage de la souris
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
    <div className={`min-h-screen font-sans selection:bg-[#368f8b]/20 selection:text-[#368f8b] relative flex flex-col justify-between transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f7f7f7] text-slate-800'
    }`}>
      
      {/* ------------------------------------------------------------- */}
      {/* EFFETS DE FOND, GRILLE DE LABORATOIRE ET BLOBS                */}
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

        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        <div className={`absolute top-0 bottom-0 left-1/2 w-[1px] ${darkMode ? 'bg-[#368f8b]/20' : 'bg-[#368f8b]/10'}`} />
        <div className={`absolute left-0 right-0 top-1/3 h-[1px] ${darkMode ? 'bg-[#368f8b]/20' : 'bg-[#368f8b]/10'}`} />

        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl ${darkMode ? 'bg-[#368f8b]/25' : 'bg-[#368f8b]/15'}`} />
        <div className={`absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full blur-3xl ${darkMode ? 'bg-emerald-500/15' : 'bg-emerald-400/10'}`} />
      </div>

      {/* 1. BARRE DE NAVIGATION STICKY */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b px-6 lg:px-12 py-4 shadow-xs transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/80 border-slate-800/80' : 'bg-white/90 border-slate-200/60'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#368f8b] to-emerald-400 flex items-center justify-center text-white shadow-md shadow-[#368f8b]/20">
              <Zap size={20} />
            </div>
            <span className={`font-extrabold text-xl tracking-tight ${darkMode ? 'text-white' : 'text-[#3b3b58]'}`}>
              TurboStack
            </span>
          </a>

          <div className="flex items-center gap-3">
            {/* SÉLECTEUR DE LANGUE (FR / EN) */}
            {setLang && (
              <div className={`flex items-center rounded-xl p-1 border text-xs font-semibold ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                <button
                  onClick={() => setLang('fr')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    lang === 'fr' ? 'bg-[#368f8b] text-white shadow-xs' : 'hover:text-[#368f8b]'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    lang === 'en' ? 'bg-[#368f8b] text-white shadow-xs' : 'hover:text-[#368f8b]'
                  }`}
                >
                  EN
                </button>
              </div>
            )}

            {/* TOGGLE DARK MODE */}
            {setDarkMode && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  darkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            <a
              href="/"
              className={`hidden sm:flex text-sm font-semibold px-4 py-2 rounded-xl transition-all items-center gap-2 ${
                darkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-[#3b3b58] hover:bg-slate-100'
              }`}
            >
              <Home size={16} />
              <span>{t.navHome}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. CONTENU PRINCIPAL 404 */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-16 px-6">
        <div className="max-w-3xl w-full text-center space-y-8">
          
          {/* Badge & Titre 404 */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-500 text-xs font-semibold border border-rose-500/20">
              <AlertTriangle size={15} />
              <span>{t.code404}</span>
            </div>

            <h1 className="text-7xl sm:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#368f8b] via-emerald-400 to-[#3b3b58]">
              404
            </h1>

            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-[#3b3b58]'
            }`}>
              {t.title}
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t.desc}
            </p>
          </div>

          {/* Console de débogage style TurboStack */}
          <div className={`mx-auto max-w-lg rounded-2xl border text-left font-mono text-xs overflow-hidden shadow-lg transition-colors ${
            darkMode 
              ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
              : 'bg-white/90 border-slate-200/80 text-slate-700'
          }`}>
            <div className={`px-4 py-2.5 border-b flex items-center justify-between ${
              darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100/80 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#368f8b]" />
                <span className="font-semibold text-[11px] tracking-wide text-[#368f8b]">
                  {t.consoleBoxTitle}
                </span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="p-4 space-y-1 text-[11px] leading-relaxed">
              <p className="text-rose-400 font-semibold">{t.consoleLog}</p>
              <p className="text-slate-400">// Status: HTTP 404 - Not Found</p>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/"
              className="w-full sm:w-auto bg-[#368f8b] hover:bg-[#2d7975] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-[#368f8b]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home size={18} />
              <span>{t.btnHome}</span>
            </a>

            <button
              onClick={() => window.history.back()}
              className={`w-full sm:w-auto font-semibold px-8 py-3.5 rounded-xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                darkMode
                  ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200'
                  : 'border-slate-200 bg-white hover:bg-slate-100 text-[#3b3b58]'
              }`}
            >
              <ArrowLeft size={18} />
              <span>{t.btnBack}</span>
            </button>
          </div>

        </div>
      </main>

      {/* 3. FOOTER COMPACT */}
      <footer className={`relative z-10 py-6 px-6 border-t transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#368f8b] border-emerald-600/30'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-emerald-300" />
            <span className="font-bold">TurboStack Engine</span>
          </div>
          <div className="text-[11px] text-emerald-100/70">
            Copyright © 2026 TurboStack. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}