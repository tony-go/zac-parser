import { SPACES, LIMITS } from './constants'
import { Char, Context, Token } from './types'

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
  "//": Char.COMMENT_LINE,
  "/->": Char.COMMENT_BLOCK,
};

const scanner = (text: String): String[] => {
  const lexemes: String[] = [];
  let lex = "";

  for (let i = 0; i <= text.length; i++) {
    if (SPACES.indexOf(text[i]) !== -1 || i === text.length) {
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
  let context: Context | null = null;

  const getReadableTokenType = (char: Char): any => Char[char]

  const find = (value: String): Char => {

    /**
     *
     * Todo
     * - End of comment line -> // test \n name = "tony"
     * - Multine line expression (white space)
     * - Multiline comment
     * - add EOF Char at the end
     */

     // handle error, empty cases
    if (!value || !value.length || value === undefined) return Char.UNKNOWN

    // match lexeme with known chars
    const knownChar: Char = CHARS[value.toString()] || Char.UNKNOWN

    // set context (STRING, COMMENT)
    if (knownChar === Char.SIMPLE_QUOTE || knownChar === Char.DOUBLE_QUOTE) {
      context = context === Context.STRING ? null : Context.STRING
    }
    if (knownChar === Char.COMMENT_LINE) {
      context = context === Context.COMMENT ? null : Context.COMMENT
    }

    // handle multi char lexemes
    if (knownChar === Char.UNKNOWN && value.length > 1) {
      if (context === Context.STRING) {
        prevChar = Char.STRING
        return Char.STRING
      }
      if (context === Context.COMMENT) {
        prevChar = Char.COMMENT
        return Char.COMMENT
      }
      if (
        prevChar === Char.VARIABLE
        || prevChar === Char.FUNC
        || context !== Context.STRING
      ) {
        prevChar = Char.INDENTIFIER
        return Char.INDENTIFIER
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
