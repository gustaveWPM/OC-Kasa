import type { ReactElement } from 'react';
import type { VocabLanguageSymbol } from '../config/vocab/Vocab';
import Vocab from '../config/vocab/Vocab';
import ChangeLanguageBtn from './ChangeLanguageButton';

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

export default changeLanguageBtnsGenerator;
