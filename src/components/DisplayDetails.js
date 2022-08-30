import React, { useEffect } from "react";
import { useAccountsData } from "../hooks/useAccountsData";
import { useTokens } from "../hooks/useTokens";
import { useUser } from "../hooks/useUser";

function DisplayDetails({ currentToken }) {
  const { currentUser } = useUser();
  const { accounts } = useAccountsData();
  const { tokenContracts } = useTokens();

  const handleClick = () => {
    accounts.map(async (account) => {
      const currentContract = tokenContracts[currentToken];
      var amt = await currentContract.balanceOf(account);
      var canMint = await currentContract.canMint(account);

      amt = amt.toNumber();
      console.log(account, amt, canMint);
    });
  };
  return (
    <div>
      DisplayDetails
      <button onClick={handleClick}>clickme</button>
    </div>
  );
}

export default DisplayDetails;
