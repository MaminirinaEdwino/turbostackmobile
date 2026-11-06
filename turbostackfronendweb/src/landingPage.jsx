import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Sun, 
  Moon, 
  Globe, 
  Download, 
  ExternalLink, 
  Smartphone, 
  Monitor 
} from 'lucide-react';

// Dictionnaire des traductions (Français / Anglais)
const translations = {
  fr: {
    navHome: "Accueil",
    navAbout: "À propos",
    navSub: "Tarifs",
    navDownload: "Télécharger",
    login: "Connexion",
    badgeHero: "Studio de Développement Full-Stack",
    heroTitle1: "Passez de l'idée au déploiement en",
    heroTitleHighlight: "un temps record",
    heroDesc: "Générez vos structures de sites web et d'applications avec des composants optimisés. Ne perdez plus de temps sur le code répétitif ; concentrez-vous sur ce qui rend votre projet unique.",
    tryBtn: "Essayer TurboStack",
    htmlCssBadge: "Go-Native & Pure Stack",
    noFramework: "Sans lourds frameworks",
    aboutTitle: "À propos de TurboStack",
    about1Title: "Architecture Rationalisée",
    about1Desc: "Pourquoi réécrire les mêmes contrôleurs et intégrer les mêmes formulaires pour chaque nouveau projet ? Notre interface intuitive vous permet d'assembler vos briques logiques et de générer du code propre et prêt à l'emploi.",
    about2Title: "Conçu pour les Développeurs Modernes",
    about2Desc: "Pensé par des développeurs pour des développeurs. Que vous utilisiez Go, React ou PHP, notre outil s'adapte à votre stack pour garantir une cohérence totale dans votre workflow.",
    subTitle: "Plans d'Abonnement",
    soloName: "Développeur Solo",
    soloDesc1: "Accès à tous les générateurs de base",
    soloDesc2: "Exportation de code standard (Go, PHP, JS)",
    soloBtn: "Essayer à 2€ / mois",
    creatorName: "Créateur Web",
    creatorBadge: "Le Plus Populaire",
    creatorDesc1: "Interface Glisser-Déposer simplifiée",
    creatorDesc2: "Modèles de pages optimisés pour la conversion",
    creatorBtn: "Essayer à 15€ / mois",
    powerName: "Power User",
    powerDesc1: "Tout ce qui est inclus dans le plan Développeur",
    powerDesc2: "Accès aux CLI avancées et scripts d'automatisation",
    powerBtn: "Essayer à 29€ / mois",
    ctaTitle: "Prêt à accélérer votre workflow ?",
    ctaBtn: "Créer un compte",
    footerDesc: "Rendez vos projets aussi rapides que l'éclair grâce à des générateurs de code propres.",
    linksTitle: "Liens Rapides",
    
    // Section Téléchargement / App
    dlStudioTitle: "Écosystème Multi-Plateforme",
    dlTitle1: "Emportez",
    dlTitleHighlight: "TurboStack",
    dlTitle2: "partout avec vous",
    dlDesc: "Développez vos projets directement depuis votre navigateur ou installez l'application native sur votre environnement Linux ou Android avec serveur Go embarqué.",
    webEditorTitle: "Éditeur Web",
    webEditorDesc: "Accédez à l'éditeur complet directement en ligne depuis votre navigateur sans aucune installation.",
    webEditorFeat1: "Création visuelle d'API et bases de données",
    webEditorFeat2: "Synchronisation directe et sauvegarde JSON",
    webEditorBtn: "Ouvrir l'éditeur Web",
    desktopTitle: "TurboStack Desktop",
    desktopBadge: "Recommandé Desktop",
    desktopDesc: "Application wrapper Webview ultra-rapide avec serveur Go intégré pour Linux (Fedora, Manjaro, Ubuntu).",
    desktopFeat1: "Moteur natif Go sans dépendances lourdes",
    desktopFeat2: "Exportation directe des sources locales",
    desktopBtn: "Télécharger AppImage (64-bit)",
    mobileTitle: "TSMobile (Android)",
    mobileDesc: "Application mobile Android enveloppant le serveur Go natif et l'interface Webview avec SQLite local.",
    mobileFeat1: "Mode 100% hors-ligne (Offline First)",
    mobileFeat2: "Base de données SQLite locale embarquée",
    mobileBtn: "Télécharger l'APK Android"
  },
  en: {
    navHome: "Home",
    navAbout: "About",
    navSub: "Subscription",
    navDownload: "Download",
    login: "Log In",
    badgeHero: "Full-Stack Development Studio",
    heroTitle1: "Go from idea to deployment in",
    heroTitleHighlight: "record time",
    heroDesc: "Generate your website and web application structures with optimized components. Stop wasting time on the boilerplate; focus on what makes your project unique.",
    tryBtn: "Try TurboStack",
    htmlCssBadge: "Go-Native & Pure Stack",
    noFramework: "Zero Heavy Frameworks",
    aboutTitle: "About TurboStack",
    about1Title: "Streamlined Architecture",
    about1Desc: "Why rewrite the same controllers and integrate the same forms for every new project? Our intuitive interface allows you to assemble your technological building blocks and generate clean, ready-to-use code.",
    about2Title: "Built for Modern Developers",
    about2Desc: "Designed by developers for developers. Whether you use Go, React, or PHP, our tool adapts to your stack to maintain complete consistency in your workflow.",
    subTitle: "Subscription Plans",
    soloName: "Solo Developer",
    soloDesc1: "Access to all base generators",
    soloDesc2: "Standard code export (Go, PHP, JS)",
    soloBtn: "Try for 2€ / month",
    creatorName: "Web Creator",
    creatorBadge: "Most Popular",
    creatorDesc1: "Simplified Drag & Drop Interface",
    creatorDesc2: "Conversion optimized and page templates",
    creatorBtn: "Try for 15€ / month",
    powerName: "Power User",
    powerDesc1: "Everything that's in the Developer plan",
    powerDesc2: "Access to advanced CLIs and automation scripts",
    powerBtn: "Try for 29€ / month",
    ctaTitle: "Ready to speed up your workflow?",
    ctaBtn: "Create an account",
    footerDesc: "Make your project as fast as lightning with clean code generators.",
    linksTitle: "Quick Links",

    // Section Téléchargement / App
    dlStudioTitle: "Multi-Platform Studio",
    dlTitle1: "Take",
    dlTitleHighlight: "TurboStack",
    dlTitle2: "everywhere with you",
    dlDesc: "Develop your projects directly from your browser or install the native app on your Linux or Android environment with an embedded Go server.",
    webEditorTitle: "Web Editor",
    webEditorDesc: "Access the full editor directly online from your browser without any installation.",
    webEditorFeat1: "Visual API & database creation",
    webEditorFeat2: "Direct synchronization and JSON backup",
    webEditorBtn: "Open Web Editor",
    desktopTitle: "TurboStack Desktop",
    desktopBadge: "Desktop Recommended",
    desktopDesc: "Ultra-fast Webview wrapper application with integrated Go server for Linux (Fedora, Manjaro, Ubuntu).",
    desktopFeat1: "Native Go engine without heavy dependencies",
    desktopFeat2: "Direct export of local source files",
    desktopBtn: "Download AppImage (64-bit)",
    mobileTitle: "TSMobile (Android)",
    mobileDesc: "Android mobile application wrapping the native Go server and Webview interface with local SQLite.",
    mobileFeat1: "100% offline mode (Offline First)",
    mobileFeat2: "Embedded local SQLite database",
    mobileBtn: "Download Android APK"
  }
};

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

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('fr'); // 'fr' ou 'en'
  const t = translations[lang];
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
    <div className={`min-h-screen font-sans selection:bg-[#368f8b]/20 selection:text-[#368f8b] relative transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f7f7f7] text-slate-800'
    }`}>
      
      {/* ------------------------------------------------------------- */}
      {/* EFFETS DE FOND & GRILLE INTERACTIVE                           */}
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

      {/* 1. BARRE DE NAVIGATION STICKY */}
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

          <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <a href="#home" className="hover:text-[#368f8b] transition-colors">{t.navHome}</a>
            <a href="#about" className="hover:text-[#368f8b] transition-colors">{t.navAbout}</a>
            <a href="#subscription" className="hover:text-[#368f8b] transition-colors">{t.navSub}</a>
            <a href="#downloads" className="hover:text-[#368f8b] transition-colors">{t.navDownload}</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* SÉLECTEUR DE LANGUE (FR / EN) */}
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

            {/* TOGGLE DARK MODE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                darkMode 
                  ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className={`hidden sm:block text-sm font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer ${
              darkMode 
                ? 'text-slate-200 hover:bg-slate-800' 
                : 'text-[#3b3b58] hover:bg-slate-100'
            }`}>
              {t.login}
            </button>
          </div>
        </div>
      </header>

      {/* 2. SECTION HERO */}
      <section id="home" className="relative z-10 pt-12 pb-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-center">
            <AnimateOnScroll delay={200} className="w-full">
              <div className="w-full relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#368f8b] via-emerald-400 to-[#3b3b58] rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500" />
                
                <div className={`relative w-full backdrop-blur-sm border rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center min-h-[320px] overflow-hidden transition-colors ${
                  darkMode 
                    ? 'bg-slate-900/90 border-slate-800' 
                    : 'bg-white/90 border-slate-200/80'
                }`}>
                  <div className="flex items-center gap-2 mb-6">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 ${
                      darkMode 
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50' 
                        : 'bg-emerald-50 text-[#368f8b] border-[#368f8b]/20'
                    }`}>
                      <Terminal size={14} /> {t.htmlCssBadge}
                    </span>
                  </div>
                  
                  <div className={`text-center font-black text-4xl lg:text-5xl tracking-widest drop-shadow-xs mb-2 ${
                    darkMode ? 'text-slate-200' : 'text-[#3b3b58]'
                  }`}>
                    HTML
                  </div>
                  <div className="text-center font-black text-4xl lg:text-5xl tracking-widest text-[#368f8b] drop-shadow-xs">
                    CSS
                  </div>

                  <div className="absolute right-4 bottom-4 bg-[#3b3b58] text-white p-3 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium border border-white/10">
                    <Code2 size={16} className="text-emerald-400" />
                    <span>{t.noFramework}</span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={400}>
              <button className="mt-8 group flex items-center gap-2 bg-[#368f8b] hover:bg-[#2d7975] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-[#368f8b]/25 hover:shadow-xl hover:shadow-[#368f8b]/35 transition-all transform hover:-translate-y-0.5 cursor-pointer">
                <span>{t.tryBtn}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </AnimateOnScroll>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-center lg:text-left">
            <AnimateOnScroll delay={100}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#368f8b]/10 text-[#368f8b] text-xs font-semibold border border-[#368f8b]/20">
                <Sparkles size={14} />
                <span>{t.badgeHero}</span>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <h1 className={`text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight ${
                darkMode ? 'text-white' : 'text-[#3b3b58]'
              }`}>
                {t.heroTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#368f8b] to-emerald-400">{t.heroTitleHighlight}</span>
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <p className={`text-base leading-relaxed max-w-xl mx-auto lg:mx-0 ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {t.heroDesc}
              </p>
            </AnimateOnScroll>
          </div>

        </div>
      </section>

      {/* 3. SECTION ABOUT TURBOSTACK */}
      <section id="about" className="relative z-10 py-20 max-w-6xl mx-auto px-6">
        
        <AnimateOnScroll className="relative mb-16 text-center">
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-[#368f8b]/10 via-[#368f8b]/20 to-[#368f8b]/10 border border-[#368f8b]/30 rounded-2xl backdrop-blur-xs shadow-xs">
            <h2 className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#3b3b58]'}`}>
              {t.aboutTitle}
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <AnimateOnScroll delay={100}>
              <div className={`backdrop-blur-sm border rounded-2xl p-6 h-64 flex items-center justify-center shadow-md hover:shadow-lg transition-all relative overflow-hidden group ${
                darkMode 
                  ? 'bg-slate-900/80 border-slate-800' 
                  : 'bg-white/80 border-slate-200/80'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#368f8b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`w-full h-full rounded-xl border border-dashed flex flex-col items-center justify-center text-[#368f8b] gap-2 p-4 text-center ${
                  darkMode ? 'bg-slate-950/50 border-[#368f8b]/30' : 'bg-emerald-50/60 border-[#368f8b]/40'
                }`}>
                  <Layers size={36} />
                  <span className="text-xs font-semibold">Visual Database & API Modeling</span>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={250} className="space-y-4">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#3b3b58]'}`}>
                {t.about1Title}
              </h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.about1Desc}
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <AnimateOnScroll delay={100} className="order-2 md:order-1 space-y-4">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#3b3b58]'}`}>
                {t.about2Title}
              </h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.about2Desc}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={250} className="order-1 md:order-2">
              <div className={`backdrop-blur-sm border rounded-2xl p-6 h-64 flex items-center justify-center shadow-md hover:shadow-lg transition-all relative overflow-hidden group ${
                darkMode 
                  ? 'bg-slate-900/80 border-slate-800' 
                  : 'bg-white/80 border-slate-200/80'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b3b58]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`w-full h-full rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 p-4 text-center ${
                  darkMode 
                    ? 'bg-slate-950/50 border-slate-700 text-emerald-400' 
                    : 'bg-slate-50 border-slate-300 text-[#3b3b58]'
                }`}>
                  <Cpu size={36} />
                  <span className="text-xs font-semibold">Native Standard-Library Export</span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 4. SECTION SUBSCRIPTION */}
      <section id="subscription" className="relative z-10 py-20 max-w-6xl mx-auto px-6">
        
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-[#368f8b]/10 via-[#368f8b]/20 to-[#368f8b]/10 border border-[#368f8b]/30 rounded-2xl backdrop-blur-xs shadow-xs">
            <h2 className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#3b3b58]'}`}>
              {t.subTitle}
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Carte 1 : Solo */}
          <AnimateOnScroll delay={100} className="h-full">
            <div className={`backdrop-blur-sm border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 h-full relative ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
            }`}>
              <div>
                <div className="flex justify-center mb-6">
                  <span className="bg-[#368f8b] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    {t.soloName}
                  </span>
                </div>
                <div className={`w-20 h-20 mx-auto rounded-2xl mb-6 flex items-center justify-center ${
                  darkMode ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-[#3b3b58]'
                }`}>
                  <Code2 size={28} />
                </div>
                <div className="space-y-3 mb-8">
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.soloDesc1}</span>
                  </div>
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.soloDesc2}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#3b3b58] hover:bg-[#2e2e46] text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition-all cursor-pointer">
                {t.soloBtn}
              </button>
            </div>
          </AnimateOnScroll>

          {/* Carte 2 : Creator */}
          <AnimateOnScroll delay={250} className="h-full">
            <div className={`border-2 border-[#368f8b] rounded-3xl p-8 shadow-2xl shadow-[#368f8b]/15 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 h-full relative ${
              darkMode ? 'bg-slate-900' : 'bg-white'
            }`}>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#368f8b] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                {t.creatorBadge}
              </div>
              <div>
                <div className="flex justify-center mb-6">
                  <span className="bg-[#368f8b] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    {t.creatorName}
                  </span>
                </div>
                <div className={`w-20 h-20 mx-auto rounded-2xl mb-6 flex items-center justify-center text-[#368f8b] ${
                  darkMode ? 'bg-emerald-950/60' : 'bg-emerald-50'
                }`}>
                  <Layers size={28} />
                </div>
                <div className="space-y-3 mb-8">
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.creatorDesc1}</span>
                  </div>
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.creatorDesc2}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#368f8b] hover:bg-[#2d7975] text-white text-xs font-bold py-3.5 rounded-xl shadow-lg shadow-[#368f8b]/25 transition-all cursor-pointer">
                {t.creatorBtn}
              </button>
            </div>
          </AnimateOnScroll>

          {/* Carte 3 : Power User */}
          <AnimateOnScroll delay={400} className="h-full">
            <div className={`backdrop-blur-sm border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 h-full relative ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
            }`}>
              <div>
                <div className="flex justify-center mb-6">
                  <span className="bg-[#368f8b] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    {t.powerName}
                  </span>
                </div>
                <div className={`w-20 h-20 mx-auto rounded-2xl mb-6 flex items-center justify-center ${
                  darkMode ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-[#3b3b58]'
                }`}>
                  <ShieldCheck size={28} />
                </div>
                <div className="space-y-3 mb-8">
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.powerDesc1}</span>
                  </div>
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.powerDesc2}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#3b3b58] hover:bg-[#2e2e46] text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition-all cursor-pointer">
                {t.powerBtn}
              </button>
            </div>
          </AnimateOnScroll>

        </div>
      </section>

      {/* 5. SECTION TÉLÉCHARGEMENT & ACCÈS APPS (WEB / DESKTOP / ANDROID) */}
      <section id="downloads" className="relative z-10 py-20 max-w-6xl mx-auto px-6">
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#368f8b]/10 text-[#368f8b] text-xs font-semibold border border-[#368f8b]/20 mb-4">
            <Sparkles size={14} />
            <span>{t.dlStudioTitle}</span>
          </div>
          <h2 className={`text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 ${darkMode ? 'text-white' : 'text-[#3b3b58]'}`}>
            {t.dlTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#368f8b] to-emerald-400">{t.dlTitleHighlight}</span> {t.dlTitle2}
          </h2>
          <p className={`text-sm max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.dlDesc}
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Web Editor */}
          <AnimateOnScroll delay={100} className="h-full">
            <div className={`backdrop-blur-sm border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 h-full relative ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
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
                  {t.webEditorTitle}
                </h3>
                <p className={`text-xs text-center mb-6 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.webEditorDesc}
                </p>
                <div className="space-y-2.5 mb-8">
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.webEditorFeat1}</span>
                  </div>
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.webEditorFeat2}</span>
                  </div>
                </div>
              </div>
              <a
                href="#editor"
                className="w-full bg-[#3b3b58] hover:bg-[#2e2e46] text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.webEditorBtn}</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </AnimateOnScroll>

          {/* Desktop Linux */}
          <AnimateOnScroll delay={250} className="h-full">
            <div className={`border-2 border-[#368f8b] rounded-3xl p-8 shadow-2xl shadow-[#368f8b]/15 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 h-full relative ${
              darkMode ? 'bg-slate-900' : 'bg-white'
            }`}>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#368f8b] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                {t.desktopBadge}
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
                  {t.desktopTitle}
                </h3>
                <p className={`text-xs text-center mb-6 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.desktopDesc}
                </p>
                <div className="space-y-2.5 mb-8">
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.desktopFeat1}</span>
                  </div>
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.desktopFeat2}</span>
                  </div>
                </div>
              </div>
              <a
                href="#download-desktop"
                download
                className="w-full bg-[#368f8b] hover:bg-[#2d7975] text-white text-xs font-bold py-3.5 rounded-xl shadow-lg shadow-[#368f8b]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={15} />
                <span>{t.desktopBtn}</span>
              </a>
            </div>
          </AnimateOnScroll>

          {/* Android APK */}
          <AnimateOnScroll delay={400} className="h-full">
            <div className={`backdrop-blur-sm border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 h-full relative ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
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
                  {t.mobileTitle}
                </h3>
                <p className={`text-xs text-center mb-6 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.mobileDesc}
                </p>
                <div className="space-y-2.5 mb-8">
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.mobileFeat1}</span>
                  </div>
                  <div className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 size={16} className="text-[#368f8b] shrink-0 mt-0.5" />
                    <span>{t.mobileFeat2}</span>
                  </div>
                </div>
              </div>
              <a
                href="#download-apk"
                download
                className="w-full bg-[#3b3b58] hover:bg-[#2e2e46] text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={15} />
                <span>{t.mobileBtn}</span>
              </a>
            </div>
          </AnimateOnScroll>

        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="relative z-10 py-10 max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="bg-gradient-to-br from-[#3b3b58] via-[#2d2d44] to-slate-900 rounded-3xl p-8 lg:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 border border-white/10">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#368f8b]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="w-full lg:w-1/2 h-56 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-emerald-300 text-xs font-semibold gap-3 backdrop-blur-xs relative z-10">
              <Zap size={40} className="text-[#368f8b]" />
              <span>TurboStack High-Speed Engine</span>
            </div>

            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 relative z-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
                {t.ctaTitle}
              </h2>
              <button className="bg-[#368f8b] hover:bg-[#2d7975] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-[#368f8b]/30 transition-all cursor-pointer hover:scale-105 active:scale-95">
                {t.ctaBtn}
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 7. FOOTER */}
      <footer className={`relative z-10 text-white pt-16 pb-8 px-6 lg:px-12 border-t transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#368f8b] border-emerald-600/30'
      }`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-emerald-300" />
              <h3 className="font-extrabold text-base tracking-tight">TurboStack</h3>
            </div>
            <p className="text-emerald-100/80 max-w-sm">
              {t.footerDesc}
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2.fi5">
            <span className="font-bold uppercase tracking-wider text-emerald-200 mb-1">{t.linksTitle}</span>
            <a href="#home" className="hover:text-emerald-200 transition-colors">{t.navHome}</a>
            <a href="#about" className="hover:text-emerald-200 transition-colors">{t.navAbout}</a>
            <a href="#subscription" className="hover:text-emerald-200 transition-colors">{t.navSub}</a>
            <a href="#downloads" className="hover:text-emerald-200 transition-colors">{t.navDownload}</a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-emerald-400/20 text-center text-[11px] text-emerald-100/60">
          Copyright © 2026 TurboStack. All rights reserved.
        </div>
      </footer>

    </div>
  );
}