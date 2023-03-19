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
        CellToken: t.variableName,
        BoolToken: t.bool
        // String: t.string,
        // LineComment: t.lineComment,
        // '( )': t.paren
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
