import { createRef, useEffect, useState } from "react";

export default function useNearScreen<T extends Element>({
  distance = "100px",
} = {}) {
  const [isNearScreen, setShow] = useState(false);
  const fromRef = createRef<T>();

  useEffect(() => {
    let observer: IntersectionObserver;

    const onChange = (
      entries: Array<IntersectionObserverEntry>,
      observer: IntersectionObserver
    ) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        observer.disconnect();
      } else {
        setShow(false);
      }
    };

    observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });

    fromRef.current && observer.observe(fromRef.current);

    return () => observer && observer.disconnect();
  });

  return { isNearScreen, fromRef };
}
