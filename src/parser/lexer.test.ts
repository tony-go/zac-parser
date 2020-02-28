import lexer from './lexer'

describe('#Lexer', () => {
  it('should work', () => {
    const code = '// test \n name = "tony"'
    const tokens = lexer(code)
    expect(tokens).toEqual([
      { type: 30, typeName: 'COMMENT_LINE', value: '//' },
      { type: 32, typeName: 'COMMENT', value: 'test' },
      { type: 1, typeName: 'EOF', value: 'eof' },
      { type: 28, typeName: 'INDENTIFIER', value: 'name' },
      { type: 17, typeName: 'ASSIGN', value: '=' },
      { type: 26, typeName: 'DOUBLE_QUOTE', value: '"' },
      { type: 29, typeName: 'STRING', value: 'tony' },
      { type: 26, typeName: 'DOUBLE_QUOTE', value: '"' },
    ])
  })
})
