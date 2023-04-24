import Vocab, { DEFAULT_LANGUAGE, VocabLanguageSymbol, VocabSchemaElementKey } from './Vocab';

function getCurrentUserVocabLanguageSymbol(): VocabLanguageSymbol {
  return DEFAULT_LANGUAGE;
}

export function isVocabSchemaElementKey(s: string) {
  return s in Vocab[DEFAULT_LANGUAGE];
}

export function VocabAccessor(vocabSchemaElementKey: VocabSchemaElementKey): string {
  return Vocab[getCurrentUserVocabLanguageSymbol()][vocabSchemaElementKey];
}
