export type TimeFormat = "MM:SS" | "HH:MM:SS" | "HH:MM";

/**
 * Formats an amount of time in milliseconds according to a specified format.
 *
 * @param milliseconds The amount of time in milliseconds to format. Defaults
 * to 0 if no or negative value is specified.
 * @param format The desired format for the output string.
 * Accepted formats are "MM:SS", "HH:MM:SS", and "HH:MM". Defaults to "MM:SS"
 * if no or an invalid format is specified.
 * @returns The formatted time string.
 */
export default function formatMS(
  milliseconds: number,
  format: TimeFormat
): string {
  milliseconds < 0 && (milliseconds = 0);

  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);

  let formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  let formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  if (format === "MM:SS") {
    return `${formattedMinutes}:${formattedSeconds}`;
  } else if (format === "HH:MM:SS") {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else if (format === "HH:MM") {
    return `${formattedHours}:${formattedMinutes}`;
  } else {
    console.warn("Invalid format specified. Defaulting to MM:SS format.");
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
