import { SPACE, LIMITS } from './constants'
import { Char, Token } from './types'

const CHARS: { [index: string]: Char } = {
  "eof": Char.EOF,
  "fn": Char.FUNC,
  "->": Char.ARROW_FUNC,
  "var": Char.VARIABLE,
  "(": Char.OPEN_PAR,
  ")": Char.CLOSE_PAR,
  "{": Char.OPEN_CURLY_BRA,
  "}": Char.CLOSE_CURLY_BRA,
  "[": Char.OPEN_BRA,
  "]": Char.CLOSE_BRA,
  ";": Char.SEMI_COL,
  ",": Char.COL,
  "<": Char.SMALLER,
  "<=": Char.SMALLER_EQ,
  ">": Char.GREATER,
  ">=": Char.GREATER_EQ,
  "=": Char.ASSIGN,
  "==": Char.DOUBLE_EQ,
  "===": Char.TRIPLE_EQ,
  "-": Char.MINUS,
  "+": Char.PLUS,
  "*": Char.STAR,
  "/": Char.SLASH,
  "%": Char.MODULO,
  "'": Char.SIMPLE_QUOTE,
  "\"": Char.DOUBLE_QUOTE,
};

const scanner = (text: String): String[] => {
  const lexemes: String[] = [];
  let lex = "";

  for (let i = 0; i <= text.length; i++) {
    if (text[i] === SPACE || i === text.length) {
      if (lex.length) lexemes.push(lex);
      lex = "";
      continue;
    }
    if (LIMITS.indexOf(text[i]) !== -1) {
      if (lex.length) lexemes.push(lex);
      lexemes.push(text[i]);
      lex = "";
    } else {
      lex += text[i];
    }
  }

  return lexemes;
};

const tokennizer = (lexemes: String[]): Token[] => {
  let prevChar: Char;
  let inFuncParenthese = false;
  
  const getReadableTokenType = (char: Char): any => Char[char]

  const find = (value: String): Char => {
    if (!value || !value.length || value === undefined) return Char.UNKNOWN
    const knownChar: Char = CHARS[value.toString()] || Char.UNKNOWN

    if (knownChar === Char.OPEN_PAR && prevChar === Char.INDENTIFIER) {
      inFuncParenthese = true
    }
    if (knownChar === Char.CLOSE_PAR && inFuncParenthese) {
      inFuncParenthese = false
    }
    if (knownChar === Char.UNKNOWN && value.length > 1) {
      if (prevChar === Char.VARIABLE || prevChar === Char.FUNC) {
        prevChar = Char.INDENTIFIER
        return Char.INDENTIFIER
      }
      if (prevChar === Char.DOUBLE_QUOTE || prevChar === Char.SIMPLE_QUOTE) {
        prevChar = Char.STRING
        return Char.STRING
      }
      if (inFuncParenthese) {
        prevChar = Char.ARG
        return Char.ARG
      }

    }
    prevChar = knownChar
    return knownChar
  };

  return lexemes.map((lex: String) => {
    const type: Char = find(lex)
    return {
      type,
      typeName: getReadableTokenType(type),
      value: lex,
    };
  });
};

export default (text: String): Token[] => {
  const lexemes = scanner(text);
  return tokennizer(lexemes);
};
