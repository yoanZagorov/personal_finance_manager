import { useRef, useEffect } from "react";

export default function useAutoFocus(ref) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [])

  return ref;
}