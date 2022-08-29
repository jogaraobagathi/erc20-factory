import React, { useEffect, useState } from "react";
import { useTokens } from "../hooks/useTokens";
import Mint from "./Mint";
import Transfer from "./Transfer";

export function Interaction() {
  const [currentToken, setCurrentToken] = useState(null);
  const { tokens, tokenContracts } = useTokens();
  const handleChange = (e) => {
    console.log(currentToken);
    setCurrentToken(e.target.value);
  };
  useEffect(() => {
    if (currentToken) return;
    if (tokens.length > 0) setCurrentToken(tokens[0]._address);
  }, [tokens]);
  return (
    <div>
      <DropDown handleChange={handleChange} tokens={tokens} />
      <Mint currentToken={currentToken} />
      <Transfer currentToken={currentToken} />
    </div>
  );
}

function DropDown({ handleChange, tokens }) {
  return (
    <select onChange={handleChange}>
      {tokens.map((token) => {
        return (
          <option value={token._address} key={token._address}>
            {token.name}
          </option>
        );
      })}
    </select>
  );
}
