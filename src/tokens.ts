/* Hand-written tokenizers for excel formula tokens that can't be
  expressed by lezer's built-in tokenizer (or are harder to express). */
import { ExternalTokenizer, InputStream, Stack } from '@lezer/lr';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as tokens from './parser.terms.js';

const backSlash = 92,
  comma = 44,
  closeParen = 41,
  dot = 46,
  euroSign = 8364,
  openParen = 40,
  questionMark = 63,
  semiColon = 59,
  underscore = 95,
  isAsciiLeter = (charCode: number): boolean => {
    return (
      (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
    );
  },
  isDigit = (charCode: number): boolean => charCode >= 48 && charCode <= 57,
  isSpace = (charCode: number): boolean => {
    return (
      [
        9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196,
        8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288
      ].indexOf(charCode) !== -1
    );
  };

export type supportedIdioms = 'en-US' | 'pt-BR';
let currIdiom: supportedIdioms = 'en-US';
// Always uppercase
// Source: https://en.excel-translator.de/
const i18n: {
  [key: string]: {
    [key in supportedIdioms]: string[] | string | number;
  };
} = {
  BoolToken: {
    'en-US': ['TRUE', 'FALSE'],
    'pt-BR': ['VERDADEIRO', 'FALSO']
  },
  RefErrorToken: {
    'en-US': '#REF!',
    'pt-BR': '#REF!'
  },
  ErrorToken: {
    'en-US': [
      '#NULL!',
      '#DIV/0!',
      '#VALUE!',
      '#NAME?',
      '#NUM!',
      '#N/A',
      '#GETTING_DATA',
      '#SPILL!'
    ],
    'pt-BR': [
      '#NULO!',
      '#DIV/0!',
      '#VALOR!',
      '#NOME?',
      '#NÚM!',
      '#N/D',
      '#OBTENDO_DADOS',
      '#DESPEJAR!'
    ]
  },
  separator: {
    'en-US': comma,
    'pt-BR': semiColon
  },
  arrayRowSeparator: {
    'en-US': ',',
    'pt-BR': '\\'
  }
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

export const separator = new ExternalTokenizer(
  (input: InputStream, stack: Stack) => {
    const { next } = input;
    if (i18n.separator[currIdiom] === next)
      return input.acceptToken(tokens.separator, 1);
  }
);

export const isArrayRowSeparator = (value: string, stack: Stack): number => {
  return value === i18n.arrayRowSeparator[currIdiom]
    ? tokens['arrayRowSeparator']
    : -1;
};

export const desambiguateNameToken = (value: string, stack: Stack): number => {
  if (
    (i18n.BoolToken[currIdiom] as string[]).indexOf(value.toUpperCase()) !== -1
  ) {
    return tokens['BoolToken'];
  }
  return -1;
};

export const isRefErrorToken = (value: string, stack: Stack): number => {
  if (
    (i18n.RefErrorToken[currIdiom] as string[]).indexOf(value.toUpperCase()) !==
    -1
  ) {
    return tokens['RefErrorToken'];
  } else if (
    (i18n.ErrorToken[currIdiom] as string[]).indexOf(value.toUpperCase()) !== -1
  ) {
    return tokens['ErrorToken'];
  }
  return -1;
};

export const setLezerIdiom = (newIdiom: supportedIdioms): supportedIdioms =>
  (currIdiom = newIdiom);
