import { parser } from './syntax.grammar';
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent
} from '@codemirror/language';
import { styleTags, tags as t } from '@lezer/highlight';

import {
  setLezerIdiom,
  TsupportedIdioms,
  setDecimalSeparator,
  TdecimalSeparator
} from './tokens';

export const spreadsheetLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ')', align: false })
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        // References
        'Reference/...': t.color,
        CellToken: t.tagName,
        VerticalRangeToken: t.tagName,
        HorizontalRangeToken: t.tagName,
        RefErrorToken: t.invalid,
        // Constants
        BoolToken: t.bool,
        ErrorToken: t.invalid,
        NumberToken: t.number,
        TextToken: t.string,
        // Functions
        Function: t.function(t.name),
        // Symbols
        OpenParen: t.name,
        CloseParen: t.name,
        '[ ]': t.squareBracket,
        '{ }': t.brace
      })
    ]
  })
});

export const changeIdiom = setLezerIdiom,
  changeDecimalSeparator = setDecimalSeparator;

export type Toptions = {
  idiom?: TsupportedIdioms;
  decimalSeparator?: TdecimalSeparator;
};
export function spreadsheet({
  idiom = 'en-US',
  decimalSeparator = '.'
}: Toptions = {}) {
  setLezerIdiom(idiom);
  setDecimalSeparator(decimalSeparator);
  return new LanguageSupport(spreadsheetLanguage);
}
