import { useEffect, useState } from "react";
import {
  ActionIcon,
  Avatar,
  BackgroundImage,
  Box,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TabsTemplate from "../templates/TabsTemplate";
import { getLastElemenetUrl } from "../utils/getLastElementUrl";
import { IconPencil, IconUser } from "@tabler/icons-react";
import CustomModal from "../common/CustomModal";

import DropzoneMantine from "../common/DropzoneMantine";
import { useGetFetch } from "../../api/api_hooks/useGetFetch";
import QueryResults from "../templates/QueryResults";
import fallbackImage from "../../assets/fallbackImage.png";
import ImageCropper from "../common/ImageCropper";

type TUserData = {
  name?: string;
  surname?: string;
  username?: string;
  profileImage?: string;
  backgroundImage?: string;
};

const UserProfileView = () => {
  const [opened, setOpened] = useState("");
  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    getLastElemenetUrl(pathname) === "user-profile" && navigate("overview");
  }, []);
  const { data, refetch,...queryState } = useGetFetch<TUserData>("dashboard/getUser");
  const imagePreview = opened == "backgroundImage" ? data?.backgroundImage : data?.profileImage
  return (
    <QueryResults<TUserData> data={data} {...queryState}>
      <BackgroundImage
        src={data?.backgroundImage || fallbackImage}
        h={240}
        sx={{
          borderRadius: "20px 20px 0 0",
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
        }}
      >
        <ActionIcon
          sx={{ position: "absolute", right: "25px", top: "85%", zIndex: 999 }}
          variant="filled"
          radius="md"
          onClick={() => setOpened("backgroundImage")}
        >
          <IconPencil />
        </ActionIcon>

        <Box
          component="div"
          sx={(theme) => ({
            flexGrow: 1,
            display: "flex",
            position: "relative",
            alignItems: "center",
            bottom: "-150px",
            flexDirection: "column",
            [theme.fn.largerThan("md")]: {
              flexGrow: 0,
              flexDirection: "row",
              transform: "translate(35px, 130px)",
              bottom: 0,
              gap: "10px",
            },
          })}
        >
          <Box component="div" sx={{ position: "relative" }}>
            <ActionIcon
              sx={{
                position: "absolute",
                zIndex: 999,
                left: "70%",
                top: "85%",
              }}
              onClick={() => setOpened("profileImage")}
              variant="filled"
              radius="md"
            >
              <IconPencil />
            </ActionIcon>
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
              <Avatar src={data?.profileImage} size={180}>
                <IconUser size={150} />
              </Avatar>
            </Box>
          </Box>

          <Flex
            sx={(theme) => ({ [theme.fn.largerThan("md")]: { marginTop: 60 } })}
            align="center"
            gap={{ md: "70px" }}
          >
            <Flex
              direction="column"
              sx={(theme) => ({
                [theme.fn.smallerThan("sm")]: { textAlign: "center" },
              })}
            >
              <Title order={3}>John Hustler</Title>
              <Text color="dimmed">username</Text>
            </Flex>
            <Box>{/* <Text>STATS</Text> */}</Box>
          </Flex>
        </Box>
      </BackgroundImage>
      <Box
        mt={170}
        sx={(theme) => ({ [theme.fn.largerThan("lg")]: { marginLeft: 20 } })}
      >
        <TabsTemplate tabsConfig={["Overview", "Settings"]} />
        <Outlet />
        {/* <Card radius="lg" shadow="sm" p={0} >
       
        </Card> */}
      </Box>
      <CustomModal
        opened={opened ? true : false}
        onClose={() => setOpened("")}
        zIndex={1000}
        centered
        withCloseButton={false}
        size={800}
        p={0}
      >
        <DropzoneMantine type={opened} closeModal={setOpened} refetch={refetch} recentImagePreview={imagePreview}/>
      </CustomModal>
    </QueryResults>
  );
};

export default UserProfileView;
