import {
  Container,
  Flex,
  Image,
  SimpleGrid,
  createStyles,
  useMantineColorScheme,
} from "@mantine/core";
import AuthForm from "../AuthForm";
import pi from "../../assets/pi.svg";

const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: 1400,
    [theme.fn.smallerThan("sm")]: { maxWidth: "100%" },
    margin: "0 auto",
    minHeight: "80vh",
    alignItems: "center",
    width: "100%",
    display: "flex",
    flexGrow: 1,
  },
  grid_container: {
    flexGrow: 1,
    height: "90vh",
  },
  pi_container: {
    [theme.fn.smallerThan("sm")]: { display: "none" },
  },
  pi_color: {
    filter:
      "invert(100%) sepia(0%) saturate(0%) hue-rotate(306deg) brightness(104%) contrast(101%)",
  },
}));

const LandingPageView = () => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  return (
    <Container className={classes.container}>
      <SimpleGrid
        cols={2}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={100}
        className={classes.grid_container}
      >
        <AuthForm />
        <Flex w={"80%"} align="center" className={classes.pi_container}>
          <Image
            src={pi}
            className={`${colorScheme === "dark" && classes.pi_color}`}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default LandingPageView;
