import { FunctionComponent } from 'react';
import changeLanguageBtnsGenerator from './ChangeLanguageButtonsGenerator';
import ChangeThemeButton from './ChangeThemeButton';

import './styles/settings.scss';

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  return (
    <div className="kasa-settings">
      {changeLanguageBtnsGenerator()}
      <ChangeThemeButton />
    </div>
  );
};

export default Settings;
