import { z } from "zod";
import { TimerRange, TimerRangeSchema } from "./TimerRangeSchema";

export type UserSettings = {
  timerRange: TimerRange;
  remember: boolean;
};

export const UserSettingsSchema = z.object({
  timerRange: TimerRangeSchema,
  remember: z.boolean(),
});
