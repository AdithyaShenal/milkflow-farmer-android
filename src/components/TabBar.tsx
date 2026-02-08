import { useState } from "react";
import { House, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TabBar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();

  const tabs = [
    {
      id: "Home",
      label: "Home",
      icon: House,
      route: "/homePage",
    },
    {
      id: "History",
      label: "History",
      icon: History,
      route: "/history",
    },
  ];

  return (
    <div className="fixed left-0 bottom-0 w-full bg-white border-t border-slate-200 shadow-lg z-50 safe-area-pb">
      <div className="flex justify-around items-center w-full px-2 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                navigate(tab.route);
              }}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-6 rounded-xl transition-all ${
                isActive
                  ? "bg-sky-50 text-sky-600"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon
                size={24}
                className={isActive ? "text-sky-600" : "text-slate-500"}
              />
              <span
                className={`text-xs font-semibold ${
                  isActive ? "text-sky-600" : "text-slate-500"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
