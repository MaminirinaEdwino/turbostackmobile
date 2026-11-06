import { Folder, LayoutGrid, Plus } from "lucide-react";

export default function ProjectCard({ index, name, handleProjectSelection, handleDelete }) {
  return (
    <>
      {/* L'attribut popover accepte "auto" ou "manual" */}
      <>
        {/* Popover de confirmation de suppression */}
        <div
          id={"popover-react-" + index}
          popover="auto"
          className="m-auto border border-red-200 bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm w-[90vw] md:w-full outline-none transition-all duration-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-50 dark:bg-red-950/50 text-red-500 rounded-lg shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 m-0">Confirmation</h4>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-5 leading-relaxed">
            Confirm that you want to delete this project
          </p>

          {/* Boutons d'action adaptés mobile */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
            <button
              popoverTarget={"popover-react-" + index}
              popoverTargetAction="hide"
              className="px-4 py-2 text-xs md:text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              popoverTarget={"popover-react-" + index}
              popoverTargetAction="hide"
              className="px-4 py-2 text-xs md:text-sm font-medium bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-sm shadow-red-500/20 transition-all cursor-pointer truncate"
              onClick={() => handleDelete(name.nom)}
            >
              Confirm {name.nom}
            </button>
          </div>
        </div>

        {/* Carte Projet */}
        <div
          key={index}
          onDoubleClick={() => handleProjectSelection(name.nom)}
          className="group bg-white dark:bg-gray-900 border border-couleur1/10 dark:border-white/10 rounded-2xl p-4 md:p-6 cursor-pointer hover:shadow-2xl hover:border-couleur1/40 transition-all duration-300 transform md:hover:-translate-y-1.5 flex flex-col relative overflow-hidden dark:border-none"
        >
          {/* Background Decoration */}
          <div className="absolute -right-4 -top-4 w-20 h-20 md:w-24 md:h-24 bg-couleur1/5 dark:bg-couleur3/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-couleur3 flex items-center justify-center text-couleur1 mb-4 md:mb-6 group-hover:bg-couleur1 group-hover:text-white transition-all duration-300 shadow-inner dark:bg-couleur1/50 dark:text-couleur3 shrink-0">
            <Folder size={24} className="md:size-7" />
          </div>

          <h3 className="text-lg md:text-xl font-bold text-couleur1 truncate mb-1 md:mb-2 dark:text-couleur3/80">
            {name.nom}
          </h3>
          <p className="text-xs md:text-sm text-couleur1/50 line-clamp-2 mb-4 md:mb-6 dark:text-couleur3/30">
            {name.description}
          </p>

          <div className="mt-auto pt-3 md:pt-4 border-t border-couleur1/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-couleur1 opacity-60 md:opacity-40 text-[10px] font-bold uppercase tracking-wider dark:text-couleur3/80">
              <LayoutGrid size={12} /> {name.type}
            </div>

            {/* Bouton Delete : Visible par défaut sur mobile, masqué sur desktop jusqu'au survol */}
            <button
              className="text-red-500 md:text-couleur1 opacity-100 md:opacity-0 z-10 md:group-hover:opacity-100 transition-opacity font-bold text-xs flex items-center gap-1 hover:cursor-pointer p-1"
              popoverTarget={"popover-react-" + index}
              onClick={(e) => e.stopPropagation()}
            >
              Delete <Plus size={14} className="rotate-45" />
            </button>
          </div>
        </div>
      </>
    </>
  );
}
