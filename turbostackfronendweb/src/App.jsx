import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./layouts/homepage/homePage";
import ProjectList from "./layouts/projects/projectList";
import ComponentsList from "./layouts/componantList/componantList";
import Assetslist from "./layouts/assets/assetsLists";
import APIlist from "./layouts/api/apiList";
import Pageslist from "./layouts/page/pagelist";
import BDDModelList from "./layouts/models/modelList";
import Subscription from "./pages/subscription";
import NewProject from "./layouts/projects/newProject";
import ProjectHomePage from "./layouts/projects/exportPage";
import DbEditor from "./layouts/projects/databaseEditor/dbEditor";
import ApiEditor from "./layouts/projects/endPointEditor/apiEditor";
import PageEditor from "./layouts/page/pageEditor/pageEditor";
import ControllerEditor from "./components/controllerEditor";
import logo from "./assets/logotransparent.png";
import FileExplorer from "./layouts/projects/fileExplorer";
import UnifiedEditor from "./layouts/projects/unifiedEditor";
import HelpDocumentation from "./helpComponent";
import { GoApp } from "./services/bridge";
import WorkspaceNavigationBar from "./components/workspaceNavigation";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/login";
import Register from "./components/register";
import { setActualWindow } from "./appSlice";
import LandingPage from "./landingPage";
import DownloadApp from "./download";
import NotFoundPage from "./notfound";
import { HelpCircle, Settings } from "lucide-react";
import LanguageToggle from "./components/languageToggle";
import DarkModeToggle from "./components/darkModeToggle";

function App() {
  const { isAuthenticated, authMode, setAuthMode, loginUser } = useAuth();
  const actualWindow = useSelector((state) => state.app.actualWindow);
  const actualProject = useSelector((state) => state.app.actualProject);
  const isDarkMode = useSelector((state) => state.app.darkMode);
  const [isAppReady, setIsAppReady] = useState(false);
  const dispatch = useDispatch()
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [setttingMenuState, setSettingMenuState] = useState(false)

  const windowList = [
    "api_editor",
    "page_editor",
    "db_editor",
    "Files",
    "Export"
  ]


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  useEffect(() => {
    const loadLibrairie = async () => {
      await GoApp.loadLibrairie()
    }
    loadLibrairie()
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (actualWindow) {
      case "Dashboard":
        return <HomePage />;
      case "Project":
        return <ProjectList />;
      case "Components":
        return <ComponentsList />;
      case "Assets":
        return <Assetslist />;
      case "Api":
        return <APIlist />;
      case "Static Site":
        return <Pageslist />;
      case "Web App":
        return <Pageslist />;
      case "Models":
        return <BDDModelList />;
      case "Subscription":
        return <Subscription />;
      case "New Project":
        return <NewProject />;
      case "Export":
        return <ProjectHomePage projectName={actualProject}></ProjectHomePage>;
      case "db_editor":
        return <DbEditor projectName={actualProject}></DbEditor>;
      case "api_editor":
        return <ApiEditor projectName={actualProject}></ApiEditor>;
      case "page_editor":
        return <PageEditor projectName={actualProject}></PageEditor>;
      case "controller_editor":
        return (
          <ControllerEditor projectName={actualProject}></ControllerEditor>
        );
      case "Files":
        return <FileExplorer projectName={actualProject}></FileExplorer>;
      case "unified_editor":
        return <UnifiedEditor projectName={actualProject}></UnifiedEditor>;
      case ("login"):
        if (isAuthenticated) {
          dispatch(setActualWindow("DashBoard"))
        }
        return (
          <>
            {authMode === "login" ? (
              <Login
                onLoginSuccess={() => loginUser()}
                onSwitchToRegister={() => setAuthMode("register")}
              />
            ) : (
              <Register
                onRegisterSuccess={() => setAuthMode("login")}
                onSwitchToLogin={() => setAuthMode("login")}
              />
            )}
          </>
        );
      default:
        return <HomePage />; // Fallback
    }
  };



  return (
    <>
      {!isAuthenticated ? <>
        {authMode === "login" ? (
          <Login
            onLoginSuccess={() => loginUser()}
            onSwitchToRegister={() => setAuthMode("register")}
          />
        ) : (
          <Register
            onRegisterSuccess={() => setAuthMode("login")}
            onSwitchToLogin={() => setAuthMode("login")}
          />
        )}
      </> : <>
        {!isAppReady ? <div className="flex h-screen w-screen flex-col items-center justify-center bg-couleur3 dark:bg-gray-950 transition-colors duration-300">
          <div className="flex flex-col items-center gap-4">
            <img src={logo} alt="" />
            <h1 className="text-xl font-black text-couleur1 tracking-[0.2em] uppercase animate-pulse">
              TurboStack
            </h1>
          </div>
        </div> : <>
          <div className={"fixed right-2 bottom-30 gap-1 flex flex-col items-end z-50"}>
            {setttingMenuState && (
              <div className="flex flex-col sm:flex-row items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out z-50">
                <LanguageToggle />
                <button
                  title="Help Section"
                  onClick={() => setIsDocOpen(true)}
                  className="z-50 p-3.5 bg-couleur1 text-white rounded-2xl shadow-sm hover:shadow-md hover:bg-opacity-90 transition-all duration-200 active:scale-95 flex items-center justify-center font-bold text-sm"
                >
                  <HelpCircle size={18} />
                </button>
                <DarkModeToggle />
              </div>
            )}
            <div className={"p-3 rounded-full border border-couleur1/50 " + (setttingMenuState ? "text-white bg-couleur1" : "text-couleur1 bg-couleur1/10")} onClick={() => setSettingMenuState(!setttingMenuState)}>
              <Settings size={18} />
            </div>
          </div>

          {/* Le composant Documentation qui s'affiche par-dessus l'interface */}
          <HelpDocumentation
            isOpen={isDocOpen}
            onClose={() => setIsDocOpen(false)}
          />
          {
            windowList.includes(actualWindow) && <WorkspaceNavigationBar />
          }
          <main className="transition-colors duration-300">{renderContent()}</main>
        </>}

      </>}
    </>
  );
}

export default App;