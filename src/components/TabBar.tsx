import { Icon, Tabbar, TabbarLink, ToolbarPane } from "konsta/react";
import { useState } from "react";
import { House, History, BadgeQuestionMark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TabBar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const navigate = useNavigate();

  return (
    <>
      <Tabbar className="left-0 bottom-0 fixed p-1">
        <ToolbarPane>
          <TabbarLink
            active={activeTab === "Home"}
            onClick={() => {
              setActiveTab("Home");
              navigate("/homePage");
            }}
            icon={
              <Icon
                ios={<House className="w-7 h-7" />}
                material={<House className="w-6 h-6" />}
              />
            }
            label={"Home"}
          />
          <TabbarLink
            active={activeTab === "History"}
            onClick={() => {
              setActiveTab("History");
              navigate("/history");
            }}
            icon={
              <Icon
                ios={<History className="w-7 h-7" />}
                material={<History className="w-6 h-6" />}
              />
            }
            label={"History"}
          />
          <TabbarLink
            active={activeTab === "Help"}
            onClick={() => {
              setActiveTab("Help");
              navigate("/helpPage");
            }}
            icon={
              <Icon
                ios={<BadgeQuestionMark className="w-7 h-7" />}
                material={<BadgeQuestionMark className="w-6 h-6" />}
              />
            }
            label="Help"
          />
        </ToolbarPane>
      </Tabbar>
    </>
  );
};

export default TabBar;
