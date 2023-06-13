import {
  Box,
  Button,
  Card,
  Center,
  Code,
  Divider,
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
import Timer, { TimeType } from "../common/Timer";
import { useDisclosure } from "@mantine/hooks";
import { PI } from "../utils/pi";
import CustomModal from "../common/CustomModal";
import { usePostFetch } from "../../api/api_hooks/usePostFetch";
import { formatSecondsToTime } from "../utils/formatSecondsToTime";

const useStyles = createStyles((theme) => ({
  valid_input: {
    borderColor: "green",
    color: "green",
    outlineColor: "green",
  },
}));

type WritePiViewProps = {
  setKey: React.Dispatch<React.SetStateAction<number>>;
};
const WritePiView = ({ setKey }: WritePiViewProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [mistakesCounter, setMistakesCounter] = useState(0);
  const [enteredDigitsCounter, setEnteredDigitsCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [canEdit, setCanEdit] = useState(true);
  const [time, setTime] = useState<TimeType>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [seconds, setSeconds] = useState(0);
  const {loading, response, error, mutate} = usePostFetch("addAttempt");
  
  const { control, register, ...methods } = useForm({
    defaultValues: {
      digitInputs: [{ value: "" }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "digitInputs",
  });
  const [opened, { open, close }] = useDisclosure(false);
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
    if (PI[index] != ev) {
      methods.setError(`digitInputs.${index}.value`, {});
      setMistakesCounter((prev) => prev + 1);
    }
    if (fields_length == index + 1) {
      append({ value: "" });
    }
  };
  const onEndAttemptHandler = () => {
    //TODO
    //SAVE DATA TO DATEBASE
    const data = {
      enteredDigits: enteredDigitsCounter,
      mistakes: mistakesCounter,
      time: seconds
    };
    mutate(data);
    setKey((prev) => prev + 1);
  };
  const getTime = (time:number) => {
    setSeconds(time);
    setTime(formatSecondsToTime(time));
  };
  
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md">
        <Center sx={{ marginBottom: 40 }}>
          <Stack align="center" sx={{ textAlign: "center" }}>
            <Title order={2} color={theme.primaryColor}>
              Check how many digits of number 𝝅 do you actually remember!
            </Title>
            <Text fz="xl">To begin just start writing</Text>
          </Stack>
        </Center>

        <Center>
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify={"space-around"}
            w={"100%"}
            wrap="wrap"
          >
            <Flex
              align="center"
              gap={20}
              wrap="wrap"
              sx={(theme) => ({
                [theme.fn.smallerThan("sm")]: { marginBottom: 20 },
              })}
            >
              <Flex gap={5} align="center">
                <IconClockHour4 color="lightBlue" size={40} />
                <Text fz="lg">Time: </Text>
                <Timer isRunning={isRunning} getTime={getTime} />
              </Flex>

              {!canEdit ? (
                <Flex gap={10}>
                  <Button
                    color="green"
                    radius="md"
                    compact
                    onClick={() => {
                      setIsRunning(true);
                      setCanEdit(true);
                    }}
                  >
                    RERUN
                  </Button>
                  <Button
                    color="red"
                    radius="md"
                    compact
                    onClick={() => {
                      open();
                    }}
                  >
                    END ATTEMPT
                  </Button>
                </Flex>
              ) : (
                <Button
                  color="red"
                  disabled={!isRunning}
                  radius="md"
                  compact
                  onClick={() => {
                    setIsRunning(false);
                    setCanEdit(false);
                  }}
                >
                  STOP
                </Button>
              )}
            </Flex>
            <Flex align="center" gap={5}>
              <IconCheck color="green" size={40} />
              <Text fz="lg">Entered Digits: {enteredDigitsCounter}</Text>
            </Flex>
            <Flex align="center" gap={5}>
              <IconX color="red" size={40} />
              <Text fz="lg">Mistakes: {mistakesCounter}</Text>
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
              let isDirty = value == "" ? false : true;
              let isValid = !error && isDirty;
              return (
                <PinInput
                  {...field}
                  ref={ref}
                  error={error2}
                  length={1}
                  placeholder=""
                  value={value}
                  onChange={(ev) => onChangeHandler(ev, index, fields.length)}
                  autoFocus={index > 0 && true}
                  classNames={isValid ? { input: classes.valid_input } : {}}
                  disabled={!canEdit}
                />
              );
            }}
          />
        ))}
      </Flex>

      <CustomModal
        opened={opened}
        onClose={close}
        zIndex={1000}
        centered
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
      >
        <Card>
          <Stack>
            <Flex gap={5} align="center">
              <IconClockHour4 color="lightBlue" size={40} />
              <Text fz="lg">
                Time: {time.hours}:{time.minutes}:{time.seconds}
              </Text>
            </Flex>
            <Divider />
            <Flex align="center" gap={5}>
              <IconCheck color="green" size={40} />
              <Text fz="lg">Entered digits: {enteredDigitsCounter}</Text>
            </Flex>
            <Divider />
            <Flex align="center" gap={5}>
              <IconX color="red" size={40} />
              <Text fz="lg">Mistakes: {mistakesCounter}</Text>
            </Flex>
          </Stack>
          <Center mt={40}>
            <Button radius="lg" onClick={() => onEndAttemptHandler()}>
              Restart
            </Button>
          </Center>
        </Card>
      </CustomModal>
    </>
  );
};

const WritePiViewWithKey = () => {
  const [attemptId, setAttemptId] = useState<number>(1);
  return <WritePiView key={attemptId} setKey={setAttemptId} />;
};

export default WritePiViewWithKey;
