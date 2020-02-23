export interface Token {
  type: Char,
  typeName: String,
  value: String // Lexeme
}

export enum Char {
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
  MODULO,
  UNKNOWN
}