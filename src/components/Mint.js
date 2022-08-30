import React from "react";
import { useTokens } from "../hooks/useTokens";
import { useUser } from "../hooks/useUser";

function Mint({ currentToken }) {
  const { currentUser } = useUser();
  const { tokenContracts, tokens, initialiseUserData } = useTokens();

  const handleMint = async (e) => {
    e.preventDefault();
    const mintValue = e.target.mint.value;
    console.log(currentToken);
    console.log(tokenContracts[currentToken]);
    const currentContract = tokenContracts[currentToken];
    const tx = await currentContract.mint(mintValue * 100);
    const rcpt = await tx.wait();
    initialiseUserData();

    // setTimeout(() => {
    //   updateUserData(currentToken, currentUser);
    // }, 10000);

    // const sB = await currentContract.totalSupply();
    // const sp = sB.toNumber();
    // console.log("sp is ", sp);
  };
  return (
    <div>
      <form onSubmit={handleMint}>
        <input type="number" id="mint" style={{ width: 300 }} />
        <button type="submit">mint</button>
      </form>
    </div>
  );
}

export default Mint;
