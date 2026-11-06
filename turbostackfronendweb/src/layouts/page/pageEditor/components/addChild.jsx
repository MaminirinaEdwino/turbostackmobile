import { useState } from "react";
import { PlusSquare, X } from "lucide-react";
import { BLOCK_TYPES } from "../defaultVar";

export default function AddChild({ block, addChild }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button 
                className="p-1.5 text-couleur1/40 hover:text-couleur1 hover:bg-couleur1/10 rounded-lg transition-all cursor-pointer" 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                title="Add element"
            >
                <PlusSquare size={14} />
            </button>
            
            {isOpen && (
                <div 
                    className="fixed inset-0 z-100 flex items-center justify-center p-4  backdrop-blur-xs animate-in fade-in duration-150 mx-auto my-auto bg-couleur3"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                    }}
                >
                    <div 
                        className="bg-white dark:bg-gray-800 border border-couleur1/10 dark:border-white/10 shadow-2xl rounded-2xl p-3 w-full max-w-xs max-h-[60vh] flex flex-col animate-in zoom-in-95 duration-200 "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-couleur1/10 dark:border-white/10">
                            <span className="text-xs font-bold uppercase tracking-wider text-couleur1/70 dark:text-gray-300">
                                Add Child Element
                            </span>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}
                                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="overflow-y-auto flex flex-col gap-1 pr-1">
                            {BLOCK_TYPES.map(type => (
                                <button 
                                    key={type.tag} 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        addChild(block.id, type); 
                                        setIsOpen(false);
                                    }} 
                                    className="flex items-center gap-2.5 p-2.5 hover:bg-couleur1/5 dark:hover:bg-gray-700 rounded-xl text-xs font-bold text-couleur1 dark:text-gray-200 text-left transition-colors cursor-pointer"
                                >
                                    <span className="shrink-0">{type.icon}</span> 
                                    <span className="truncate">{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}