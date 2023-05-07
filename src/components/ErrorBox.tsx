import { FunctionComponent, memo } from 'react';

import './styles/errorBox.scss';

interface ErrorBoxProps {
  origin: string;
  advice: string;
}

const ErrorBox: FunctionComponent<ErrorBoxProps> = ({ origin, advice }) => {
  return (
    <div className="error-box">
      <p className="msg">
        {origin}
        <br />
        {advice}
      </p>
    </div>
  );
};

export default memo(ErrorBox);
