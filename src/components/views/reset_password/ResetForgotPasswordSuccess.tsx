import { Text, Title } from "@mantine/core";


type TForgotResetPasswordSuccessProps = {
  title: string;
  text: React.ReactNode;
  icon?: React.ReactNode;
};
const ResetForgotPasswordSuccess = ({
  title,
  text,
  icon,
}: TForgotResetPasswordSuccessProps) => {
  return (
    <>
      {icon}
      <Title order={2} align="center">
        {title}
      </Title>
      <Text align="center" color="dimmed">
        {text}
      </Text>
    </>
  );
};

export default ResetForgotPasswordSuccess;
