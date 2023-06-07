import { z } from "zod";

export type TimerRange = {
  min: number;
  max: number;
};

export const TimerRangeSchema = z
  .object({
    min: z
      .number({
        required_error: "Minimum is required",
        invalid_type_error: "Minimum must be a whole number between 1 and 25",
      })
      .int()
      .lte(25, { message: "Minimum must be a whole number between 1 and 25" })
      .gte(1, { message: "Minimum must be a whole number between 1 and 25" }),
    max: z
      .number({
        required_error: "Maximum is required",
        invalid_type_error: "Maximum must be a whole number between 1 and 25",
      })
      .int()
      .lte(25, { message: "Maximum must be a whole number between 1 and 25" })
      .gte(1, { message: "Maximum must be a whole number between 1 and 25" }),
  })
  .refine((schema) => schema.max >= schema.min, {
    path: ["min"],
    message: "Minimum cannot be greater than maximum",
  });
