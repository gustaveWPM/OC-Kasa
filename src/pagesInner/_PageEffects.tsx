import { FunctionComponent, ReactElement, useEffect } from 'react';
import { VocabSchemaElementKey } from '../config/vocab/Vocab';
import { isVocabSchemaElementKey, VocabAccessor } from '../config/vocab/VocabAccessor';

export function setPageTitle(title: string) {
  document.title = title;
}

export function strictPageTitleBuilder(labelKey: VocabSchemaElementKey) {
  if (labelKey === 'HOME_PAGE_LABEL') {
    return `Kasa | ${VocabAccessor(labelKey)}`;
  }

  return `${VocabAccessor(labelKey as VocabSchemaElementKey)} | Kasa`;
}

export function weakPageTitleBuilder(labelKey: string, rescueMode: boolean = false) {
  if (rescueMode && isVocabSchemaElementKey(labelKey)) {
    return strictPageTitleBuilder(labelKey as VocabSchemaElementKey);
  }

  return `${labelKey} | Kasa`;
}

interface OnPageChangeEffectsProps {
  title: string | null;
  children: ReactElement;
}

export const OnPageChangeEffects: FunctionComponent<OnPageChangeEffectsProps> = ({ title, children }) => {
  useEffect(() => {
    if (title !== null) {
      setPageTitle(title);
    }
  }, [title]);

  window.scrollTo(0, 0);
  return children;
};

export default OnPageChangeEffects;
