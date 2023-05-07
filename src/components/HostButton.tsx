import { FunctionComponent, memo } from 'react';

interface HostButtonProps {
  host: { name: string; picture: string };
}

const HostButton: FunctionComponent<HostButtonProps> = ({ host }) => {
  return (
    <div className="housing-sheet-host-wrapper">
      <div className="housing-sheet-host-container">
        <p className="housing-sheet-host-name">{host.name}</p>
        <img className="housing-sheet-host-picture" src={host.picture} alt={host.name} />
      </div>
    </div>
  );
};

export default memo(HostButton);
