import type { RefObject } from 'react';

export const getRefCurrentPtr = <T>(ref: RefObject<T>) => ref.current as T;
