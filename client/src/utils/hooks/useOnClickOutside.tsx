import { useEffect, MutableRefObject } from "react";

type HandlerFunction = (event: MouseEvent | TouchEvent) => void;

const useOnClickOutside = <T extends Node = Node>(
  ref: MutableRefObject<T>,
  action: HandlerFunction
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      if (
        !ref.current ||
        !(event.target instanceof Node) ||
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      action(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, action]);
};

export default useOnClickOutside;
