import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import "./style/Logout.css";
interface Props {
  onClick: () => void;
}
export const Logout: React.FC<Props> = (props) => {
  return (
    <div>
      <HomeIcon onClick={props.onClick} id="logout" />
    </div>
  );
};
