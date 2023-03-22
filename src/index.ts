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
  // languageData: {
  //   commentTokens: { line: ';' }
  // }
});

export function spreadsheet() {
  return new LanguageSupport(spreadsheetLanguage);
}
