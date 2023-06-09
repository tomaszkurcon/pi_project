import { TimeType } from "../common/Timer";

export const formatSecondsToTime = (seconds: number):TimeType => {

  const time = {
    seconds: Math.floor(seconds%60).toString().padStart(2, '0'),
    minutes: Math.floor(seconds / 60 % 60).toString().padStart(2, '0'),
    hours: Math.floor(seconds / 3600).toString().padStart(2, '0'),
  };

  return time;
};
