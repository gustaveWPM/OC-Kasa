import { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { FORCE_UPDATE_STATE_LIMIT_TO_AVOID_HUGE_NUMBER_IN_RAM } from './_conf/consts';

export function useForceUpdate(valuePtr: number, valueSetterPtr: Function) {
  const { state } = useAppContext();

  useEffect(() => {
    valueSetterPtr((valuePtr + 1) % FORCE_UPDATE_STATE_LIMIT_TO_AVOID_HUGE_NUMBER_IN_RAM);
  }, [state.mutator]);
}
