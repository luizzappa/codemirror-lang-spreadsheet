/* Hand-written tokenizers for excel formula tokens that can't be
  expressed by lezer's built-in tokenizer (or are harder to express). */
import { ExternalTokenizer, InputStream, Stack } from '@lezer/lr';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as tokens from './parser.terms.js';

type supportedIdioms = "en-US" | "pt-BR";
let currIdiom: supportedIdioms = "en-US";
// Always uppercase
const i18n: {
  [key: string]: {
    [key in supportedIdioms]: string[]
  }
} = {
  "BoolToken": {
    "en-US": ["TRUE", "FALSE"],
    "pt-BR": ["VERDADEIRO", "FALSO"]
  }
}

const openParen = 40,
  closeParen = 41,
  backSlash = 92,
  underscore = 95,
  dot = 46,
  questionMark = 63,
  euroSign = 8364,
  isSpace = (charCode: number): boolean => {
    return (
      [
        9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196,
        8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288
      ].indexOf(charCode) !== -1
    );
  },
  isDigit = (charCode: number): boolean => charCode >= 48 && charCode <= 57,
  isAsciiLeter = (charCode: number): boolean => {
    return (
      (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
    );
  };

export const isIntersecop = new ExternalTokenizer(
  (input: InputStream, stack: Stack) => {
    let { next } = input,
      before;

    if (
      !isSpace(next) &&
      ((before = input.peek(-1)) !== closeParen ||
        !isDigit(before) ||
        !isAsciiLeter(before) ||
        before !== backSlash ||
        before !== underscore ||
        before !== dot ||
        before !== questionMark ||
        before !== euroSign)
    )
      return;

    for (;;) {
      next = input.advance();
      if (!isSpace(next)) break;
    }

    if (
      next === openParen ||
      isAsciiLeter(next) ||
      before === backSlash ||
      before === underscore
    )
      return input.acceptToken(tokens.intersecop);
  },
  { contextual: true }
);

export const isBoolean = (value: string, stack: Stack): number => {
  return i18n.BoolToken[currIdiom].indexOf(value.toUpperCase()) !== -1
    ? tokens['BoolToken'] 
    : -1;
};

export const setIdiom = (newIdiom: supportedIdioms): supportedIdioms => currIdiom = newIdiom;