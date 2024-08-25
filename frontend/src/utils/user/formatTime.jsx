import { format, parseISO } from "date-fns";

export default function FormatTime(data) {
  return format(parseISO(data), "HH:mm");
}
