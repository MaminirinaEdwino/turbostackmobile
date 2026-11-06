import { GripVertical } from "lucide-react";

export default function Block({ block, getIconForTag }) {
    return <div className="flex items-center gap-3 min-w-0 flex-1" title={`${block.htmlId != "" ? "#"+block.htmlId : block.tag} ${block.inputType != "" ? block.inputType : ""}`}>
        <div className="cursor-grab active:cursor-grabbing text-couleur1/20 group-hover:text-couleur1/60 transition-colors shrink-0" onClick={(e) => e.stopPropagation()}>
            <GripVertical size={14} />
        </div>
        <div className="p-1.5 bg-couleur1/10 rounded-lg text-couleur1 shrink-0">
            {getIconForTag(block.tag)}
        </div>
        <div className="min-w-0 flex-1 truncate" title={block.htmlId != "" ? "#"+block.htmlId : block.tag}>
            <p className="text-[10px] font-black text-couleur1 dark:text-gray-400 uppercase tracking-tighter truncate">
                {block.htmlId != "" ? "#"+block.htmlId : block.tag} <span className="text-[8px]"> {block.inputType != "" && block.inputType}</span>
            </p>
            <p className="text-[11px] opacity-40 font-mono truncate">
                {block.tag != "input" && block.content != "" && block.content}
                {(block.tag =="input" && block.placeholder != "") && ( block.inputType && block.inputType  == "submit" || block.inputType =="reset" ? block.inputType : block.placeholder)}
            </p>
        </div>
    </div>
}