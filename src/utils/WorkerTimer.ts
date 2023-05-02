import Timer from "./TimerClass";

// This Web Worker implementation of the Timer class is needed to prevent the
// timer from lagging when the tab is inactive.

export default class WorkerTimer extends Timer {
  private worker: Worker;

  constructor(duration: number = 0, worker: Worker, interval: number = 1000) {
    super();
    this._duration = this.checkDuration(duration);
    this.interval = interval;

    this.worker = worker;
    this.worker.addEventListener("message", (event) => {
      const data = event.data;
      if (data.type === "tick") {
        this._duration = data.duration;
        this.onTickCallbacks.forEach((cb) => cb());
        this.worker.postMessage({
          type: "currentTime",
          currentTime: Date.now(),
        });
      } else if (data.type === "done") {
        this._duration = 0;
        this.onDoneCallbacks.forEach((cb) => cb());
        this.pause();
      }
    });
  }

  start() {
    this.worker.postMessage({
      type: "start",
      duration: this._duration,
      interval: this.interval,
      startTime: Date.now(),
    });
  }

  pause() {
    this.worker.postMessage({ type: "pause" });
  }
}
