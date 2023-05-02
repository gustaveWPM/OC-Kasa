import { FunctionComponent, ReactElement } from 'react';
import changeLanguagesBtns, { SCROLL_LATENCY_MS } from '../config/ChangeLanguageBtns';
import { Vocab, VocabLanguageSymbol } from '../config/vocab/Vocab';
import { alreadyCurrentUserVocabLanguageSymbol, setCurrentLanguageInLocalStorage } from '../config/vocab/VocabAccessor';
import { useAppContext } from '../contexts/AppContext';

import './styles/changeLanguageBtn.scss';

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
    const oldScrollY = window.scrollY;
    setCurrentLanguageInLocalStorage(lang);
    dispatch({ event: 'FORCE_UPDATE' });
    setTimeout(() => {
      if (window.scrollY === 0) {
        window.scrollTo({ top: oldScrollY, behavior: 'smooth' });
      }
    }, SCROLL_LATENCY_MS);
  };

  return (
    <button aria-label={changeLanguagesBtns[targetLang].label} className="change-language-btn" onClick={() => changeLang(targetLang)}>
      {changeLanguagesBtns[targetLang].txt}
    </button>
  );
};

export function changeLanguageBtnsGenerator() {
  const btns: ReactElement[] = [];
  for (const vKey in Vocab) {
    const key = vKey as VocabLanguageSymbol;
    btns.push(
      <li className="change-language-btn-element" key={`change-language-btn-${key}`}>
        <ChangeLanguageBtn targetLang={key} />
      </li>
    );
  }

  return <ul className="change-language-btns-elements">{btns}</ul>;
}

export default ChangeLanguageBtn;
