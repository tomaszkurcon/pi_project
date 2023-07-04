import { useEffect } from "react";
import {
  Avatar,
  BackgroundImage,
  Box,
  Card,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TabsTemplate from "../templates/TabsTemplate";
import { getLastElemenetUrl } from "../utils/getLastElementUrl";

const UserProfileView = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    getLastElemenetUrl(pathname) === "user-profile" && navigate("overview");
  }, []);
  return (
    <>
      <BackgroundImage
        src="https://images.pexels.com/photos/10040637/pexels-photo-10040637.jpeg?auto=compress&cs=tinysrgb&w=1600"
        h={240}
        sx={{
          borderRadius: "20px 20px 0 0",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          component="div"
          sx={() => ({
            transform: "translate(35px, 130px)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          })}
        >
          <Box
            sx={(theme) => ({
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.colors.gray[0]
              }`,
            })}
          >
            <Avatar
              src="https://images.pexels.com/photos/6964367/pexels-photo-6964367.jpeg?auto=compress&cs=tinysrgb&w=1600"
              size={180}
            />
          </Box>
          <Flex mt={60} align="center" gap={"70px"}>
            <Flex direction="column">
              <Title order={3}>John Hustler</Title>
              <Text color="dimmed">username</Text>
            </Flex>
            <Box>{/* <Text>STATS</Text> */}</Box>
          </Flex>
        </Box>
      </BackgroundImage>
      <Box mt={170} ml={20}>
        <TabsTemplate tabsConfig={["Overview", "Settings"]}/>
        <Outlet />
        {/* <Card radius="lg" shadow="sm" p={0} >
       
        </Card> */}
      </Box>
    </>
  );
};

export default UserProfileView;
