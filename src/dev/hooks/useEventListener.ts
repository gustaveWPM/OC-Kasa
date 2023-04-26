import { useEffect, useRef } from 'react';

export function useEventListener(eventName: string, handler: Function, element = window) {
  const savedHandler = useRef();
  useEffect(() => {
    (savedHandler.current as any) = handler;
  }, [handler]);
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event: Event) => (savedHandler.current as any)(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
