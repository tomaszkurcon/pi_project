import { useEffect, useState } from "react";
import { upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Button,
  Stack,
  Flex,
  Title,
  Transition,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useForm, isEmail } from "@mantine/form";
import { useSearchParams } from "react-router-dom";

import { RegisterFields } from "../api/auth/auth_types";
import { Toaster, toast } from "react-hot-toast";
import { useLogin } from "../api/api_hooks/useLogin";
import { register } from "../api/auth/register";
import AnchorLink from "./common/AnchorLink";

const AuthForm = (props: PaperProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, loading } = useLogin();
  const type = searchParams.get("mode") || "login";
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: isEmail("Invalid email"),
    },
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => setIsOpen(true), []);

  const registerHandler = async (values: RegisterFields) => {
    const response = await register(values);
    const data = await response?.json();
    if (response?.status === 201) {
      setSearchParams({ mode: "login" });
      form.reset();
      toast.success(data.msg);
    } else {
      toast.error(data.error);
    }
  };

  return (
    <>
      {loading && (
        <LoadingOverlay
          loaderProps={{ size: "xl", variant: "dots" }}
          overlayOpacity={0.3}
          overlayColor="#c5c5c5"
          visible
          zIndex={1000}
        />
      )}
      <Toaster />
      <Stack
        justify="center"
        align="flex-end"
        sx={(theme) => ({
          flexGrow: 1,
          [theme.fn.smallerThan("sm")]: { alignItems: "center" },
        })}
      >
        <Transition
          mounted={isOpen}
          transition="slide-right"
          duration={600}
          timingFunction="ease"
        >
          {(styles) => (
            <Title
              order={1}
              size={60}
              style={styles}
              sx={(theme) => ({ color: theme.fn.primaryColor() })}
            >
              Discover
            </Title>
          )}
        </Transition>

        <Paper radius="md" p={40} withBorder {...props} maw={500} w="100%">
          <form
            onSubmit={form.onSubmit((values) => {
              type === "login" ? login(values) : registerHandler(values);
            })}
          >
            <Stack>
              <TextInput
                required
                label="Email"
                placeholder="hello@email.com"
                radius="md"
                {...form.getInputProps("email")}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                radius="md"
                {...form.getInputProps("password")}
              />
              {type === "register" && (
                <PasswordInput
                  label="Confirm password"
                  placeholder="Password"
                  required
                  radius="md"
                  {...form.getInputProps("confirmPassword")}
                />
              )}
            </Stack>

            <Group position="apart" mt="xl">
              <Stack sx={{ gap: 0 }}>
                <AnchorLink
                  to={`?mode=${type === "login" ? "register" : "login"}`}
                >
                  {type === "register" ? (
                    <>
                      <Text>Already have an account? Login</Text>
                    </>
                  ) : (
                    <>
                      <Text>Don't have an account? Register</Text>
                    </>
                  )}
                </AnchorLink>

                {type === "login" && (
                  <AnchorLink to={"/reset-password"}>
                    <Text>Forgot passowrd? Reset</Text>
                  </AnchorLink>
                )}
              </Stack>

              <Button type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
        <Flex
          justify={{ sm: "flex-start" }}
          maw={500}
          sx={(theme) => ({
            width: "100%",
            [theme.fn.smallerThan("sm")]: { justifyContent: "center" },
          })}
        >
          <Transition
            mounted={isOpen}
            transition="slide-left"
            duration={600}
            timingFunction="ease"
          >
            {(styles) => (
              <Title
                order={1}
                size={60}
                style={styles}
                sx={(theme) => ({ color: theme.fn.primaryColor() })}
              >
                With us!
              </Title>
            )}
          </Transition>
        </Flex>
      </Stack>
    </>
  );
};

export default AuthForm;
