import { createStyles, Navbar, getStylesRef, rem, Burger } from "@mantine/core";
import {
  IconSettings,
  IconLogout,
  IconAwardFilled,
  IconTorii,
} from "@tabler/icons-react";
import { useLogout } from "../../api/hooks/useLogout";
import { useDisclosure } from "@mantine/hooks";
import { NavLink, Outlet } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  dashboardContainer: {
    display: "flex",
  },
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
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
    [theme.fn.smallerThan("sm")]: {
      position: "absolute",
      top: "60px",
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
  { link: "/settings", label: "User Settings", icon: IconSettings },
];

const DashboardView = () => {
  const [opened, { toggle }] = useDisclosure(true);
  const logout = useLogout();
  const { classes } = useStyles();
  const links = data.map((item) => (
    <NavLink
      className={({ isActive }) => {
        return `${classes.link} ${isActive ? classes.linkActive : ""}`;
      }}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <div>
      <Burger
        opened={!opened}
        onClick={() => toggle()}
        className={classes.burger}
        m={"lg"}
      />
      <div className={classes.dashboardContainer}>
        <Navbar
          width={{ sm: 300 }}
          p="md"
          className={`${classes.navbar} ${
            opened && classes.navbarSlideInAnimation
          }`}
        >
          <Navbar.Section grow>{links}</Navbar.Section>

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
