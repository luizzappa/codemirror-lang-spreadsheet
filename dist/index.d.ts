import { LRLanguage, LanguageSupport } from '@codemirror/language';
type supportedIdioms = "en-US" | "pt-BR";
declare const spreadsheetLanguage: LRLanguage;
declare const changeIdiom: (newIdiom: supportedIdioms) => supportedIdioms;
declare function spreadsheet(idiom?: supportedIdioms): LanguageSupport;
export { spreadsheetLanguage, changeIdiom, spreadsheet };
