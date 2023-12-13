import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePostFetch } from "../../api/api_hooks/usePostFetch";
import { IconMailForward } from "@tabler/icons-react";

type ResetPasswordFields = {
  email: string;
};
type ResetPasswordHandler = (values: ResetPasswordFields) => void;

const ResetPasswordView = () => {
  const [email, setEmail] = useState<string>();
  const { mutate } = usePostFetch<ResetPasswordFields, ResetPasswordFields>(
    "auth/reset_password",
    {
      onSuccess: (res) => {
        setEmail(res?.email);
      },
      withTokens: false,
    },
    "POST"
  );
  const onSubmitHandler = (values: ResetPasswordFields) => {
    mutate(values);
  };
  return (
    <Container
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        radius="md"
        maw={500}
        w="100%"
        mih="300px"
        shadow="xl"
        p={40}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Stack
          align="center"
          justify="center"
          sx={{ gap: 20 }}
          w={350}
          maw={"100%"}
        >
          {!email ? (
            <ResetPasswordForm cb={onSubmitHandler} />
          ) : (
            <ResetPasswordSuccess email={email} />
          )}
          <Button
            component={Link}
            to="/"
            fullWidth
            variant="transparent"
            mt={-15}
            sx={(theme) => ({ color: theme.fn.primaryColor() })}
          >
            Back to log in
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};
export default ResetPasswordView;

const ResetPasswordForm = ({ cb }: { cb: ResetPasswordHandler }) => {
  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: isEmail("Invalid email"),
    },
  });
  return (
    <>
      <Title
        order={2}
        sx={(theme) => ({ color: theme.fn.primaryColor() })}
        align="center"
        fw={500}
      >
        Forgot your password?
      </Title>
      <Text color="dimmed">Your password will be reset by email.</Text>
      <form
        id="resetPaswordForm"
        onSubmit={form.onSubmit(cb)}
        style={{ width: "100%" }}
      >
        <TextInput
          required
          label="Enter your email adress"
          radius="md"
          withAsterisk={false}
          {...form.getInputProps("email")}
        />
      </form>
      <Box w={"100%"}>
        <Button fullWidth mb={4} type="submit" form="resetPaswordForm">
          Next
        </Button>
      </Box>
    </>
  );
};

const ResetPasswordSuccess = ({ email }: { email: string }) => {
  const theme = useMantineTheme();
  return (
    <>
      <IconMailForward color={theme.fn.primaryColor()} size={40} />
      <Title order={2} align="center">
        Check your email
      </Title>
      <Text align="center" color="dimmed">
        We've sent instructions on how to reset your password to <b>{email}</b>.
      </Text>
    </>
  );
};
