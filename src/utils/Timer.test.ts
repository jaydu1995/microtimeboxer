import Timer from "./Timer";

describe("Timer", () => {
  let timer: Timer;
  let duration: number;
  let interval: number;
  let mockTickCallback: jest.Mock;
  let mockDoneCallback: jest.Mock;

  beforeEach(() => {
    duration = 180000;
    interval = 1000;
    timer = new Timer(duration, interval);
    mockTickCallback = jest.fn();
    mockDoneCallback = jest.fn();
    timer.onTick(mockTickCallback);
    timer.onDone(mockDoneCallback);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("testing core timer functionlity", () => {
    it("should start the timer", () => {
      timer.start();

      jest.advanceTimersByTime(interval + 1);

      expect(timer.isRunning()).toBe(true);
      expect(timer.duration).toBe(duration - interval);
    });

    it("should pause the timer", () => {
      timer.start();

      jest.advanceTimersByTime(interval + 1);

      timer.pause();

      jest.advanceTimersByTime(interval + 1);

      expect(timer.isRunning()).toBe(false);
      expect(timer.duration).toBe(duration - interval);

      timer.pause();
    });

    it("should reset the timer", () => {
      timer.start();

      jest.advanceTimersByTime(interval + 1);

      timer.reset();

      expect(timer.isRunning()).toBe(false);
      expect(timer.duration).toBe(0);
    });

    it("should set the timer", () => {
      timer.start();

      jest.advanceTimersByTime(interval + 1);

      timer.set(1000);

      expect(timer.duration).toBe(1000);
    });

    it("should call onTick on every interval", () => {
      timer.start();

      jest.advanceTimersByTime(interval + 1);

      expect(mockTickCallback).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(interval + 1);

      expect(mockTickCallback).toHaveBeenCalledTimes(2);
    });

    it("call onDone callback when timer is done", () => {
      timer.start();

      jest.advanceTimersByTime(duration + interval);

      expect(mockDoneCallback).toHaveBeenCalledTimes(1);
      expect(timer.isRunning()).toBe(false);
      expect(timer.duration).toBe(0);
    });
  });
});
