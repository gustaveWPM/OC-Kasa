import { FunctionComponent } from 'react';
import changeLanguagesBtns, { SCROLL_LATENCY_MS } from '../config/ChangeLanguageBtns';
import { VocabLanguageSymbol } from '../config/vocab/Vocab';
import { alreadyCurrentUserVocabLanguageSymbol, setCurrentLanguageInLocalStorage } from '../config/vocab/VocabAccessor';
import { useAppContext } from '../contexts/AppContext';
import { moveToPos } from '../dev/plainJS/cameraManager';

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
        moveToPos(oldScrollY);
      }
    }, SCROLL_LATENCY_MS);
  };

  return (
    <button aria-label={changeLanguagesBtns[targetLang].label} className="change-language-btn" onClick={() => changeLang(targetLang)}>
      {changeLanguagesBtns[targetLang].txt}
    </button>
  );
};

export default ChangeLanguageBtn;
