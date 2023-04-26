import { useState } from 'react';

export function useForceUpdate() {
  const LIMIT_TO_AVOID_BIG_NUMBER_IN_RAM = 99;
  const [value, setValue] = useState(0);
  return () => setValue((value) => (value + 1) % LIMIT_TO_AVOID_BIG_NUMBER_IN_RAM);
}

export default useForceUpdate;
