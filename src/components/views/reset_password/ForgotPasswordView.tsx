import { Box, Button, TextInput, useMantineTheme } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useState } from "react";

import { usePostFetch } from "../../../api/api_hooks/usePostFetch";

import ResetForgotPasswordModal from "./ResetForgotPasswordModal";

import ResetForgotPasswordSuccess from "./ResetForgotPasswordSuccess";
import { IconMailForward} from "@tabler/icons-react";

type ForgotPasswordFields = {
  email: string;
};
type ForgotPasswordHandler = (values: ForgotPasswordFields) => void;

const ForgotPasswordView = () => {
  const [email, setEmail] = useState<string>();
  const { mutate } = usePostFetch<ForgotPasswordFields, ForgotPasswordFields>(
    "auth/forgot_password",
    {
      onSuccess: (res) => {
        setEmail(res?.email);
      },
      withTokens: false,
    },
    "POST"
  );
  const theme = useMantineTheme();
  const onSubmitHandler = (values: ForgotPasswordFields) => {
    mutate(values);
  };

  return (
    <ResetForgotPasswordModal
      title={!email ? "Forgot your password?" : ""}
      text={!email ? "Your password will be reset by email." : ""}
    >
      {!email ? (
        <ForgotPasswordForm cb={onSubmitHandler} />
      ) : (
        <ResetForgotPasswordSuccess
          title={"Check your email"}
          text={
            <>
              We've sent instructions on how to reset your password to
              <b> {email}</b>
            </>
          }
          icon={<IconMailForward color={theme.fn.primaryColor()} size={40} />}
        />
      )}
    </ResetForgotPasswordModal>
  );
};
export default ForgotPasswordView;

const ForgotPasswordForm = ({ cb }: { cb: ForgotPasswordHandler }) => {
  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: isEmail("Invalid email"),
    },
  });
  return (
    <>
      <form
        id="forgotPaswordForm"
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
        <Button fullWidth mb={4} type="submit" form="forgotPaswordForm">
          Next
        </Button>
      </Box>
      
    </>
  );
};
