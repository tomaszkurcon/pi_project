import { Container, createStyles } from "@mantine/core";
import { Outlet } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    margin: 0,
    [theme.fn.largerThan("sm")]: { paddingTop: "70px" },
  },
}));

const MainTemplate = () => {
  const { classes } = useStyles();
  return (
    <Container p="xl" className={classes.container} size={"100rem"}>
      <Outlet />
    </Container>
  );
};

export default MainTemplate;
