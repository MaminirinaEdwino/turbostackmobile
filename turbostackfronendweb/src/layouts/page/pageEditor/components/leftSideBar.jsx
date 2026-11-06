import { X } from "lucide-react";
import VisualEditor from "../visualEditor";

export default function LeftSideBar({isLeftSidebarOpen, setIsLeftSidebarOpen, editingType, selectedPageIndex, selectedComponentIndex, activeItem, siteData, compKey, activeBlock, setActiveBlock, updateActiveItemField, showToast, viewport}) {
    return <aside
        className={`fixed top-2 h-[calc(100vh-16px)] z-50 transition-transform duration-300 ease-in-out ${isLeftSidebarOpen ? "left-0" : "-left-full"} w-[85vw] sm:w-80 bg-couleur3 dark:bg-gray-950 border-r border-couleur1/10 shadow-2xl flex flex-col p-4 md:p-6 overflow-y-auto my-2`}
    >
        <div className="flex justify-between items-center mb-6 sticky -top-4 md:-top-6 bg-couleur3 dark:bg-gray-950 py-2 z-10 border-b border-couleur1/5">
            <h2 className="text-sm font-black uppercase text-couleur1/80 dark:text-gray-200">
                Structure
            </h2>
            <button
                onClick={() => setIsLeftSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-couleur1/10 text-couleur1 dark:text-gray-300 cursor-pointer transition-colors"
                title="Close Sidebar"
            >
                <X size={18} />
            </button>
        </div>
        <div className="flex-1 overflow-y-auto">
            <VisualEditor
                key={`left-${editingType}-${editingType === "page" ? selectedPageIndex : selectedComponentIndex}`}
                content={activeItem?.content}
                availablePages={siteData?.pages || []}
                availableComponents={siteData?.[compKey] || []}
                activeBlock={activeBlock}
                setActiveBlock={setActiveBlock}
                activeTab="blocks"
                activeViewport={viewport.name}
                allowedTabs={["blocks"]}
                onChange={(blocks) => updateActiveItemField("content", blocks)}
                showToast={showToast}
                onPageStylesChange={(styles) =>
                    updateActiveItemField("styles", styles)
                }

                editingtype={editingType}
                updateBlockStyle={updateActiveItemField}
                activePage={activeItem}
            />
        </div>
    </aside>
}