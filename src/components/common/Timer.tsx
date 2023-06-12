import { Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { formatSecondsToTime } from "../utils/formatSecondsToTime";

export type TimeType = {
  seconds: number | string;
  minutes: number | string;
  hours: number | string;
};
type TimerProps = {
  isRunning: boolean;
  getTime?: (time: TimeType) => void;
};
const Timer = ({ isRunning, getTime }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState<TimeType>({
    seconds: 0,
    hours: 0,
    minutes: 0,
  });
  useEffect(() => {
    let interval: NodeJS.Timer;
    isRunning
      ? (interval = setInterval(() => setSeconds((prev) => prev + 1), 1000))
      : getTime && getTime(time);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);
  useEffect(() => {
    setTime(formatSecondsToTime(seconds));
  }, [seconds]);
  return (
    <Text fz="lg">
      {time.hours}:{time.minutes}:{time.seconds}
    </Text>
  );
};

export default Timer;
