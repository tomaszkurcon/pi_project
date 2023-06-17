
import { formatSecondsToTime } from "./formatSecondsToTime";

export const createStringFromTime = (seconds:number) => {
    const time = formatSecondsToTime(seconds)
    return `${time.hours}:${time.minutes}:${time.seconds}`
}