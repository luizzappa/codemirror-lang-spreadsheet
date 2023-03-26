import { LRLanguage, LanguageSupport } from '@codemirror/language';
type TdecimalSeparator = "." | ",";
type TsupportedIdioms = "en-US" | "pt-BR";
declare const spreadsheetLanguage: LRLanguage;
declare const changeIdiom: (newIdiom: TsupportedIdioms) => TsupportedIdioms, changeDecimalSeparator: (newDecimalSeparator: TdecimalSeparator) => TdecimalSeparator;
declare function spreadsheet(idiom?: TsupportedIdioms, decimalSeparator?: TdecimalSeparator): LanguageSupport;
export { spreadsheetLanguage, changeIdiom, changeDecimalSeparator, spreadsheet };
