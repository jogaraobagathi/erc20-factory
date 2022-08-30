import React, { useState, useContext, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { useFactory } from "../hooks/useFactory";
import ERC20Token from "../artifacts/contracts/ERC20Token.sol/ERC20Token.json";
export const Context = createContext();

export function ContextProvider({ children }) {
  const [tokens, setTokens] = useState([]); //{name:"",symbol:"",_address:"",contract:""}
  const { contract, signer } = useFactory();
  const [accounts, setAccounts] = useState([]);
  const [userData, setUserData] = useState({}); //{token:{account:{mint:boolean,balance:0}}}
  const [tokenContracts, setTokenContracts] = useState({});
  useEffect(() => {
    const getAccounts = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:7545"
      );
      var accountsArray = await provider.listAccounts();

      setAccounts(accountsArray);
    };
    getAccounts();
  }, []);

  useEffect(() => {
    const obj = {};
    tokens.forEach((token) => {
      obj[token._address] = {};
      accounts.forEach(async (account) => {
        obj[token._address][account] = {
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
      tokensArray.map((token) => {
        addTokenContract(token._address);
      });
    }
  };

  const addTokenContract = (tokenAddress) => {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20Token.abi,
      signer
    );
    var contracts = tokenContracts;
    contracts[tokenAddress] = tokenContract;
    setTokenContracts(contracts);
  };
  const addToken = async (name, sybmol) => {
    try {
      const tx = await contract.deployNewERC20Token(name, sybmol);
      await tx.wait();
      var lastAddedToken = await contract.lastToken();
      const tokenAddress = lastAddedToken._address;
      addTokenContract(tokenAddress);
      setTokens([...tokens, lastAddedToken]);
    } catch (error) {
      console.log(error);
    }
  };

  const data = { tokens, addToken, accounts, userData, tokenContracts };
  return <Context.Provider value={data}>{children}</Context.Provider>;
}
