import { Tabs, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { getLastElemenetUrl } from "../utils/getLastElementUrl";

type TabsTemplateProps = {
  tabsConfig: string[];
};
const TabsTemplate = ({ tabsConfig }: TabsTemplateProps) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const url = getLastElemenetUrl(pathname);
  return (
    <Tabs value={url} onTabChange={(value: string) => navigate(`${value}`)}>
      <Tabs.List>
        {tabsConfig.map((tab) => (
          <>
            <Tabs.Tab value={tab.toLowerCase()}>
              <Text fw={tab.toLowerCase()===url ? 700 : 0}>{tab}</Text>
            </Tabs.Tab>
          </>
        ))}
       
      </Tabs.List>
    </Tabs>
  );
};

export default TabsTemplate;
