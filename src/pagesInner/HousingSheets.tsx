import { FunctionComponent, memo, ReactElement } from 'react';
import { Route } from 'react-router-dom';
import wpmDebugger from '../dev/wpmDebugger';

const DEBUGGER_LABEL = 'Housing Sheets (React Component)';

interface HousingSheetsInnerProps {}

export const HousingSheetsInner: FunctionComponent<HousingSheetsInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  return (
    <>
      <h1>This is housing sheets page</h1>
    </>
  );
};

export function getRouteParams(): ReactElement {
  return (
    <>
      <Route path=":sheet_id" element={<HousingSheetsInner />} />
    </>
  );
}

export default memo(HousingSheetsInner);
