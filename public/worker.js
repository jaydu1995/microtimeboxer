let intervalId;
let startTime;
let currentTime;

self.addEventListener("message", (event) => {
  const data = event.data;
  if (data.type === "start") {
    currentTime = data.startTime;
    start(data.startTime, data.duration, data.interval);
  } else if (data.type === "pause") {
    clearInterval(intervalId);
  } else if (data.type === "currentTime") {
    currentTime = data.currentTime;
  }
});

function start(startTime, duration, interval) {
  let endTime = startTime + duration;
  intervalId = setInterval(() => {
    // Round duration
    duration = Math.ceil((endTime - currentTime) / 1000) * 1000;
    self.postMessage({ type: "tick", duration });
    if (duration <= 0) {
      clearInterval(intervalId);
      self.postMessage({ type: "done" });
    }
  }, interval);
}
