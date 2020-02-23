const LIMITS = ["(", ")", ";", ",", "[", "]", "{", "}"];
const SPACE = " ";

enum Token {
  EOF,
  FUNC,
  VARIABLE,
  OPEN_PAR,
  CLOSE_PAR,
  OPEN_CURLY_BRA,
  CLOSE_CURLY_BRA,
  OPEN_BRA,
  CLOSE_BRA,
  SEMI_COL,
  COL,
  SMALLER,
  SMALLER_EQ,
  GREATER,
  GREATER_EQ,
  ASSIGN,
  DOUBLE_EQ,
  TRIPLE_EQ,
  MINUS,
  PLUS,
  STAR,
  SLASH,
  MODULO
}

const UNITS = {
  eof: Token.EOF,
  function: Token.FUNC,
  var: Token.VARIABLE,
  "(": Token.OPEN_PAR,
  ")": Token.CLOSE_PAR,
  "{": Token.OPEN_CURLY_BRA,
  "}": Token.CLOSE_CURLY_BRA,
  "[": Token.OPEN_BRA,
  "]": Token.CLOSE_BRA,
  ";": Token.SEMI_COL,
  ",": Token.COL,
  "<": Token.SMALLER,
  "<=": Token.SMALLER_EQ,
  ">": Token.GREATER,
  ">=": Token.GREATER_EQ,
  "=": Token.ASSIGN,
  "==": Token.DOUBLE_EQ,
  "===": Token.TRIPLE_EQ,
  "-": Token.MINUS,
  "+": Token.PLUS,
  "*": Token.STAR,
  "/": Token.SLASH,
  "%": Token.MODULO
};

const scanner = (text: String): String[] => {
  const lexemes: String[] = [];
  let lex = "";

  for (let i = 0; i < text.length; i++) {
    if (text[i] === SPACE) {
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

const tokennizer = (lexemes: String[]): any[] => {
  console.log("top", Token.EOF);
  const find = (value: String): String => {
    // implement switch here
    return 'lol'
  };

  return lexemes.map(lex => {
    return {
      value: lex,
      name: find(lex)
    };
  });
};

export default (text: String): String[] => {
  const lexemes = scanner(text);
  return tokennizer(lexemes);
};
