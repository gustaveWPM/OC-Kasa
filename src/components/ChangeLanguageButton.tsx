import { FunctionComponent, ReactElement } from 'react';
import { Vocab, VocabLanguageSymbol } from '../config/vocab/Vocab';
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

export function changeLanguageBtnsGenerator() {
  const btns: ReactElement[] = [];
  for (const vKey in Vocab) {
    const key = vKey as VocabLanguageSymbol;
    btns.push(
      <li key={`change-language-btn-${key}`}>
        <ChangeLanguageBtn targetLang={key} />
      </li>
    );
  }

  return <ul>{btns}</ul>;
}

export default ChangeLanguageBtn;
