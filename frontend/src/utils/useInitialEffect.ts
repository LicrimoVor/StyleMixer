import { useEffect, useRef } from "react";

export const useInitialEffect = (callback: () => void) => {
  const initRef = useRef(false);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      callback();
    }
  }, []);
};
