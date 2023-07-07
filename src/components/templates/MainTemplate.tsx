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
    <Container p="md" className={classes.container} size={"100%"} mt={15}>
      <Outlet />
    </Container>
  );
};

export default MainTemplate;
