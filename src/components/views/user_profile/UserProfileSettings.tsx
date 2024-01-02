//TODO
//Add global state for loading component!
import {
  Button,
  Card,
  Divider,
  Flex,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import KeyValuePair, { TKeyValue } from "../../common/KeyValuePair";
import { useForm } from "@mantine/form";
import { usePostFetch } from "../../../api/api_hooks/usePostFetch";
import { useOutletContext } from "react-router-dom";
import { TUserData } from "../UserProfileView";
import toast from "react-hot-toast";

type TUserProfileContext = {
  refetch: () => void;
  user: TUserData;
};
const UserProfileSettings = () => {
  return (
    <Flex gap={20} p={{ md: 10 }} direction={{ base: "column", md: "row" }}>
      <BasicInfoCard />
      <PasswordCard />
    </Flex>
  );
};

export default UserProfileSettings;

const BasicInfoCard = () => {
  const { refetch, user } = useOutletContext<TUserProfileContext>();
  const { mutate, loading } = usePostFetch("dashboard/updateUser", {}, "PUT");

  const userBasicInfo = [
    { label: "Fullname", name: "fullname", value: user.fullname },
    { label: "Username", name: "username", value: user.username },
  ];
  //TODO
  //Here I should create userData type and val should be keyof userData
  const onEditHandler = async (val: TKeyValue): Promise<boolean> => {
    return mutate({ [val.name]: val.value }, refetch);
  };
  return (
    <Card shadow="lg" w={{ md: "50%" }} radius={"lg"} p={20}>
      {loading && (
        <LoadingOverlay
          loaderProps={{ size: "xl", variant: "dots" }}
          overlayOpacity={0.3}
          overlayColor="#c5c5c5"
          visible
          zIndex={1000}
          sx={{ position: "fixed" }}
        />
      )}
      <Title order={4}>Basic information</Title>
      <Text color="dimmed" mb={20}>
        Your details that are visible to other people
      </Text>
      {userBasicInfo.map((info) => (
        <>
          <Divider my={13} />
          <KeyValuePair
            label={info.label}
            name={info.name}
            value={info.value}
            onEdit={onEditHandler}
          />
        </>
      ))}
    </Card>
  );
};

type TSetNewPasswordFields = {
  newPassword: string;
  currentPassword: string;
};
const PasswordCard = () => {
  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const { mutate, loading } = usePostFetch<TSetNewPasswordFields>(
    "dashboard/updatePassword",
    {
      onSuccess: () => {
        form.reset();
        toast.success("Password has been changed successfully");
      },
      onError: (err) => {
        form.setFieldError('currentPassword', err);
      }
    },
    "PUT"
  );
  const onSubmitHandler = (values: TSetNewPasswordFields) => {
    mutate(values);
  };
  return (
    <Card shadow="lg" w={{ md: "50%" }} radius={"lg"} p={20}>
      
      {loading && (
        <LoadingOverlay
          loaderProps={{ size: "xl", variant: "dots" }}
          overlayOpacity={0.3}
          overlayColor="#c5c5c5"
          visible
          zIndex={1000}
          sx={{ position: "fixed" }}
        />
      )}
      <Title order={4}>Password</Title>
      <Text color="dimmed" mb={20}>
        Please enter your current password to change the password.
      </Text>
      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <Stack w={{ md: "75%" }}>
          <PasswordInput
            required
            label="Current password"
            radius="md"
            withAsterisk={false}
            {...form.getInputProps("currentPassword")}
          />
          <PasswordInput
            required
            label="New passowrd"
            radius="md"
            withAsterisk={false}
            {...form.getInputProps("newPassword")}
          />
        </Stack>
        <Button type="submit" mt={15}>
          Change
        </Button>
      </form>
    </Card>
  );
};
