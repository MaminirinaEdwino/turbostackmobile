// import BDDProjectInterface from "./components/bddPageInterface";
import ProjectResume from "./components/projectResume";
import { StatCard } from "../../components/statCard";
import { Database, Settings, FileText, LucidePuzzle } from "lucide-react";
import { useDispatch } from "react-redux";
import { setActualWindow } from "../../appSlice";

export default function ProjectPageView({ project }) {
  const dispatch = useDispatch();

  const getStats = () => {
    let stats = [];

    if (project.type === "bdd" || project.type === "") {
      stats.push({
        title: "DB Models",
        total: project.bdd?.models?.length || 0,
        icon: <Database size={15} />,
        onClick: () => dispatch(setActualWindow("db_editor")),
      });
    }

    if (project.type === "api" || project.type === "webapp") {
      stats.push({
        title: "DB Models",
        total: project.bdd?.models?.length || 0,
        icon: <Database size={15} />,
        onClick: () => dispatch(setActualWindow("db_editor")),
      });
      stats.push({
        title: "Endpoints",
        total: project.rest_api.endpoints?.length || 0,
        icon: <Settings size={15} />,
        onClick: () => dispatch(setActualWindow("api_editor")),
      });
    }

    if (project.type === "webapp") {
      stats.push({
        title: "App Pages",
        total: project.web_app.pages?.length || 0,
        icon: <FileText size={15} />,
        onClick: () => dispatch(setActualWindow("page_editor")),
      });
      stats.push({
        title: "App Components",
        total: project.web_app.composant?.length || 0,
        icon: <LucidePuzzle size={15} />,
        onClick: () => dispatch(setActualWindow("page_editor")),
      });
    }

    if (project.type === "static") {
      stats.push({
        title: "Static Pages",
        total: project.site_statique.pages?.length || 0,
        icon: <FileText size={15} />,
        onClick: () => dispatch(setActualWindow("page_editor")),
      });
      stats.push({
        title: "Static Components",
        total: project.site_statique.composants?.length || 0,
        icon: <LucidePuzzle size={15} />,
        onClick: () => dispatch(setActualWindow("page_editor")),
      });
    }
    return stats;
  };

  const stats = getStats();

  return (
    <div className="m-1 sm:m-2 flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-3.5 sm:gap-5">
        <div className="lg:col-span-1">
          <ProjectResume nom={project.nom} type={project.type} />
        </div>
        
        {/* Boîte de description allégée et optimisée mobile */}
        <div className="lg:col-span-2 flex items-start gap-3 p-3.5 sm:p-5 rounded-xl border shadow-2xs border-couleur7 bg-couleur5 dark:bg-couleur6/10 dark:border-none transition-all">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border-2 border-couleur1 text-couleur1 shrink-0 dark:text-white">
            <FileText size={16} className="sm:w-[20px] sm:h-[20px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs font-bold text-couleur1 opacity-50 uppercase tracking-wider mb-0.5 sm:mb-1 dark:text-white/80">
              Description
            </span>
            <p className="text-couleur1 text-xs sm:text-sm md:text-base leading-relaxed italic">
              {project.description ||
                "No description provided for this project."}
            </p>
          </div>
        </div>
      </div>

      {stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              title={stat.title}
              total={stat.total}
              icon={stat.icon}
              onClick={stat.onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}