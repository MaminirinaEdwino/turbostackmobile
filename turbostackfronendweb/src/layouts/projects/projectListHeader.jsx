import { Plus, Search } from "lucide-react";

export default function ProjectListHeader({ searchTerm, setSearchTerm, dispatch, setActualWindow }) {
    return <>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full md:w-auto">
            <div className="relative group flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-couleur1 opacity-40 group-focus-within:opacity-100 transition-opacity" size={20} />
                <input
                    type="text"
                    placeholder="Filter projects..."
                    className="pl-10 pr-4 py-2 md:py-2.5 border border-couleur1/20 dark:border-white/10 rounded-xl bg-white dark:bg-gray-900 outline-none focus:ring-2 ring-couleur1/20 text-couleur1 dark:text-gray-100 w-full md:w-64 text-sm md:text-base shadow-sm transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {/*newProjectReidrectBtn()*/}
            <button
                onClick={() => dispatch(setActualWindow('New Project'))}
                className="flex items-center justify-center gap-2 bg-couleur1 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl hover:shadow-lg hover:bg-opacity-90 transition-all font-bold text-sm md:text-base cursor-pointer shrink-0"
            >
                <Plus size={20} />
                <span className="inline">New Project</span>
            </button>
        </div>
    </>
}