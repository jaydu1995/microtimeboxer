import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSound from "use-sound";

import alarm from "@/utils/sounds/alarm.mp3";
import Time from "./Time";
import WorkerTimerClass from "@/utils/WorkerTimer";
import TimerClass from "@/utils/TimerClass";
import randomNum from "@/utils/randomNum";
import formatMS from "@/utils/formatMS";
import { Button, ButtonGroup } from "@chakra-ui/react";
import CustomRangeForm from "./CustomRangeForm";
import { TimerRange } from "./TimerRangeSchema";
import { getSettings } from "@/utils/localStorageUtils";

export interface TimerProps {
  updateTitleDuration?: Dispatch<SetStateAction<string>>;
  useWorker?: boolean;
}

export function Timer({ updateTitleDuration, useWorker }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(180000);
  const [timer, setTimer] = useState<TimerClass | null>(null);
  const [range, setRange] = useState<TimerRange>({ min: 1, max: 6 });
  const [rangeFormDisplayed, setRangeFormDisplayed] = useState(false);
  const [playAlarm] = useSound(alarm);

  const generateRandomDuration = ({ min, max }: TimerRange) => {
    return randomNum(min * 60000, max * 60000, 60000);
  };

  useEffect(() => {
    const userSettings = getSettings();
    userSettings ? setRange(userSettings.timerRange) : null;
    setDuration(generateRandomDuration(range));
  }, []);

  useEffect(() => {
    handleRoll();
  }, [range]);

  const initializeTimer = () => {
    let newTimer;
    if (useWorker) {
      newTimer = new WorkerTimerClass(duration, new Worker("./worker.js"));
    } else {
      newTimer = new TimerClass(duration);
    }
    setTimer(newTimer);
    return newTimer;
  };

  const setTimerCallbacks = (timer: TimerClass) => {
    timer.onTick(() => {
      setDuration(timer.duration);
      updateTitleDuration &&
        updateTitleDuration(formatMS(timer.duration, "MM:SS"));
    });
    timer.onDone(() => {
      setDuration(timer.duration);
      playAlarm();
      setIsRunning(false);
    });
  };

  const startTimer = () => {
    setIsRunning(true);

    if (timer) {
      timer.start();
    } else {
      const newTimer = initializeTimer();
      setTimerCallbacks(newTimer);
      newTimer.start();
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    timer?.pause();
  };

  const handleRoll = () => {
    const newDuration = generateRandomDuration(range);
    setDuration(newDuration);
    timer?.set(newDuration);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        size="lg"
        colorScheme="teal"
        variant="link"
        isDisabled={isRunning}
        className="custom-range-btn"
        onClick={() => setRangeFormDisplayed(!rangeFormDisplayed)}
        marginBottom="5"
      >
        Customize range
      </Button>
      {rangeFormDisplayed && (
        <CustomRangeForm
          range={range}
          setRange={setRange}
          setRangeFormDisplayed={setRangeFormDisplayed}
        />
      )}

      <Time milliseconds={duration} format={"MM:SS"} />
      <ButtonGroup spacing={3}>
        {!isRunning ? (
          <Button
            size="lg"
            colorScheme="teal"
            variant="solid"
            onClick={startTimer}
            isDisabled={isRunning || duration === 0}
          >
            Start
          </Button>
        ) : (
          <Button
            size="lg"
            colorScheme="red"
            variant="solid"
            onClick={pauseTimer}
            isDisabled={!isRunning}
          >
            Pause
          </Button>
        )}

        <Button
          size="lg"
          colorScheme="teal"
          variant="outline"
          onClick={handleRoll}
          isDisabled={isRunning}
        >
          Roll
        </Button>
      </ButtonGroup>
    </div>
  );
}
