import React from "react";

interface Props {
  onCLick: () => void;
}

export const LinkButton: React.FC<Props> = (props) => {
  return (
    <div>
      <p>Login</p>
    </div>
  );
};
