import { useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { UserType } from "../context/AuthContext";
import CustomModal from "./CustomModal";
import { Alert, Button, Flex, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

type ProtectedRouteProps = {
  user?: UserType;
  expiredToken?: boolean;
};
const ProtectedRoute = ({ user, expiredToken }: ProtectedRouteProps) => {
  const [opened, setOpened] = useState(true);
  const icon = <IconInfoCircle />;
  if (!user && !expiredToken) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      {expiredToken && (
        <CustomModal
          opened={opened}
          onClose={() => setOpened(false)}
          zIndex={1000}
          centered
          withCloseButton={false}
          size={800}
          p={0}
          closeOnClickOutside={false}
          styles={{ body: { padding: 0 } }}
        >
          <Alert variant="light" title="Session expired" icon={icon} p="lg">
            <Text size="md" fw={500}>
              Your session have expired! Please log in again to gain access
            </Text>
            <Flex justify="flex-end" >
              <Button component={"a"} type="submit" href="/auth" radius="xl">Login Page</Button>
            </Flex>
          </Alert>
        </CustomModal>
      )}
      <Outlet />
    </>
  );
};
export default ProtectedRoute;
