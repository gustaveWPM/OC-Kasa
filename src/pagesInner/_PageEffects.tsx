import type { FunctionComponent, ReactElement } from 'react';
import { useEffect } from 'react';
import type { VocabSchemaElementKey } from '../config/vocab/Vocab';
import { VocabAccessor, isVocabSchemaElementKey } from '../config/vocab/VocabAccessor';
import { snapToTop } from '../dev/plainJS/cameraManager';
import wpmDebugger from '../dev/wpmDebugger';

const DEBUGGER_LABEL = 'Page Effects (React Hook)';
const RESCUE_MODE = true;

export function setPageTitle(title: string) {
  document.title = title;
}

export function strictPageTitleBuilder(labelKey: VocabSchemaElementKey) {
  if (!isVocabSchemaElementKey(labelKey)) {
    throw new Error('strictPageTitleBuilder: Invalid labelKey');
  }

  if (labelKey === 'HOME_PAGE_LABEL') {
    return `${VocabAccessor('BRAND')} | ${VocabAccessor(labelKey)}`;
  }

  return `${VocabAccessor(labelKey as VocabSchemaElementKey)} | ${VocabAccessor('BRAND')}`;
}

export function weakPageTitleBuilder(labelKey: string, rescueMode: boolean = false) {
  if (labelKey === undefined) return document.title;
  if (rescueMode) {
    try {
      return strictPageTitleBuilder(labelKey as VocabSchemaElementKey);
    } catch {}
  }

  return `${labelKey} | ${VocabAccessor('BRAND')}`;
}

interface OnPageChangeEffectsProps {
  labelKey?: string;
  pageTitleBuilderStrictMode?: boolean;
  children: ReactElement;
}

export const OnPageChangeEffects: FunctionComponent<OnPageChangeEffectsProps> = ({ labelKey, pageTitleBuilderStrictMode, children }) => {
  wpmDebugger(DEBUGGER_LABEL, 'Called!');

  useEffect(() => {
    if (labelKey !== undefined) {
      if (pageTitleBuilderStrictMode === undefined) setPageTitle(weakPageTitleBuilder(labelKey, RESCUE_MODE));
      else if (pageTitleBuilderStrictMode) setPageTitle(strictPageTitleBuilder(labelKey as VocabSchemaElementKey));
      else setPageTitle(weakPageTitleBuilder(labelKey));
    }
  }, [labelKey]);

  snapToTop();
  return children;
};

export default OnPageChangeEffects;
