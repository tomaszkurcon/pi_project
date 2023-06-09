import {
  Box,
  Card,
  Center,
  Code,
  Flex,
  PinInput,
  Stack,
  Text,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck, IconClockHour4, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Timer from "../common/Timer";

const useStyles = createStyles((theme) => ({
  valid_input: {
    borderColor: "green",
    color: "green",
    outlineColor: "green",
  },
}));

const WritePiView = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [mistakesCounter, setMistakesCounter] = useState(0);
  const [enteredDigitsCounter, setEnteredDigitsCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const pi = "141592653";
  const onChangeHandler = (
    ev: string,
    index: number,
    fields_length: number
  ) => {
    if (index == 0) {
      setIsRunning(true);
    }
    const fieldState = methods.getFieldState(`digitInputs.${index}.value`);
    methods.setValue(`digitInputs.${index}.value`, ev);
    if (ev != "") {
      setEnteredDigitsCounter((prev) => prev + 1);
    } else {
      setEnteredDigitsCounter((prev) => prev - 1);
    }
    if (fieldState.error && ev == "") {
      return;
    }
    if (fieldState.error) {
      methods.clearErrors(`digitInputs.${index}.value`);
    }
    if (pi[index] != ev) {
      methods.setError(`digitInputs.${index}.value`, {});
      setMistakesCounter((prev) => prev + 1);
      console.log(mistakesCounter);
    }
    if (fields_length == index + 1) {
      append({ value: "" });
    }
  };

  const { control, register, ...methods } = useForm({
    defaultValues: {
      digitInputs: [{ value: "" }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "digitInputs",
  });

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md">
        <Center sx={{ marginBottom: 40 }}>
          <Stack align="center" sx={{ textAlign: "center" }}>
            <Title order={2} color={theme.primaryColor}>
              Check how many digits of number 𝝅 do you actually remember!
            </Title>
            <Text>To begin just start writing</Text>
          </Stack>
        </Center>

        <Center>
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify={"space-around"}
            w={"100%"}
            wrap="wrap"
          >
            <Flex align="center" gap={5}>
              <IconClockHour4 color="lightBlue" size={40} />
              <Text>Czas: </Text>
              <Timer isRunning={isRunning} />
              <button
                onClick={() => {
                  setIsRunning(false);
                }}
              >
                stop
              </button>
            </Flex>
            <Flex align="center" gap={5}>
              <IconCheck color="green" size={40} />
              <Text>Wpisane litery: {enteredDigitsCounter}</Text>
            </Flex>
            <Flex align="center" gap={5}>
              <IconX color="red" size={40} />
              <Text>Popełnione błędy: {mistakesCounter}</Text>
            </Flex>
          </Flex>
        </Center>
      </Card>

      <Flex mt={20} gap={"xs"} wrap="wrap">
        <Box sx={{ flexShrink: 0 }}>
          <Code color="blue" sx={{ fontSize: 30 }}>
            𝝅 = 3,
          </Code>
        </Box>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            name={`digitInputs.${index}.value`}
            render={({ field: { ref, value, ...field }, fieldState }) => {
              const { error } = fieldState;
              let error2 = error ? true : false;
              let isDirty = true;
              if (value == "") {
                isDirty = false;
              }

              let isValid = !error && isDirty;

              return (
                <PinInput
                  {...field}
                  ref={ref}
                  error={error2}
                  length={1}
                  placeholder=""
                  onChange={(ev) => onChangeHandler(ev, index, fields.length)}
                  autoFocus={index > 0 && true}
                  classNames={isValid ? { input: classes.valid_input } : {}}
                />
              );
            }}
          />
        ))}
      </Flex>
    </>
  );
};

export default WritePiView;
