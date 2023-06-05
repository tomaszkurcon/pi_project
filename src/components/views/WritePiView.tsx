import {
  Center,
  Code,
  Container,
  PinInput,
  Stack,
  Text,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    flexWrap: "wrap",
  },
}));

const WritePiView = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <>
      <Container>
        <Center sx={{ marginBottom: 40 }}>
          <Stack align="center">
            <Title order={2} color={theme.primaryColor}>
              Check how many digits of number 𝝅 do you actually remember!
            </Title>
            <Text>To begin just start writing</Text>
          </Stack>
        </Center>
        <Code color="blue" sx={{ fontSize: 30 }}>
              𝝅 = 3,
            </Code>
        <PinInput className={classes.root} placeholder="" />
      </Container>
    </>
  );
};

export default WritePiView;
