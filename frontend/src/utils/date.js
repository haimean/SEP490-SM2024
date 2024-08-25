import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";

export const dateUntil = {
  getStringTime:(date)=>{
    return formatInTimeZone(
      parseISO(date),
      "UTC",
      "HH:mm"
    )
  }
};
