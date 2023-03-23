import { LRLanguage, LanguageSupport } from '@codemirror/language';
type supportedIdioms = "en-US" | "pt-BR";
declare const setIdiom: (newIdiom: supportedIdioms) => supportedIdioms;
declare const spreadsheetLanguage: LRLanguage;
declare function spreadsheet(): LanguageSupport;
export { setIdiom, spreadsheetLanguage, spreadsheet };
