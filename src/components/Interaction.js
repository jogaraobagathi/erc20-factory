import React, { useEffect, useState } from "react";
import { useTokens } from "../hooks/useTokens";
import Mint from "./Mint";
import Transfer from "./Transfer";
import DisplayDetails from "./DisplayDetails";
import { useUser } from "../hooks/useUser";
export function Interaction() {
  const [currentToken, setCurrentToken] = useState(null);
  const { tokens, tokenContracts } = useTokens();
  const [canMint, setCanMint] = useState(false);
  const { currentUser } = useUser();

  useEffect(() => {
    console.log(tokenContracts);
    // if (tokenContracts) return;
    const f = async () => {
      const contract = tokenContracts[currentToken];
      if (!contract) return;
      const canHeMint = await contract.canMint(currentUser);
      setCanMint(canHeMint);
    };
    f();
  });

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
      {canMint && <Mint currentToken={currentToken} />}
      <Transfer currentToken={currentToken} />
      <DisplayDetails currentToken={currentToken} />
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
