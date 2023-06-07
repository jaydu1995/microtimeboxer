import { Dispatch, ReactElement, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip } from "react-tooltip";
import { Button } from "@chakra-ui/react";
import { saveSettings } from "@/utils/localStorageUtils";
import { TimerRange } from "@/types/TimerRangeSchema";
import { UserSettings, UserSettingsSchema } from "@/types/UserSettings";

export interface SettingsFormProps {
  range: TimerRange;
  setRange: Dispatch<SetStateAction<TimerRange>>;
  setSettingsDisplayed: Dispatch<SetStateAction<boolean>>;
}

export default function SettingsForm({
  range,
  setRange,
  setSettingsDisplayed,
}: SettingsFormProps): ReactElement {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<UserSettings>({ resolver: zodResolver(UserSettingsSchema) });
  const onSubmit = handleSubmit((data) => {
    setSettingsDisplayed(false);
    setRange(data.timerRange);
    if (data.remember) {
      saveSettings(data);
    }
  });
  const handleReset = () => {
    reset({ timerRange: { min: 1, max: 6 } });
  };

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        <Button
          onClick={handleReset}
          size="xs"
          colorScheme="gray"
          variant="link"
        >
          Reset
        </Button>
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
              data-tooltip-content={errors.timerRange?.min?.message}
              data-tooltip-place="bottom"
              data-tooltip-variant="error"
              {...register("timerRange.min", { valueAsNumber: true })}
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
              data-tooltip-content={errors.timerRange?.max?.message}
              data-tooltip-place="bottom"
              data-tooltip-variant="error"
              {...register("timerRange.max", { valueAsNumber: true })}
            />
            <span style={{ marginTop: "0.5rem", fontSize: "14px" }}>
              minutes
            </span>
          </div>
        </div>
        <div className="div">
          <input
            style={{ margin: "0.4rem", marginBottom: "0.8rem" }}
            type="checkbox"
            id="remember"
            {...register("remember")}
          />
          <label style={{ fontSize: "12px" }} htmlFor="remember">
            Remember settings
          </label>
        </div>
        <Button colorScheme="teal" variant="link" type="submit">
          OK
        </Button>
        <Button
          colorScheme="red"
          variant="link"
          onClick={() => setSettingsDisplayed(false)}
        >
          Cancel
        </Button>
      </form>
      <Tooltip id="error" />
    </>
  );
}
