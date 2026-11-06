import { Save } from "lucide-react";
import ToDashBoardBtn from "./toDashBoardbtn";

export default function Header({ editMode, setEditMode, navigateTo, editingType, project, activeItem, updateActiveItemField, projectName, handleSave }) {
    return <div className="p-3 px-3.5 md:p-4 md:px-6 flex items-center justify-between gap-2 md:gap-4 border-b border-couleur1/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-20 shadow-xs transition-colors duration-300 min-w-0">
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1 mr-1">
            <ToDashBoardBtn editMode={editMode} setEditMode={setEditMode} navigateTo={navigateTo} />
            <h1 className="text-base md:text-xl font-bold text-couleur1 dark:text-gray-100 tracking-tight min-w-0 flex-1">
                {editMode ? (
                    <div className="flex items-start gap-1 md:gap-2.5 flex-col w-full max-w-xs sm:max-w-md">
                        <div className="flex gap-2 md:gap-4 justify-between items-center w-full">
                            <span className="opacity-60 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-couleur1 dark:text-gray-400 shrink-0">
                                {editingType} name : {[project?.rest_api?.endpoints?.filter(ep => ep.return_page === activeItem?.nom)].length}
                            </span>
                            {editingType == "page" && project?.type == "webapp" && project?.rest_api.endpoints.filter(ep => ep.return_page === activeItem?.nom).length > 0 && project?.rest_api.endpoints.filter(ep => ep.return_page === activeItem?.nom)[0]["nom"] != null ? <input
                                value={activeItem?.nom}
                                onChange={(e) => updateActiveItemField("nom", e.target.value)}
                                className="bg-transparent border-b border-couleur1/30 dark:border-white/20 focus:border-couleur1 dark:focus:border-white outline-none px-1.5 md:px-2 py-0.5 text-couleur1 dark:text-gray-100 text-xs md:text-sm font-semibold transition-colors w-full min-w-0 truncate"
                                disabled
                            /> : <input
                                value={activeItem?.nom}
                                onChange={(e) => updateActiveItemField("nom", e.target.value)}
                                className="bg-transparent border-b border-couleur1/30 dark:border-white/20 focus:border-couleur1 dark:focus:border-white outline-none px-1.5 md:px-2 py-0.5 text-couleur1 dark:text-gray-100 text-xs md:text-sm font-semibold transition-colors w-full min-w-0 truncate"

                            />}

                        </div>
                        {project?.type != "webapp" && (
                            <div className="flex gap-2 md:gap-4 justify-between items-center w-full">
                                <span className="opacity-60 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-couleur1 dark:text-gray-400 shrink-0">
                                    {editingType} uri :
                                </span>
                                <input
                                    value={activeItem?.uri}
                                    onChange={(e) => updateActiveItemField("uri", e.target.value)}
                                    className="bg-transparent text-xs md:text-sm font-mono border-b border-couleur1/30 dark:border-white/20 focus:border-couleur1 dark:focus:border-white outline-none px-1.5 md:px-2 py-0.5 text-couleur1 dark:text-gray-100 transition-colors w-full min-w-0 truncate"
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="flex items-center gap-1.5 md:gap-2 truncate">
                        <span className="opacity-60 font-medium text-xs md:text-base shrink-0">Project :</span>
                        <span className="truncate">{projectName}</span>
                    </span>
                )}
            </h1>
        </div>

        {/* Section Droite : Action de Sauvegarde */}
        <button
            onClick={handleSave}
            className="bg-couleur1 hover:bg-couleur1/90 text-white px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-bold flex items-center gap-1.5 md:gap-2 text-xs md:text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
        >
            <Save size={18} /> 
            <span>Save<span className="hidden sm:inline"> Project</span></span>
        </button>
    </div>
}