import lexer, { getReadableTokenType } from '.'
import { Char } from './types'

describe('#Lexer', () => {
  it('should scan assignement => name = tony;', () => {
    expect(lexer('name = tony;')).toEqual([
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
      {
        type: Char.EOF,
        typeName: getReadableTokenType(Char.EOF),
        value: 'eof',
      },
    ])
  })

  it('should handle break line => // test \n name = "tony"', () => {
    expect(lexer('// test \n name = "tony"')).toEqual([
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
      {
        type: Char.EOF,
        typeName: getReadableTokenType(Char.EOF),
        value: 'eof',
      },
    ])
  })

  it('should scan function => fn get (name) -> {};', () => {
    expect(lexer('fn get (name) -> {};')).toEqual([
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
      {
        type: Char.EOF,
        typeName: getReadableTokenType(Char.EOF),
        value: 'eof',
      },
    ])
  })

  it('should handle operation', () => {
    expect(lexer('233 + 4;')).toEqual([
      {
        type: Char.NUMBER,
        typeName: getReadableTokenType(Char.NUMBER),
        value: '233',
      },
      {
        type: Char.PLUS,
        typeName: getReadableTokenType(Char.PLUS),
        value: '+',
      },
      {
        type: Char.NUMBER,
        typeName: getReadableTokenType(Char.NUMBER),
        value: '4',
      },
      {
        type: Char.SEMI_COL,
        typeName: getReadableTokenType(Char.SEMI_COL),
        value: ';',
      },
      {
        type: Char.EOF,
        typeName: getReadableTokenType(Char.EOF),
        value: 'eof',
      },
    ])
  })
})
