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
  const [tokenContracts, setTokenContracts] = useState({}); //{address:contract}
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

  const initialiseUserData = async () => {
    const obj = {};
    for (const token of tokens) {
      const tokenAddress = token._address;

      const currentContract = tokenContracts[tokenAddress];
      obj[tokenAddress] = {};
      for (const account of accounts) {
        var bal = 0;
        var mint = false;
        if (currentContract) {
          bal = await currentContract.balanceOf(account);
          bal = bal.toNumber() / 100;
          mint = await currentContract.canMint(account);
        }
        obj[tokenAddress][account] = {};
        obj[tokenAddress][account].balance = bal;
        obj[tokenAddress][account].mint = mint;
      }
    }
    const prev = userData;
    if (JSON.stringify(prev) !== JSON.stringify(obj)) setUserData(obj);
  };
  useEffect(() => {
    initialiseUserData();
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

  //takes token address and user address to change the state of the user in that token
  const updateUserData = async (token, user) => {
    const contract = tokenContracts[token];
    accounts.forEach(async (account) => {
      if (user === account.toLowerCase()) {
        user = account;
        var bal = await contract.balanceOf(user);
        bal /= 100;
        const canmint = await contract.canMint(user);
        var obj = userData;
        obj[token][user].balance = bal;
        obj[token][user].mint = canmint;
        setUserData(obj);
        // console.log("obj is ", obj);
        var tot = await contract.totalSupply();
        tot = tot.toNumber();
        console.log("total Supply", tot);
      }
    });
  };

  const data = {
    tokens,
    addToken,
    accounts,
    userData,
    tokenContracts,
    initialiseUserData,
  };
  return <Context.Provider value={data}>{children}</Context.Provider>;
}
