import * as React from "react";

import lexer from "./parser/lexer";

export default function App() {
  const [value, setValue] = React.useState<string>("");
  const [lexemes, setLexemes] = React.useState<String[]>([]);

  const generateLexemes = () => {
    setLexemes(lexer(value));
  };

  return (
    <div className="App">
      <h1>Paser</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        placeholder="Type code"
      />
      <button onClick={generateLexemes}>APPLY LEXER</button>
      {lexemes && (
        <>
          <h3> Lexemes List</h3>
          <ul>
            {lexemes.map(lex => (
              <li>{lex}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
