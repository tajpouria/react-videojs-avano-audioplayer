/**
 * Convert seconds to stringified and prefixed with zero hour/minutes/round(seconds)
 * @param totalSeconds
 */
export function secondsToHHMMSS(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);

  const addZero = (t: number) =>
    t.toString().length >= 2 ? t.toString() : "0".concat(t.toString());

  return {
    hours: addZero(hours),
    minutes: addZero(minutes),
    seconds: addZero(seconds)
  };
}
