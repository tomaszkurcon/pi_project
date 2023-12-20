import { Alert, AlertProps } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

type TApiErrors = {
  error_message: string | null;
} & Partial<AlertProps>;
const ApiErrors = ({ error_message, ...props }: TApiErrors) => {
  return (
    <>
      {error_message && (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Error!"
          color="red"
          {...props}
        >
          {error_message}
        </Alert>
      )}
    </>
  );
};

export default ApiErrors;
