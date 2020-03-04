import * as React from 'react'

import { lexer } from './compiler'
import * as types from './compiler/lexer/types'

export default function App() {
  const [value, setValue] = React.useState<string>('')
  const [tokens, setTokens] = React.useState<types.Token[]>([])

  const generateLexemes = () => {
    setTokens(lexer(value))
  }

  return (
    <div className="App">
      <h1>Parser</h1>
      <h2>Type code and lex it !</h2>
      <input
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        placeholder="Type code"
      />
      <button onClick={generateLexemes}>APPLY LEXER</button>
      {tokens && (
        <>
          <h3>Tokens List</h3>
          <ul>
            {tokens.map((token: { typeName: String; value: String }, i) => (
              <li key={`${i}-${token.typeName}-${token.value}`}>
                [{token.typeName}, {token.value}]
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
