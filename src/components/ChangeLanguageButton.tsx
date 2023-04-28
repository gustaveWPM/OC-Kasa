import { FunctionComponent } from 'react';
import { VocabLanguageSymbol } from '../config/vocab/Vocab';
import { alreadyCurrentUserVocabLanguageSymbol, setCurrentLanguageInLocalStorage } from '../config/vocab/VocabAccessor';
import { useAppContext } from '../contexts/AppContext';

export type Mutators = { dummyState: number; fnPtr: Function } | null;
interface ChangeLanguageBtnProps {
  targetLang: VocabLanguageSymbol;
  mutators: Mutators;
}

const ChangeLanguageBtn: FunctionComponent<ChangeLanguageBtnProps> = ({ targetLang, mutators = null }) => {
  const { dispatch } = useAppContext();
  const testi18n = (lang: VocabLanguageSymbol) => {
    if (alreadyCurrentUserVocabLanguageSymbol(lang)) {
      return;
    }
    setCurrentLanguageInLocalStorage(lang);
    if (mutators) {
      mutators.fnPtr(mutators.dummyState);
    }
    dispatch({ event: 'FORCE_UPDATE' });
  };

  return <button onClick={() => testi18n(targetLang)}>{targetLang.toUpperCase()}</button>;
};

export default ChangeLanguageBtn;
