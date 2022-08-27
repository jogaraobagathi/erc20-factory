import React, { useState, useContext, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { useFactory } from "../hooks/useFactory";
const Context = createContext();

export const useTokens = () => {
  const { tokens, addToken } = useContext(Context);
  return { tokens, addToken };
};

export const useAccountsData = () => {
  const { accounts, userData } = useContext(Context);
  return { accounts, userData };
};
export function ContextProvider({ children }) {
  const [tokens, setTokens] = useState([]); //{name:"",symbol:"",_address:""}
  const contract = useFactory();

  const [accounts, setAccounts] = useState([]);

  const [userData, setUserData] = useState({}); //{token:{account:{mint:boolean,balance:0}}}

  useEffect(() => {
    const getAccounts = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:7545"
      );
      var accountsArray = await provider.listAccounts();
      accountsArray = accountsArray.map((address) =>
        address.toString().toLowerCase()
      );
      setAccounts(accountsArray);
    };
    getAccounts();
  }, []);

  useEffect(() => {
    const obj = {};
    tokens.forEach((token) => {
      obj[token] = {};
      accounts.forEach((account) => {
        obj[token][account] = {
          balance: 0,
          mint: false,
        };
      });
    });
    setUserData(obj);
  }, [tokens, accounts]);

  useEffect(() => {
    initialiseTokens();
  }, [contract]);

  const initialiseTokens = async () => {
    if (contract) {
      const tokensArray = await contract.getTokens();
      setTokens(tokensArray);
    }
  };

  const addToken = async (name, sybmol) => {
    try {
      const tx = await contract.deployNewERC20Token(name, sybmol);
      await tx.wait();

      const lastAddedToken = await contract.lastToken();
      setTokens([...tokens, lastAddedToken]);
    } catch (error) {
      console.log(error);
    }
  };
  const data = { tokens, addToken, accounts, userData };
  return <Context.Provider value={data}>{children}</Context.Provider>;
}
