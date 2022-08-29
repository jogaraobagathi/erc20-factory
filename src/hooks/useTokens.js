import { Context } from "../contexts/Context";
import { useContext } from "react";

export const useTokens = () => {
  const { tokens, addToken, tokenContracts } = useContext(Context);

  return { tokens, addToken, tokenContracts };
};
