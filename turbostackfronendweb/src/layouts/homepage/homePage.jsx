import { useTranslation } from "../../i18n";
// Utilisation de Lucide pour les icônes
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ProjectCard } from "../../components/projectCard";
import SideMenu from "../../components/sideMenu";
import LayoutHeader from "../../components/layoutHeader";
import { GoApp } from "../../services/bridge";
import ProjectPageView from "../projects/projectPageContent";
import { setActualProject } from "../../appSlice";
import { X, FileText, Layout, LucidePuzzle, Globe, MessageCircle, Command, Logs, Play, StopCircle, RefreshCcw } from "lucide-react";
import AiChatModal from "../../components/modalAI";

const HomePage = () => {
    const { t } = useTranslation();
    const actualProject = useSelector((state) => state.app.actualProject);
    const dispatch = useDispatch();
    const [projectDetails, setProjectDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recentProjects, setRecentProjects] = useState([]);
    const [isChatModalOpen, setChatModalOpen] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            if (actualProject) {
                setLoading(true);
                try {
                    const res = await GoApp.fetchProjectByName(actualProject);
                    if (res.nom != "") {
                        setProjectDetails(res);
                    }
                    else {
                        dispatch(setActualProject(''))
                    }
                } catch (err) {
                    console.error("Error loading project details:", err);
                }
                setLoading(false);
            } else {
                try {
                    const projects = await GoApp.fetchProjects();
                    if (projects) {
                        setRecentProjects(projects.slice(0, 5));
                    }
                } catch (err) {
                    console.error("Error loading projects list:", err);
                }
            }
        };
        loadData();
    }, [actualProject]);

    return (
        <div className="flex h-screen w-full font-sans bg-couleur3 dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
            <SideMenu />

            {/* Bouton Floating Action Chat optimisé mobile */}
            <button
                className="fixed bottom-5 right-5 z-50 bg-couleur1 text-couleur3 p-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
                onClick={() => setChatModalOpen(true)}
            >
                <MessageCircle size={20} />
            </button>

            <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
                {/* Header épuré */}
                <div className="flex justify-between items-center mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-couleur1/10 dark:border-white/5">
                    <LayoutHeader layoutName={actualProject ? `Project Dashboard` : "Global Dashboard"} />
                </div>

                {actualProject ? (
                    loading ? (
                        <div className="flex flex-col items-center justify-center py-16 text-couleur1 dark:text-gray-400 animate-pulse font-medium text-sm">
                            <span>Fetching project details...</span>
                        </div>
                    ) : (
                        projectDetails && (
                            <div className="space-y-6 sm:space-y-8 flex flex-col">
                                <AiChatModal isOpen={isChatModalOpen} onClose={() => setChatModalOpen(!isChatModalOpen)} />

                                <ProjectPageView project={projectDetails} />

                                {/* Web App Overview Section */}
                                {projectDetails.type === "webapp" && (
                                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                            <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-couleur1/10 dark:border-white/5 shadow-2xs">
                                                <h3 className="text-base sm:text-lg font-bold text-couleur1 dark:text-gray-200 mb-3 sm:mb-4 flex items-center gap-2">
                                                    <FileText size={17} /> Recent Pages
                                                </h3>
                                                <div className="space-y-2">
                                                    {projectDetails.web_app?.pages?.length > 0 ? (
                                                        projectDetails.web_app.pages.slice(0, 3).map((page, i) => (
                                                            <div key={i} className="flex justify-between items-center p-2.5 sm:p-3 bg-couleur3/30 dark:bg-gray-800/60 rounded-xl text-xs sm:text-sm border border-couleur1/5 dark:border-white/5">
                                                                <span className="font-semibold text-couleur1 dark:text-gray-200 truncate mr-2">{page.nom}</span>
                                                                <span className="text-[11px] opacity-60 font-mono px-2 py-0.5 rounded bg-couleur1/5 dark:bg-gray-900 text-couleur1 dark:text-gray-400 shrink-0">{page.uri || '/'}</span>
                                                            </div>
                                                        ))
                                                    ) : <p className="text-xs sm:text-sm text-gray-400 italic py-2">No pages created yet.</p>}
                                                </div>
                                            </div>

                                            <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-couleur1/10 dark:border-white/5 shadow-2xs">
                                                <h3 className="text-base sm:text-lg font-bold text-couleur1 dark:text-gray-200 mb-3 sm:mb-4 flex items-center gap-2">
                                                    <LucidePuzzle size={17} /> Components
                                                </h3>
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                    {projectDetails.web_app?.composant?.length > 0 ? (
                                                        projectDetails.web_app.composant.map((comp, i) => (
                                                            <span key={i} className="px-2.5 py-1 bg-couleur1/10 dark:bg-gray-800 text-couleur1 dark:text-gray-300 rounded-lg text-xs font-semibold border border-couleur1/20 dark:border-white/10 shadow-2xs">
                                                                {comp.nom || comp}
                                                            </span>
                                                        ))
                                                    ) : <p className="text-xs sm:text-sm text-gray-400 italic py-2">No components available.</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Static Site Overview Section */}
                                {projectDetails.type === "static" && (
                                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center gap-3 mb-4 sm:mb-6 text-couleur1 dark:text-gray-200">
                                            <div className="p-2 bg-couleur1 text-white rounded-xl shadow-xs">
                                                <Globe size={20} />
                                            </div>
                                            <h2 className="text-xl sm:text-2xl font-bold">Static Site Workspace</h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                            <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-couleur1/10 dark:border-white/5 shadow-2xs">
                                                <h3 className="text-base sm:text-lg font-bold text-couleur1 dark:text-gray-200 mb-3 sm:mb-4 flex items-center gap-2">
                                                    <FileText size={17} /> Content Pages
                                                </h3>
                                                <div className="space-y-2">
                                                    {projectDetails.site_statique?.pages?.length > 0 ? (
                                                        projectDetails.site_statique.pages.slice(0, 3).map((page, i) => (
                                                            <div key={i} className="flex justify-between items-center p-2.5 sm:p-3 bg-couleur3/30 dark:bg-gray-800/60 rounded-xl text-xs sm:text-sm border border-couleur1/5 dark:border-white/5">
                                                                <span className="font-semibold text-couleur1 dark:text-gray-200 truncate mr-2">{page.nom}</span>
                                                                <span className="text-[11px] opacity-60 font-mono px-2 py-0.5 rounded bg-couleur1/5 dark:bg-gray-900 text-couleur1 dark:text-gray-400 shrink-0">{page.uri || `/${page.nom.toLowerCase()}`}</span>
                                                            </div>
                                                        ))
                                                    ) : <p className="text-xs sm:text-sm text-gray-400 italic py-2">No pages created yet.</p>}
                                                </div>
                                            </div>

                                            <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-couleur1/10 dark:border-white/5 shadow-2xs">
                                                <h3 className="text-base sm:text-lg font-bold text-couleur1 dark:text-gray-200 mb-3 sm:mb-4 flex items-center gap-2">
                                                    <LucidePuzzle size={17} /> UI Components
                                                </h3>
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                    {projectDetails.site_statique?.composants?.length > 0 ? (
                                                        projectDetails.site_statique.composants.map((comp, i) => (
                                                            <span key={i} className="px-2.5 py-1 bg-couleur1/10 dark:bg-gray-800 text-couleur1 dark:text-gray-300 rounded-lg text-xs font-semibold border border-couleur1/20 dark:border-white/10 shadow-2xs">
                                                                {comp.nom || comp}
                                                            </span>
                                                        ))
                                                    ) : <p className="text-xs sm:text-sm text-gray-400 italic py-2">No components available.</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {projectDetails.type !== "bdd" && (
                                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex w-full flex-col gap-4">
                                        </div>
                                    </section>
                                )}
                            </div>
                        )
                    )
                ) : (
                    <section className="mb-8">
                        <h2 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 opacity-70 text-couleur6 dark:text-gray-400 tracking-wider uppercase">{t("Recent Projects")}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {recentProjects.length > 0 ? (
                                recentProjects.map((projectName, index) => (
                                    <div
                                        key={index}
                                        onClick={() => dispatch(setActualProject(projectName.nom))}
                                        className="cursor-pointer transform hover:-translate-y-0.5 transition-transform duration-200"
                                    >
                                        <ProjectCard name={projectName.nom} type={projectName.type} updateAt={projectName.update_at} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs sm:text-sm text-couleur1 dark:text-gray-400 opacity-60 italic py-6 px-4 text-center bg-white/40 dark:bg-gray-900/40 rounded-xl sm:rounded-2xl border border-dashed border-couleur1/20 dark:border-white/10">
                                    No projects available.
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default HomePage;