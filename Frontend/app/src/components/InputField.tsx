import React from "react";
import "./style/InputField.css";
interface Props {
  placeholder: string;
}

export const InputField: React.FC<Props> = (props) => {
  return (
    <div>
      <input id="inputField" placeholder={props.placeholder} />
    </div>
  );
};
