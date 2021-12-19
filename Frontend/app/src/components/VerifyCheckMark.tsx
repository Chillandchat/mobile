// Importing packages
import React from "react";
import "./style/VerifyCheckMark.css";

// Verify checkmark component
export const VerifyCheckMark: React.FC = () => {
  // Render checkmark
  return (
    <div>
      {/*Checkmark text*/}
      <p id="verify-checkmark">Verified</p>
    </div>
  );
};
