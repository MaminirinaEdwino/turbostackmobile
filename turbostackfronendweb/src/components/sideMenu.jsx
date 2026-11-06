import { useTranslation } from "../i18n";
import {
  LayoutDashboard,
  CreditCard,
  Database,
  Settings,
  Folder,
  SidebarClose,
  SidebarOpen,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  Layout,
  Globe,
  Cpu,
  PanelsTopLeft,
  SendToBack,
  ImageIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setToggleMenuSide } from "../appSlice";
import logo from "../assets/logotransparent.png";
import { GoApp } from "../services/bridge";

export default function SideMenu() {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const toggleMenu = useSelector((state) => state.app.toggleMenuSide);
  const actualWindow = useSelector((state) => state.app.actualWindow);
  const actualProject = useSelector((state) => state.app.actualProject);
  
  const [editorExpanded, setEditorExpanded] = useState(false);
  const [subItems, setSubItems] = useState([
    {
      name: "db_editor",
      icon: <Database size={18} />,
      label: "DB Editor"
    },
    {
      name: "api_editor",
      icon: <Settings size={18} />,
      label: "API Editor",
    },
    {
      name: "page_editor",
      icon: <LayoutDashboard size={18} />,
      label: "Page Editor",
    },
  ]);

  const [projectMenu, setProjectMenu] = useState([
    { name: "Models", icon: <Database size={18} /> },
    { name: "Web App", icon: <Layout size={18} /> },
    { name: "Static Site", icon: <Globe size={18} /> },
    { name: "Api", icon: <Settings size={18} /> },
    { name: "Files", icon: <Folder size={18} /> },
    { name: "Export", icon: <SendToBack size={18} /> },
    { name: 'Assets', icon: <ImageIcon size={18} /> },
  ]);

  let menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Project", icon: <Folder size={18} /> },
    { name: "Subscription", icon: <CreditCard size={18} /> },
  ];

  useEffect(() => {
    const loadProject = async () => {
      const res = await GoApp.fetchProjectByName(actualProject);
      if (res) {
        if (res.type === "api") {
          setSubItems([
            {
              name: "db_editor",
              icon: <Database size={18} />,
              label: "DB Editor"
            },
            {
              name: "api_editor",
              icon: <Settings size={18} />,
              label: "API Editor",
            }
          ]);
          setProjectMenu([
            { name: "Models", icon: <Database size={18} /> },
            { name: "Api", icon: <Settings size={18} /> },
            { name: "Files", icon: <Folder size={18} /> },
            { name: "Export", icon: <SendToBack size={18} /> },
          ]);
        } else if (res.type === "bdd") {
          setSubItems([
            {
              name: "db_editor",
              icon: <Database size={18} />,
              label: "DB Editor"
            }
          ]);
          setProjectMenu([
            { name: "Models", icon: <Database size={18} /> },
            { name: "Files", icon: <Folder size={18} /> },
            { name: "Export", icon: <SendToBack size={18} /> },
          ]);
        } else if (res.type === "static") {
          if (res.rest_api != null) {
            setSubItems([
              {
                name: "page_editor",
                icon: <LayoutDashboard size={18} />,
                label: "Page Editor",
              }, 
            ]);
            setProjectMenu([
              { name: "Static Site", icon: <Globe size={18} /> },
              { name: "Files", icon: <Folder size={18} /> },
              { name: "Export", icon: <SendToBack size={18} /> },
              { name: 'Assets', icon: <ImageIcon size={18} /> },
            ]);
          } else {
            setSubItems([
              {
                name: "page_editor",
                icon: <LayoutDashboard size={18} />,
                label: "Page Editor",
              }
            ]);
            setProjectMenu([
              { name: "Static Site", icon: <Globe size={18} /> },
              { name: "Files", icon: <Folder size={18} /> },
              { name: "Export", icon: <SendToBack size={18} /> },
              { name: 'Assets', icon: <ImageIcon size={18} /> },
            ]);
          }
        }
      }
    };
    loadProject();
  }, [actualProject]);

  if (actualProject) {
    menuItems.splice(2, 0, {
      name: "Workspace",
      icon: <PanelsTopLeft size={18} />,
      label: "Workspace",
      isDropdown: true,
      subItems: subItems,
    });
    menuItems.push(...projectMenu);
  }

  const handleToggleMenu = (e) => {
    e.preventDefault();
    dispatch(setToggleMenuSide());
  };

  const handleNavClick = (name) => {
    navigateTo(name);
    // Fermer le menu sur mobile après le clic
    if (window.innerWidth < 768 && toggleMenu) {
      dispatch(setToggleMenuSide());
    }
  };

  return (
    <>
      {/* Bouton Hamburger Flottant sur Mobile lorsque le menu est fermé */}
      <button
        onClick={handleToggleMenu}
        className="md:hidden fixed top-3 right-3 z-40 p-2.5 bg-white dark:bg-gray-900 text-couleur1 dark:text-white rounded-xl shadow-md border border-couleur1/10 dark:border-white/10 active:scale-95 transition-all"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Backdrop sombre sur mobile quand le menu est ouvert */}
      {toggleMenu && (
        <div
          onClick={handleToggleMenu}
          className="md:hidden fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar principale */}
      <aside
        className={`flex flex-col p-3 dark:bg-gray-950 bg-white transition-all duration-300 ease-in-out border-r border-couleur1/10 dark:border-white/10 h-screen z-50
          /* Styles Mobile: Tiroir coulissant caché à 100% si replié */
          fixed md:relative inset-y-0 left-0
          ${toggleMenu ? "translate-x-0 w-64 md:w-56" : "-translate-x-full md:translate-x-0 md:w-16"}
        `}
      >
        {/* En-tête de la Sidebar */}
        <div className="flex items-center justify-between mb-6 overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 shrink-0">
              <img src={logo} alt="TurboStack" className="w-full h-full object-contain" />
            </div>
            <span
              className={`text-xl font-bold text-couleur1 dark:text-white transition-all duration-300 ${
                toggleMenu ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
              }`}
            >
              TurboStack
            </span>
          </div>

          {/* Bouton fermeture / repliement */}
          <button
            onClick={handleToggleMenu}
            className="p-1.5 rounded-lg cursor-pointer transition-all hover:bg-couleur1/10 text-couleur1 dark:text-white shrink-0"
          >
            {toggleMenu ? (
              <SidebarClose size={20} />
            ) : (
              <SidebarOpen size={20} className="hidden md:block" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidemenu flex-1 space-y-1.5 overflow-y-auto pr-1">
          {menuItems.map((item) => {
            const isSubActive = item.subItems?.some(
              (sub) => actualWindow === sub.name
            );
            const isActive =
              actualWindow === item.name ||
              isSubActive ||
              (item.name === "Project" &&
                ["New Project", "Project Home Page"].includes(actualWindow));

            if (item.isDropdown) {
              return (
                <div
                  key={item.name}
                  className="flex flex-col gap-1"
                  onMouseEnter={() => !toggleMenu && window.innerWidth >= 768 && setEditorExpanded(true)}
                  onMouseLeave={() => !toggleMenu && window.innerWidth >= 768 && setEditorExpanded(false)}
                >
                  <div
                    className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all overflow-hidden whitespace-nowrap
                      ${
                        isActive
                          ? "bg-couleur1 text-couleur3 border-couleur1 shadow-xs"
                          : "border-couleur7 text-couleur1 dark:text-gray-300 hover:bg-couleur1/10 hover:text-couleur1"
                      }`}
                    onClick={() =>
                      toggleMenu ? setEditorExpanded(!editorExpanded) : null
                    }
                  >
                    <div className="shrink-0">{item.icon}</div>
                    <div
                      className={`flex-1 flex items-center justify-between transition-all duration-300 ${
                        toggleMenu
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4 pointer-events-none"
                      }`}
                    >
                      <span className="font-medium text-sm">
                        {t(item.label || item.name)}
                      </span>
                      {editorExpanded || isSubActive ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </div>
                  </div>

                  {/* Sous-menu ouvert */}
                  {toggleMenu && (editorExpanded || isSubActive) && (
                    <div className="flex flex-col gap-1 ml-4 pl-3 border-l-2 border-couleur1/15 transition-all">
                      {item.subItems.map((sub) => (
                        <div
                          key={sub.name}
                          className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer text-xs font-medium transition-all
                            ${
                              actualWindow === sub.name
                                ? "bg-couleur1 text-couleur3"
                                : "text-couleur1/70 dark:text-gray-400 hover:bg-couleur1/5 hover:text-couleur1"
                            }`}
                          onClick={() => handleNavClick(sub.name)}
                        >
                          {sub.icon}
                          <span>{t(sub.label)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Popover flottant bureau replié */}
                  {!toggleMenu && editorExpanded && (
                    <div className="hidden md:flex fixed left-20 bg-white dark:bg-gray-900 border border-couleur1/10 dark:border-white/10 rounded-xl shadow-2xl p-2 flex-col gap-1 z-50">
                      {item.subItems.map((sub) => (
                        <div
                          key={sub.name}
                          className={`flex items-center gap-3 p-2 px-3.5 rounded-lg cursor-pointer text-xs font-medium whitespace-nowrap transition-all
                            ${
                              actualWindow === sub.name
                                ? "bg-couleur1 text-white"
                                : "text-couleur1 dark:text-gray-200 hover:bg-couleur3 dark:hover:bg-gray-800"
                            }`}
                          onClick={() => handleNavClick(sub.name)}
                        >
                          {sub.icon}
                          <span>{t(sub.label)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div
                key={item.name}
                className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all overflow-hidden whitespace-nowrap
                  ${
                    isActive
                      ? "bg-couleur1 text-couleur3 border-couleur1 shadow-xs"
                      : "border-couleur7 text-couleur1 dark:text-gray-300 hover:bg-couleur1/10 hover:text-couleur1"
                  }`}
                onClick={() => handleNavClick(item.name)}
              >
                <div className="shrink-0">{item.icon}</div>
                <span
                  className={`font-medium text-sm transition-all duration-300 ${
                    toggleMenu
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4 pointer-events-none"
                  }`}
                >
                  {t(item.label || item.name)}
                </span>
              </div>
            );
          })}

          <button
            className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all overflow-hidden whitespace-nowrap w-full bg-couleur1 text-couleur3 border-couleur1 shadow-xs mt-4 active:scale-98"
            onClick={() => {
              GoApp.logout();
              handleNavClick("login");
            }}
          >
            <LogOut size={16} className="shrink-0" />
            <span
              className={`font-medium text-sm transition-all duration-300 ${
                toggleMenu
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4 pointer-events-none"
              }`}
            >
              LogOut
            </span>
          </button>
        </nav>
      </aside>
    </>
  );
}