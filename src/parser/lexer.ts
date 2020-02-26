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

/**
 * scanner func convert your text into an array of lexemes
 * @api
 * @param text: String
 * @return String[]
 */

const scanner = (text: String): String[] => {
  let buffer = "";
  const lexemes: String[] = [];

  for (let i = 0; i <= text.length; i++) {
    if (SPACES.indexOf(text[i]) !== -1 || i === text.length) {
      if (buffer.length) lexemes.push(buffer);
      buffer = "";
      continue;
    }
    if (LIMITS.indexOf(text[i]) !== -1) {
      if (buffer.length) lexemes.push(buffer);
      lexemes.push(text[i]);
      buffer = "";
    } else {
      buffer += text[i];
    }
  }

  return lexemes;
};

/**
 * tokenizer convert an array of lexemes into an array of tokens
 * @api
 * @param lexemes: String[]
 * @return Tolken[]
 */

const tokenizer = (lexemes: String[]): Token[] => {
  let context: Context | null = null;

  const getReadableTokenType = (char: Char): any => Char[char]

  const find = (value: String): Char => {

    /**
     *
     * Todo
     * - Start implement unit-test
     * - End of comment line -> // test \n name = "tony"
     * - Multine line expression (white space)
     * - Multiline comment
     * - handle line break
     * - add EOF Char at the end
     */

     // handle error, empty cases
    if (!value || !value.length || value === undefined) return Char.UNKNOWN

    // match lexeme with known chars
    const knownChar: Char = CHARS[value.toString()] || Char.UNKNOWN

    // set context (STRING, COMMENT)
    // @todo (@tony-go) : find something cleaner
    if (knownChar === Char.SIMPLE_QUOTE || knownChar === Char.DOUBLE_QUOTE) {
      context = context === Context.STRING ? null : Context.STRING
    } else if (knownChar === Char.COMMENT_LINE || knownChar === Char.COMMENT_BLOCK) {
      context = context === Context.COMMENT ? null : Context.COMMENT
    }

    // handle unknown multi char lexemes
    if (knownChar === Char.UNKNOWN && value.length > 1) {
      switch (context) {
        case Context.STRING:
          return Char.STRING
        case Context.COMMENT:
          return Char.COMMENT
        default :
          return Char.INDENTIFIER
      }
    }

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
  return tokenizer(lexemes);
};
