import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useFactory } from "../hooks/useFactory";
import { useTokens, useAccountsData } from "../contexts/Context";

function TokenCreation() {
  const contract = useFactory();
  const { addToken, tokens } = useTokens();
  const { userData } = useAccountsData();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("e is ", e);
    const name = e.target.name.value;
    const value = e.target.sybmol.value;
    addToken(name, value);
  };

  const printTokens = () => {
    console.log("tokens", tokens);
    console.log("userdata is ", userData);
  };

  return (
    <div>
      TokenCreation
      <div>
        <form onSubmit={handleSubmit}>
          <input id="name" placeholder="name" />
          <input id="sybmol" placeholder="sybmol" />
          <button type="submit">create</button>
        </form>

        <button onClick={printTokens}>click</button>
      </div>
    </div>
  );
}

export default TokenCreation;
