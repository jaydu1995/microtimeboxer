export default function randomNum(min: number, max: number, step: number = 1) {
  const range = (max - min) / step;
  const rand = Math.floor(Math.random() * (range + 1));
  const result = rand * step + min;
  return result > max ? result - step : result;
}
