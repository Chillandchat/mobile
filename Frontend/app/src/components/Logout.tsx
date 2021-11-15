//Importing packages
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import "./style/Logout.css";

//Props interface
interface Props {
  onClick: () => void;
}

//logout component
export const Logout: React.FC<Props> = (props) => {
  //Render component
  return (
    <div>
      {/*Logout icon*/}
      <HomeIcon onClick={props.onClick} id="logout" />
    </div>
  );
};
