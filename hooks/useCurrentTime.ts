import { useEffect, useState } from "react";

/**
 * Returns the current time and updates it every minute.
 */
export function useCurrentTime(): Date {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // every 60 seconds

    return () => clearInterval(timer);
  }, []);

  return currentTime;
}
