import { Box, Button, PasswordInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { usePostFetch } from "../../../api/api_hooks/usePostFetch";
import { useSearchParams } from "react-router-dom";
import ResetForgotPasswordModal from "./ResetForgotPasswordModal";
import ApiErrors from "../../common/ApiErrors";
import ResetForgotPasswordSuccess from "./ResetForgotPasswordSuccess";
import { IconMoodHappy } from "@tabler/icons-react";

type ResetPasswordFields = {
  password: string;
  confirmPassword: string;
};
type ResetPasswordHandler = (values: ResetPasswordFields) => void;

const ResetPasswordView = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const theme = useMantineTheme();
  const { response, mutate, error } = usePostFetch<ResetPasswordFields>(
    `auth/reset_password?token=${token}`,
    {
      withTokens: false,
    },
    "PUT"
  );
  console.log(error)
  return (
    <ResetForgotPasswordModal
      title={!response ? "Reset your password" : ""}
      text={!response ? "We will set new password for you" : ""}
    >
      {!response ? (
        <ResetPasswordForm cb={mutate} />
      ) : (
        <ResetForgotPasswordSuccess
          title="Success!"
          text="Your password has been changed"
          icon={<IconMoodHappy color={theme.fn.primaryColor()} size={40} />}
        />
      )}
      <ApiErrors error_message={error} w={"100%"} />
      
    </ResetForgotPasswordModal>
  );
};

export default ResetPasswordView;

const ResetPasswordForm = ({ cb }: { cb: ResetPasswordHandler }) => {
  const form = useForm({
    initialValues: { password: "", confirmPassword: "" },
  });
  return (
    <>
      <form
        id="resetPaswordForm"
        onSubmit={form.onSubmit((values) => cb(values))}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <PasswordInput
          required
          label="Enter new password"
          radius="md"
          withAsterisk={false}
          {...form.getInputProps("password")}
        />
        <PasswordInput
          required
          label="Confirm password"
          radius="md"
          withAsterisk={false}
          {...form.getInputProps("confirmPassword")}
        />
      </form>
      <Box w={"100%"}>
        <Button fullWidth mb={4} type="submit" form="resetPaswordForm">
          Reset
        </Button>
      </Box>
    </>
  );
};
