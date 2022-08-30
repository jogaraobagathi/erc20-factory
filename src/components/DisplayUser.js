import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

function DisplayUser({ currentToken }) {
  const { currentUser } = useUser();

  return <div>{currentUser}</div>;
}

export default DisplayUser;
