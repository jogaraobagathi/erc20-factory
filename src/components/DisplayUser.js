import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

function DisplayUser({ currentToken }) {
  const { currentUser } = useUser();

  return (
    <div>
      <h3>
        Current User:
        {currentUser}
      </h3>
    </div>
  );
}

export default DisplayUser;
