import { Trash2 } from "lucide-react";

export default function DeleteBlock({ block, removeBlock }) {
    return <button
        onClick={(e) => {
            e.stopPropagation();
            removeBlock(block.id);
        }}
        className="text-red-400 hover:text-red-600 p-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer active:scale-95 shrink-0"
        title="Delete block"
    >
        <Trash2 size={14} />
    </button>
}