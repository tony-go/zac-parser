import lexer, { getReadableTokenType } from '.'
import { Char } from './types'

describe('#Lexer', () => {
  it('should scan assignement', () => {
    const tokens = lexer('name = tony;')
    expect(tokens).toEqual([
      {
        type: Char.INDENTIFIER,
        typeName: getReadableTokenType(Char.INDENTIFIER),
        value: 'name',
      },
      {
        type: Char.ASSIGN,
        typeName: getReadableTokenType(Char.ASSIGN),
        value: '=',
      },
      {
        type: Char.INDENTIFIER,
        typeName: getReadableTokenType(Char.INDENTIFIER),
        value: 'tony',
      },
      {
        type: Char.SEMI_COL,
        typeName: getReadableTokenType(Char.SEMI_COL),
        value: ';',
      },
    ])
  })

  it('should handle break line', () => {
    const tokens = lexer('// test \n name = "tony"')

    expect(tokens).toEqual([
      {
        type: Char.COMMENT_LINE,
        typeName: getReadableTokenType(Char.COMMENT_LINE),
        value: '//',
      },
      {
        type: Char.COMMENT,
        typeName: getReadableTokenType(Char.COMMENT),
        value: 'test',
      },
      {
        type: Char.EOF,
        typeName: getReadableTokenType(Char.EOF),
        value: 'eof',
      },
      {
        type: Char.INDENTIFIER,
        typeName: getReadableTokenType(Char.INDENTIFIER),
        value: 'name',
      },
      {
        type: Char.ASSIGN,
        typeName: getReadableTokenType(Char.ASSIGN),
        value: '=',
      },
      {
        type: Char.DOUBLE_QUOTE,
        typeName: getReadableTokenType(Char.DOUBLE_QUOTE),
        value: '"',
      },
      {
        type: Char.STRING,
        typeName: getReadableTokenType(Char.STRING),
        value: 'tony',
      },
      {
        type: Char.DOUBLE_QUOTE,
        typeName: getReadableTokenType(Char.DOUBLE_QUOTE),
        value: '"',
      },
    ])
  })

  it('should scan function', () => {
    const tokens = lexer('fn get (name) -> {};')

    expect(tokens).toEqual([
      {
        type: Char.FUNC,
        typeName: getReadableTokenType(Char.FUNC),
        value: 'fn',
      },
      {
        type: Char.INDENTIFIER,
        typeName: getReadableTokenType(Char.INDENTIFIER),
        value: 'get',
      },
      {
        type: Char.OPEN_PAR,
        typeName: getReadableTokenType(Char.OPEN_PAR),
        value: '(',
      },
      {
        type: Char.INDENTIFIER,
        typeName: getReadableTokenType(Char.INDENTIFIER),
        value: 'name',
      },
      {
        type: Char.CLOSE_PAR,
        typeName: getReadableTokenType(Char.CLOSE_PAR),
        value: ')',
      },
      {
        type: Char.ARROW_FUNC,
        typeName: getReadableTokenType(Char.ARROW_FUNC),
        value: '->',
      },
      {
        type: Char.OPEN_CURLY_BRA,
        typeName: getReadableTokenType(Char.OPEN_CURLY_BRA),
        value: '{',
      },
      {
        type: Char.CLOSE_CURLY_BRA,
        typeName: getReadableTokenType(Char.CLOSE_CURLY_BRA),
        value: '}',
      },
      {
        type: Char.SEMI_COL,
        typeName: getReadableTokenType(Char.SEMI_COL),
        value: ';',
      },
    ])
  })
})
