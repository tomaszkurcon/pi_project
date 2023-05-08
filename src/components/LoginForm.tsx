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

const LoginForm = (props: PaperProps) => {
  const [type, toggle] = useToggle(["login", "register"]);
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
        <form onSubmit={() => {}}>
          <Stack>
            {type === "register" && (
              <TextInput label="Name" placeholder="Your name" radius="md" />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
      <Flex justify="flex-start" maw={500} sx={{ width: "100%" }}>
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

export default LoginForm;
