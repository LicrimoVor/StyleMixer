import { useEffect, useRef } from "react";

/** useEffect, который выполняется только 1 раз при монтаже компонента */
export const useInitialEffect = (callback: () => void) => {
  const initRef = useRef(false);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      callback();
    }
  }, []);
};
