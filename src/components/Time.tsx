import formatMS, { TimeFormat } from "@/utils/formatMS";

interface TimeProps {
  milliseconds: number;
  format: TimeFormat;
}

/**
 * A component that displays an amount of time in a specified format.
 *
 * @param milliseconds The amount of time to display in milliseconds. If
 * negative, it will be set to 0.
 * @param format The desired format for the output string.
 * @returns A React element that displays the formatted duration.
 */
export default function Time({ milliseconds, format }: TimeProps) {
  milliseconds < 0 && (milliseconds = 0);

  return (
    <div className="time" data-time-ms={milliseconds}>
      {formatMS(milliseconds, format)}
    </div>
  );
}
