import { useDispatch, useSelector } from "react-redux"
import { setToggleDarkMode } from "../appSlice"
import { Moon, Sun } from "lucide-react"

export default function DarkModeToggle() {
    const isDarkMode = useSelector((state)=>state.app.darkMode)
    const dispatch = useDispatch()
    
    return (
        <button
            onClick={() => dispatch(setToggleDarkMode())}
            className="flex items-center gap-2.5 p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 border-couleur7/40 text-couleur1 hover:bg-couleur1 hover:text-white justify-start w-fit z-50 dark:bg-couleur1 dark:text-white dark:border-none shadow-sm hover:shadow-md active:scale-95"
            aria-label="Toggle Dark Mode"
        >
            <div className="shrink-0">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </div>
        </button>
    )
}