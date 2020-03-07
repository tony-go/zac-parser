import { Char, Token } from '../lexer/types'
import { getReadableTokenType } from '../lexer'

import { Node, BaseAST } from './types'

// payload example

const ex = [
  { type: 2, typeName: 'FUNC', value: 'fn' },
  { type: 28, typeName: 'INDENTIFIER', value: 'get' },
  { type: 5, typeName: 'OPEN_PAR', value: '(' },
  { type: 28, typeName: 'INDENTIFIER', value: 'name' },
  { type: 6, typeName: 'CLOSE_PAR', value: ')' },
  { type: 3, typeName: 'ARROW_FUNC', value: '->' },
  { type: 7, typeName: 'OPEN_CURLY_BRA', value: '{' },
  { type: 8, typeName: 'CLOSE_CURLY_BRA', value: '}' },
  { type: 11, typeName: 'SEMI_COL', value: ';' },
  { type: 1, typeName: 'EOF', value: 'eof' },
]

export default (tokens: Token[]): BaseAST => {
  // variables
  // const lineNumber = 0
  const position = 0

  // define ast
  const ast: BaseAST = {
    type: Node.Program,
    body: [],
  }

  // define parsers
  const parseFunction = (tokens: Token[], position: number) => {}
  const parseAssignement = (tokens: Token[], position: number) => {}
  const parserOperation = (tokens: Token[], position: number) => {}
  const parseComment = (tokens: Token[], position: number) => {}
  // ...

  // define global parser
  const parseProgram = (tokens: Token[]) => {
    let token = tokens[position]
    switch (token.type) {
      case Char.FUNC:
        return parseFunction(tokens, position)
      case Char.INDENTIFIER || Char.VARIABLE:
        return parseAssignement(tokens, position)
      case Char.NUMBER:
        return parserOperation(tokens, position)
      case Char.COMMENT_BLOCK || Char.COMMENT_LINE:
        return parseComment(tokens, position)
      default:
        break
    }
  }

  // apply parser
  while (position < tokens.length) {
    ast.body.push(parseProgram(tokens))
  }

  return ast
}
