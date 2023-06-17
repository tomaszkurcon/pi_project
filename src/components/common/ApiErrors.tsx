import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

type TApiErrors = {
    error_message:string
}
const ApiErrors = ({error_message}:TApiErrors) => {
   
  return (
    <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        {error_message}
    </Alert>
  );
};

export default ApiErrors;
