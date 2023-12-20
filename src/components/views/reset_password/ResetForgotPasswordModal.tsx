import { Button, Card, Container, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
type TResetForgotPasswordModalProps = {
  children: React.ReactNode;
  title?: string;
  text?: string;
};
const ResetForgotPasswordModal = ({
  children,
  title,
  text,
}: TResetForgotPasswordModalProps) => {
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
          {title && (
            <Title
              order={2}
              sx={(theme) => ({ color: theme.fn.primaryColor() })}
              align="center"
              fw={500}
            >
              {title}
            </Title>
          )}
          {text && <Text color="dimmed">{text}</Text>}

          {children}
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

export default ResetForgotPasswordModal;
