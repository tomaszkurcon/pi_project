import { useEffect, useState } from "react";
import {
  ActionIcon,
  Avatar,
  BackgroundImage,
  Box,
  Dialog,
  Flex,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";
import TabsTemplate from "../templates/TabsTemplate";
import { getLastElemenetUrl } from "../utils/getLastElementUrl";
import { IconPencil, IconUser } from "@tabler/icons-react";
import CustomModal from "../common/CustomModal";

import DropzoneMantine from "../common/DropzoneMantine";
import { useGetFetch } from "../../api/api_hooks/useGetFetch";
import QueryResults from "../templates/QueryResults";
import fallbackImage from "../../assets/fallbackImage.png";
import AnchorLink from "../common/AnchorLink";
import { IoIosRocket } from "react-icons/io";
export type TUserData = {
  name?: string;
  fullname?: string;
  username?: string;
  profileImage?: string;
  backgroundImage?: string;
};

const UserProfileView = () => {
  const [opened, setOpened] = useState("");
  const [dialogOpened, setDialogOpened] = useState(false);
  const { pathname } = useLocation();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  useEffect(() => {
    getLastElemenetUrl(pathname) === "user-profile" && navigate("overview");
  }, [pathname, navigate]);

  const { data, refetch, ...queryState } =
    useGetFetch<TUserData>("dashboard/getUser");
  useEffect(() => {
    setDialogOpened(
      (!data?.fullname || !data?.username) && !queryState.loading
    );
  }, [data, queryState.loading]);
  const imagePreview =
    opened === "backgroundImage" ? data?.backgroundImage : data?.profileImage;
  const dialogTransition = dialogOpened
    ? {
        sx: { transitionDelay: "1s" },
        transitionDuration: 1500,
      }
    : {};

  return (
    <>
      <Dialog
        opened={dialogOpened}
        onClose={() => setDialogOpened((prev) => !prev)}
        withCloseButton
        size="lg"
        radius="md"
        transition={"fade"}
        {...dialogTransition}
      >
        <Text>
          Boost your experience by completing your profile! <IoIosRocket color={theme.fn.primaryColor()}/> Filling out your
          profile not only helps others get to know you better, but also allows
          us to tailor the experience to your interests. Don’t miss out -
          <AnchorLink
            to="/user-profile/settings"
            sx={(theme) => ({ color: theme.fn.primaryColor() })}
            onClick={() => setDialogOpened(false)}
          >
            complete
          </AnchorLink>{" "}
          your profile today!
        </Text>
      </Dialog>
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
            sx={{
              position: "absolute",
              right: "25px",
              top: "85%",
              zIndex: 999,
            }}
            variant="filled"
            radius="md"
            onClick={() => setOpened("backgroundImage")}
            color="indigo"
          >
            <IconPencil stroke={1} />
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
                color="indigo"
              >
                <IconPencil stroke={1} />
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
              sx={(theme) => ({
                [theme.fn.largerThan("md")]: { marginTop: 60 },
              })}
              align="center"
              gap={{ md: "70px" }}
            >
              <Flex
                direction="column"
                sx={(theme) => ({
                  [theme.fn.smallerThan("sm")]: { textAlign: "center" },
                })}
              >
                <Title order={3}>{data?.fullname ?? "Your name"}</Title>
                <Text color="dimmed">{data?.username ?? "username"}</Text>
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
          <Box mt={30}>
            <Outlet context={{ refetch: refetch, user: data }} />
          </Box>
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
          <DropzoneMantine
            type={opened}
            closeModal={setOpened}
            refetch={refetch}
            recentImagePreview={imagePreview}
          />
        </CustomModal>
      </QueryResults>
    </>
  );
};

export default UserProfileView;
