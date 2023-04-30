/*
 * A Timer class that can be used to create timers and execute callbacks
 * on each tick and when the timer is finished.
 */
export default class Timer {
  protected _duration: number;
  protected intervalId: NodeJS.Timeout | null; // ID returned by setInterval() when the timer is started
  protected interval: number = 1000;
  protected onTickCallbacks: (() => void)[]; // Array of callbacks to be executed on each tick of the timer
  protected onDoneCallbacks: (() => void)[]; // Array of callbacks to be executed when the timer finishes

  /**
   * Constructor for the Timer class.
   * @param duration - The total duration of the timer in milliseconds (default is 0). If negative, it will be set to 0.
   * @param interval - The time interval between ticks in milliseconds (default is 1000).
   */
  constructor(duration: number = 0, interval: number = 1000) {
    this._duration = this.checkDuration(duration);
    this.interval = interval;
    this.intervalId = null;
    this.onTickCallbacks = [];
    this.onDoneCallbacks = [];
  }

  // The duration of the timer in milliseconds.
  get duration() {
    return this._duration;
  }

  /**
   * Starts the timer.
   */
  start() {
    this.intervalId = setInterval(() => {
      if (this._duration <= 0) {
        this.onDoneCallbacks.forEach((cb) => cb());
        this.pause();
        return;
      }
      this._duration -= this.interval;
      this.onTickCallbacks.forEach((cb) => cb());
    }, this.interval);
  }

  /**
   * Pauses the timer.
   */
  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Checks if the timer is running.
   * @returns True if the timer is running, otherwise false.
   * @example
   * const timer = new Timer(1000);
   * timer.start();
   * console.log(timer.isRunning()); // true
   * timer.stop();
   * console.log(timer.isRunning()); // false
   */
  isRunning() {
    return this.intervalId !== null;
  }

  /**
   * Resets the timer.
   * Stops the timer and sets the duration to 0.
   * Removes all callbacks.
   */
  reset() {
    this.pause();
    this._duration = 0;
    this.onTickCallbacks = [];
    this.onDoneCallbacks = [];
  }

  /**
   * Sets the duration of the timer.
   * @param duration - The total duration of the timer in milliseconds. If negative, it will be set to 0.
   */
  set(duration: number) {
    this._duration = this.checkDuration(duration);
  }

  /**
   * Checks if the duration is valid.
   * @param duration - The total duration of the timer in milliseconds.
   * @returns The duration if it is valid, otherwise 0.
   *
   * @protected
   */
  protected checkDuration(duration: number) {
    if (duration < 0) {
      const newDuration = 0;
      console.warn("Timer duration cannot be negative. Setting duration to 0.");
      return newDuration;
    }
    return duration;
  }

  /**
   * Adds a callback function to be executed on each tick of the timer.
   * @param cb - The callback function to be executed on each tick of the timer.
   */
  onTick(cb: () => void) {
    this.onTickCallbacks.push(cb);
  }

  /**
   * Adds a callback function to be executed when the timer finishes.
   * @param cb - The callback function to be executed when the timer finishes.
   */
  onDone(cb: () => void) {
    this.onDoneCallbacks.push(cb);
  }
}
