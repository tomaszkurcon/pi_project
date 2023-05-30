import { useEffect, useState } from "react";
import { useToggle, upperFirst } from "@mantine/hooks";

import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
  Flex,
  Title,
  Transition,
} from "@mantine/core";
import { useForm, isEmail} from "@mantine/form";
import { Link, useSearchParams } from "react-router-dom";
import { login } from "../api/auth/login";
import { register } from "../api/auth/register";

const AuthForm = (props: PaperProps) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('mode') === 'login' ? 'login' : 'register';
  const form = useForm({
    initialValues: {
      email: '',
      password:'',
      repeated_password:''
    },
  
    validate: {
      email: isEmail('Invalid email'),
    },
  })
 
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => setIsOpen(true), []);
  return (
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
        <form onSubmit={form.onSubmit((values) => {type === 'login' ? login(values) : register(values)})}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@email.com"
              radius="md"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              radius="md"
              {...form.getInputProps('password')}
            />
            {type === "register" && (
              <PasswordInput
                label="Repeat password"
                placeholder="Password"
                required
                radius="md"
                {...form.getInputProps('repeated_password')}
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Link to={`?mode=${type === 'login' ? 'register' : 'login'}`}>
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            </Link>
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
  );
};

export default AuthForm;