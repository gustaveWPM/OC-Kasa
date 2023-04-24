import { FunctionComponent, memo } from 'react';
import wpmDebugger from '../dev/wpmDebugger';

const DEBUGGER_LABEL = 'Kasa Card (React Component)';

interface KasaCardProps {
  id: string;
  title: string;
  cover: string;
}

const KasaCard: FunctionComponent<KasaCardProps> = ({ id, title, cover }) => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  return <></>;
};

export default memo(KasaCard);
