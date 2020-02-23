import { SPACE, LIMITS } from './constants'
import { Char, Token } from './types'

const CHARS: { [index: string]: Char } = {
  "eof": Char.EOF,
  "function": Char.FUNC,
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
  "%": Char.MODULO
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
  const getReadableTokenType = (char: Char): any => Char[char]

  const find = (value: String): Char => {
    if (!value || !value.length || value === undefined) return Char.UNKNOWN
    const knownChar: Char = CHARS[value.toString()]
    return knownChar || Char.UNKNOWN
  };

  return lexemes.map(lex => {
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
