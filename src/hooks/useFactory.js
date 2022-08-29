import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import factoryjson from "../artifacts/contracts/Factory.sol/Factory.json";
const factoryAddress = "0xb1261E30dD25959FC83D3F1cA92D3D70e07DA4e2";
export function useFactory(address = factoryAddress) {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  useEffect(() => {
    const fun = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const _signer = provider.getSigner();
      setSigner(signer);
      const _contract = new ethers.Contract(address, factoryjson.abi, _signer);
      setContract(_contract);
    };
    fun();
  }, []);

  return { contract, signer };
}
