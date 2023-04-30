import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSound from "use-sound";

import alarm from "@/utils/sounds/alarm.mp3";
import Time from "./Time";
import WorkerTimerClass from "@/utils/WorkerTimer";
import TimerClass from "@/utils/TimerClass";
import randomNum from "@/utils/randomNum";
import formatMS from "@/utils/formatMS";

export interface TimerProps {
  updateTitleDuration?: Dispatch<SetStateAction<string>>;
  useWorker?: boolean;
}

export function Timer({ updateTitleDuration, useWorker }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(180000);
  const [timer, setTimer] = useState<TimerClass | null>(null);
  const [playAlarm] = useSound(alarm);

  const generateRandomDuration = () => {
    return randomNum(60000, 360000, 60000);
  };

  useEffect(() => {
    setDuration(generateRandomDuration());
  }, []);

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

  const stopTimer = () => {
    setIsRunning(false);
    timer?.pause();
  };

  const handleRoll = () => {
    const newDuration = generateRandomDuration();
    setDuration(newDuration);
    timer?.set(newDuration);
  };

  return (
    <div>
      <Time milliseconds={duration} format={"MM:SS"} />
      <button onClick={startTimer} disabled={isRunning || duration === 0}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handleRoll} disabled={isRunning}>
        Roll
      </button>
    </div>
  );
}
