import { useEffect, useState } from "react";
import {
  createStyles,
  Navbar,
  getStylesRef,
  rem,
  Burger,
  Flex,
} from "@mantine/core";
import {
  IconSettings,
  IconLogout,
  IconAwardFilled,
  IconTorii,
} from "@tabler/icons-react";
import { useLogout } from "../../api/api_hooks/useLogout";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { NavLink, Outlet } from "react-router-dom";
import SwitchThemeButton from "../theme/SwitchThemeButton";

const useStyles = createStyles((theme) => ({
  dashboardContainer: {
    display: "flex",
    maxWidth:"2300px",
    margin:'0 auto',
  },
  header: {
    zIndex: 200,
    width: "100%",
    position: "sticky",
    top: 0,
    height: 74,
    borderBottom: "1px solid",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    boxShadow: `0 0px 20px  ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    [theme.fn.smallerThan("sm")]: {
      marginBottom: "73px",
    },

    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  navbar: {
    transition: "transform 0.2s ease-out",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.fn.smallerThan("sm")]: {
      position: "fixed",
      top: 74,
    },
  },
  navbarSlideInAnimation: {
    [theme.fn.smallerThan("sm")]: {
      transform: "translate(-100%, 0)",
    },
  },
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const data = [
  { link: "/", label: "Play", icon: IconTorii },
  { link: "/rank", label: "Ranking", icon: IconAwardFilled },
  { link: "/user-profile", label: "User Profile", icon: IconSettings },
];

const DashboardView = () => {
  const [opened, { toggle }] = useDisclosure(true);
  const { height } = useViewportSize();
  //TODO: Make header hide when scrolling down and appear on scrolling up
  // const navbar = document.getElementById("test")
  // let offset = 0
  // const handler = () => {
  //   let new_offset = window.scrollY
  //   if(new_offset>offset) {

  //     navbar && (navbar.style.top = "-74px");
  //     navbar && (navbar.style.position = "sticky")
  //     navbar && (navbar.style.transition = `top 0.2s ease-in-out`)
  //   }
  //   else {
  //    navbar && (navbar.style.top = "0px")
  //    navbar && (navbar.style.transition = `top 0.2s ease-in-out`)
  //   }
  //   offset = new_offset

  // }

  // useWindowEvent('scroll', handler);

  const logout = useLogout();
  const { classes } = useStyles();
  const links = data.map((item) => (
    <NavLink
      className={({ isActive }) => {
        return `${classes.link} ${isActive ? classes.linkActive : ""}`;
      }}
      to={item.link}
      key={item.label}
      onClick={() => toggle()}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <div >
      <header  className={`${classes.header}`}>
        <Flex justify="space-between" align="center">
          <Burger
            opened={!opened}
            onClick={() => toggle()}
            className={classes.burger}
            m={"lg"}
          />
          <SwitchThemeButton sx={{ marginRight: 25 }} />
        </Flex>
      </header>
      <div className={classes.dashboardContainer}>
        <Navbar
          width={{ sm: 300 }}
          height={height}
          p="md"
          className={`${classes.navbar} ${
            opened && classes.navbarSlideInAnimation
          }`}
        >
          <Navbar.Section>{links}</Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <span className={classes.link} onClick={() => logout()}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </span>
          </Navbar.Section>
        </Navbar>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardView;
