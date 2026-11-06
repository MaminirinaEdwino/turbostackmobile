import { X } from "lucide-react";
import VisualEditor from "../visualEditor";

export default function RightSideBar({ setIsRightSidebarOpen, editingType, selectedPageIndex, selectedComponentIndex, activeItem, siteData, compKey, activeBlock, setActiveBlock, rightActiveTab, setRightActiveTab, updateActiveItemField, showToast, isRightSidebarOpen, viewport }) {
    return <aside
        className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out ${isRightSidebarOpen ? "translate-x-0" : "translate-x-full"} w-[85vw] sm:w-96 bg-couleur3 dark:bg-gray-950 border-l border-couleur1/10 shadow-xl flex flex-col p-4 md:p-6 overflow-y-auto`}
    >
        <div className="flex justify-between items-center mb-6 sticky -top-4 md:-top-6 bg-couleur3 dark:bg-gray-950 py-2 z-10 border-b border-couleur1/5">
            <h2 className="text-sm font-black uppercase text-couleur1/80 dark:text-gray-200">
                Configuration
            </h2>
            <button
                onClick={() => setIsRightSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-couleur1/10 text-couleur1 dark:text-gray-300 cursor-pointer transition-colors"
                title="Close Sidebar"
            >
                <X size={18} />
            </button>
        </div>
        <div className="flex-1 overflow-y-auto">
            <VisualEditor
                key={`right-${editingType}-${editingType === "page" ? selectedPageIndex : selectedComponentIndex}`}
                content={activeItem?.content}
                pageStyles={activeItem?.styles || ""}
                availablePages={siteData?.pages || []}
                availableComponents={siteData?.[compKey] || []}
                activeBlock={activeBlock}
                setActiveBlock={setActiveBlock}
                activeTab={rightActiveTab}
                setActiveTab={setRightActiveTab}
                activeViewport={viewport.name}
                allowedTabs={
                    editingType === "page"
                        ? ["global", "properties", "HTML properties", "pseudo classes"]
                        : ["properties", "HTML properties", "pseudo classes"]
                }
                onChange={(blocks) => updateActiveItemField("content", blocks)}
                onPageStylesChange={(styles) =>
                    updateActiveItemField("styles", styles)
                }
                showToast={showToast}

                editingtype={editingType}
                updateBlockStyle={updateActiveItemField}
                activePage={activeItem}
            />
        </div>
    </aside>
}