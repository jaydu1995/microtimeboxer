import type { Dispatch, ReactElement, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip } from "react-tooltip";
import { Button } from "@chakra-ui/react";
import { TimerRange, TimerRangeSchema } from "./TimerRangeSchema";

export interface CustomRangeFormProps {
  range: TimerRange;
  setRange: Dispatch<SetStateAction<TimerRange>>;
  setRangeFormDisplayed: Dispatch<SetStateAction<boolean>>;
}

export default function CustomRangeForm({
  range,
  setRange,
  setRangeFormDisplayed,
}: CustomRangeFormProps): ReactElement {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TimerRange>({ resolver: zodResolver(TimerRangeSchema) });
  const onSubmit = handleSubmit((data) => {
    setRangeFormDisplayed(false);
    setRange(data);
  });

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <label
              htmlFor="min-range-input"
              style={{ marginBottom: "0.5rem", fontSize: "14px" }}
            >
              min
            </label>
            <input
              type="number"
              id="min-range-input"
              defaultValue={range.min}
              min={1}
              max={25}
              required
              step={1}
              style={{
                textAlign: "center",
                border: "1px solid black",
              }}
              data-tooltip-id="error"
              data-tooltip-content={errors.min?.message}
              data-tooltip-place="bottom"
              data-tooltip-variant="error"
              {...register("min", { valueAsNumber: true })}
            />
            <span style={{ marginTop: "0.5rem", fontSize: "14px" }}>
              minutes
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <label
              htmlFor="max-range-input"
              style={{ marginBottom: "0.5rem", fontSize: "14px" }}
            >
              max
            </label>
            <input
              type="number"
              id="max-range-input"
              defaultValue={range.max}
              min={1}
              max={25}
              required
              style={{
                textAlign: "center",
                border: "1px solid black",
              }}
              data-tooltip-id="error"
              data-tooltip-content={errors.max?.message}
              data-tooltip-place="bottom"
              data-tooltip-variant="error"
              {...register("max", { valueAsNumber: true })}
            />
            <span style={{ marginTop: "0.5rem", fontSize: "14px" }}>
              minutes
            </span>
          </div>
        </div>

        <Button colorScheme="teal" variant="link" type="submit">
          OK
        </Button>
        <Button
          colorScheme="blackAlpha"
          variant="link"
          onClick={() => setRangeFormDisplayed(false)}
        >
          Cancel
        </Button>
      </form>
      <Tooltip id="error" />
    </>
  );
}
