import { Monitor, MonitorUp, PanelLeftOpen, PanelRightOpen, Smartphone, Tablet } from "lucide-react";

export default function PreviewSection({ isLeftSidebarOpen, isRightSidebarOpen, setIsLeftSidebarOpen, setIsRightSidebarOpen, setViewport, handleDetachPreview, handleResetZoom, handleZoomIn, handleZoomOut, zoomLevel, previewHtml, globalCss, blocksCss, viewport }) {
    return <div
        className={`flex-1 relative w-full md:w-fit flex flex-col bg-white dark:bg-gray-900 rounded-xl border border-couleur1/10 shadow-2xl overflow-hidden h-[calc(100vh-140px)] transition-all duration-300 ${isLeftSidebarOpen ? "md:ml-80" : ""} ${isRightSidebarOpen ? "md:mr-96" : ""}`}
    >
        {!isLeftSidebarOpen && (
            <button
                onClick={() => setIsLeftSidebarOpen(true)}
                className="fixed z-20 p-2.5 md:p-3 left-2 md:-left-8 md:hover:left-1 delay-200 transition-all bg-couleur1 text-white rounded-full shadow-lg hover:scale-105 cursor-pointer"
                title="Open Left Sidebar"
            >
                <PanelLeftOpen size={18} className="md:size-5" />
            </button>
        )}
        {!isRightSidebarOpen && (
            <button
                onClick={() => setIsRightSidebarOpen(true)}
                className="fixed right-2 md:-right-8 md:hover:right-1 delay-200 top-20 md:top-24 z-20 p-2.5 md:p-3 bg-couleur1 text-white rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer"
                title="Open Right Sidebar"
            >
                <PanelRightOpen size={18} className="md:size-5" />
            </button>
        )}
        <div className="h-[80vh] overflow-auto relative w-full md:w-fit shadow-lg shadow-gray-600 rounded-lg flex flex-col">
            <div className="p-3 md:p-4 bg-white/80 backdrop-blur-2xl dark:bg-gray-800/80 border-b border-couleur1/5 flex flex-wrap items-center justify-between gap-2 sticky top-0 z-10">
                <div className="hidden sm:flex gap-1.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/40"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400/20 border border-amber-400/40"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/40"></div>
                </div>
                
                <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center flex-1">
                    {/* Sélecteurs de Viewport */}
                    <div className="flex items-center bg-white/50 dark:bg-gray-800 rounded-lg p-1 shadow-inner border border-couleur1/5">
                        <button
                            onClick={() =>
                                setViewport({
                                    width: "375px",
                                    height: "667px",
                                    name: "mobile",
                                })
                            }
                            className={`p-1.5 rounded-md transition-all cursor-pointer ${viewport.name === "mobile" ? "bg-couleur1 text-white shadow-md" : "text-couleur1/40 hover:text-couleur1"}`}
                            title="Mobile (375x667)"
                        >
                            <Smartphone size={14} />
                        </button>
                        <button
                            onClick={() =>
                                setViewport({
                                    width: "768px",
                                    name: "tablet",
                                })
                            }
                            className={`p-1.5 rounded-md transition-all cursor-pointer ${viewport.name === "tablet" ? "bg-couleur1 text-white shadow-md" : "text-couleur1/40 hover:text-couleur1"}`}
                            title="Tablette (768x1024)"
                        >
                            <Tablet size={14} />
                        </button>
                        <button
                            onClick={() =>
                                setViewport({
                                    width: "1280px",
                                    name: "desktop",
                                })
                            }
                            className={`p-1.5 rounded-md transition-all cursor-pointer ${viewport.name === "desktop" ? "bg-couleur1 text-white shadow-md" : "text-couleur1/40 hover:text-couleur1"}`}
                            title="Bureau (Plein écran)"
                        >
                            <Monitor size={14} />
                        </button>
                    </div>

                    <span className="text-[10px] font-bold text-couleur1/40 uppercase tracking-widest hidden md:inline">
                        Preview
                    </span>

                    {/* Zoom Controls */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <button
                            onClick={handleZoomOut}
                            className="p-1 px-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs cursor-pointer"
                        >
                            -
                        </button>
                        <span className="text-xs md:text-sm font-medium text-couleur1 dark:text-gray-300 min-w-[35px] text-center">
                            {Math.round(zoomLevel * 100)}%
                        </span>
                        <button
                            onClick={handleZoomIn}
                            className="p-1 px-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs cursor-pointer"
                        >
                            +
                        </button>
                        <button
                            onClick={handleResetZoom}
                            className="ml-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs cursor-pointer"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-end px-1 shrink-0">
                    <button title="Separate the preview" onClick={handleDetachPreview} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-couleur1 dark:text-gray-300 cursor-pointer transition-colors">
                        <MonitorUp size={16} />
                    </button>
                </div>
            </div>
            
            <div className="overflow-auto flex justify-center items-start bg-gray-100 dark:bg-gray-800/30 custom-scrollbar flex-1 w-full p-2 md:p-4">
                <iframe
                    title="Page Preview"
                    style={{
                        width: viewport.width,
                        transform: `scale(${zoomLevel})`, 
                        transformOrigin: "top center", 
                        overflow: "auto"
                    }}
                    className="bg-white shadow-2xl transition-all duration-500 ease-in-out rounded-sm h-full"
                    srcDoc={`
                        <!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <style>
                                    body { margin: 0; padding: 0; min-height: 100vh; font-family: sans-serif; }
                                    img { max-width: 100%; height: auto; }
                                    ${globalCss}
                                    ${blocksCss}
                                </style>
                            </head>
                            <body>${previewHtml}</body>
                        </html>
                    `}
                />
            </div>
        </div>
    </div>
}