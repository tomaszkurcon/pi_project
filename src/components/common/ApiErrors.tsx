import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

const ApiErrors = () => {
  return (
    <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
      Something terrible happened!
    </Alert>
  );
};

export default ApiErrors;
