import { FunctionComponent } from 'react';
import { VocabLanguageSymbol } from '../config/vocab/Vocab';
import { alreadyCurrentUserVocabLanguageSymbol, setCurrentLanguageInLocalStorage } from '../config/vocab/VocabAccessor';
import { useAppContext } from '../contexts/AppContext';

export type Mutators = { dummyState: number; fnPtr: Function } | null;
interface ChangeLanguageBtnProps {
  targetLang: VocabLanguageSymbol;
}

const ChangeLanguageBtn: FunctionComponent<ChangeLanguageBtnProps> = ({ targetLang }) => {
  const { dispatch } = useAppContext();
  const changeLang = (lang: VocabLanguageSymbol) => {
    if (alreadyCurrentUserVocabLanguageSymbol(lang)) {
      return;
    }
    setCurrentLanguageInLocalStorage(lang);
    dispatch({ event: 'FORCE_UPDATE' });
  };

  return <button onClick={() => changeLang(targetLang)}>{targetLang.toUpperCase()}</button>;
};

export default ChangeLanguageBtn;
