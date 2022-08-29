import { Context } from "../contexts/Context";
import { useContext } from "react";

export const useTokens = () => {
  const { tokens, addToken } = useContext(Context);
  return { tokens, addToken };
};
