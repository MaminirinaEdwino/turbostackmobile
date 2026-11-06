export const StatCard = ({ title, total, icon, onClick }) => (
    <div 
        onClick={onClick} 
        className={`flex items-center gap-3 sm:gap-5 p-3.5 sm:p-6 rounded-xl shadow-md sm:shadow-lg text-white bg-couleur1 ${
            onClick ? 'cursor-pointer hover:bg-opacity-90 transition-all active:scale-95' : ''
        }`}
    >
        <div className="opacity-80 shrink-0">{icon}</div>
        <div>
            <h3 className="text-sm sm:text-lg font-medium leading-tight">{title}</h3>
            <p className="text-xs sm:text-sm opacity-80 font-light mt-0.5">Total : {total}</p>
        </div>
    </div>
);