export interface Token {
  type: Char
  typeName: String
  value: String // Lexeme
}

export enum Context {
  NULL,
  COMMENT,
  STRING,
}

export enum Char {
  NULL,
  EOF,
  FUNC,
  ARROW_FUNC,
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
  MODULO,
  SIMPLE_QUOTE,
  DOUBLE_QUOTE,
  UNKNOWN,
  INDENTIFIER,
  STRING,
  COMMENT_LINE,
  COMMENT_BLOCK,
  COMMENT,
  LINE_BREAK,
}
