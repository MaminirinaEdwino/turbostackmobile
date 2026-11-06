import { Folder, LayoutGrid, Plus } from "lucide-react";

export default function ProjectCard({ index, name, handleProjectSelection, handleDelete }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <>
      {/* Popover de confirmation de suppression */}
      <div
        id={"popover-react-" + index}
        popover="auto"
        className="m-auto border border-red-200 bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-2xl backdrop-blur-md max-w-xs sm:max-w-sm w-[90vw] sm:w-full outline-none transition-all duration-200"
      >
        <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
          <div className="p-1.5 sm:p-2 bg-red-50 dark:bg-red-950/50 text-red-500 rounded-lg shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h4 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-gray-100 m-0">Confirmation</h4>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed">
          Confirm that you want to delete <span className="font-semibold text-gray-900 dark:text-white">{name.nom}</span>.
        </p>

        {/* Boutons d'action adaptés mobile */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
          <button
            popoverTarget={"popover-react-" + index}
            popoverTargetAction="hide"
            className="px-3.5 py-2 text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            popoverTarget={"popover-react-" + index}
            popoverTargetAction="hide"
            className="px-3.5 py-2 text-xs sm:text-sm font-medium bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-xs transition-all cursor-pointer truncate"
            onClick={() => handleDelete(name.nom)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Carte Projet */}
      <div
        key={index}
        onClick={() => isMobile && handleProjectSelection(name.nom)}
        onDoubleClick={() => !isMobile && handleProjectSelection(name.nom)}
        className="group bg-white dark:bg-gray-900 border border-couleur1/10 dark:border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 cursor-pointer hover:shadow-xl hover:border-couleur1/40 transition-all duration-300 transform sm:hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden h-full min-h-[140px] sm:min-h-[170px]"
      >
        {/* Cercles décoratifs d'arrière-plan */}
        <div className="absolute -right-3 -top-3 w-14 h-14 sm:w-20 sm:h-20 bg-couleur1/5 dark:bg-couleur3/10 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

        <div>
          <div className="flex items-center justify-between mb-2.5 sm:mb-4">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-couleur3 flex items-center justify-center text-couleur1 group-hover:bg-couleur1 group-hover:text-white transition-all duration-300 shadow-inner dark:bg-couleur1/50 dark:text-couleur3 shrink-0">
              <Folder size={18} className="sm:size-6" />
            </div>

            <div className="flex items-center gap-1 text-couleur1/60 dark:text-couleur3/70 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider bg-couleur1/5 dark:bg-white/5 px-2 py-0.5 rounded-md">
              <LayoutGrid size={10} className="sm:size-3" />
              <span>{name.type}</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-lg font-bold text-couleur1 truncate mb-0.5 sm:mb-1 dark:text-couleur3/90">
            {name.nom}
          </h3>
          <p className="text-[11px] sm:text-xs text-couleur1/50 dark:text-couleur3/40 line-clamp-2 leading-tight sm:leading-relaxed">
            {name.description || "No description provided."}
          </p>
        </div>

        <div className="mt-3 pt-2 sm:pt-3 border-t border-couleur1/5 dark:border-white/5 flex items-center justify-end">
          {/* Bouton Delete compact et accessible */}
          <button
            className="text-red-500 sm:text-couleur1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity font-semibold text-[11px] sm:text-xs flex items-center gap-0.5 hover:cursor-pointer p-1 active:scale-95"
            popoverTarget={"popover-react-" + index}
            onClick={(e) => e.stopPropagation()}
          >
            <span>Delete</span>
            <Plus size={13} className="rotate-45 shrink-0" />
          </button>
        </div>
      </div>
    </>
  );
}