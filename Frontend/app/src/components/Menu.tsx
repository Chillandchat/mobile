// Importing packages
import React from "react";
import { useDispatch } from "react-redux";
import { logout, clearUsername } from "../redux/action";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Logout } from "./Logout";
import "./style/Menu.css";

// Props interface
interface Props {
  viewOnClick: () => void;
}

// Menu component
export const Menu: React.FC<Props> = (props) => {
  // Dispatch
  const dispatch = useDispatch();

  // Render component
  return (
    <div>
      {/*Wrapper*/}
      <div id="menu">
        {/*Logout*/}
        <Logout
          onClick={(): void => {
            // Change redux state
            dispatch(logout());
            dispatch(clearUsername());
          }}
        />
        {/*Tittle*/}
        <strong id="menuText">Public chat room</strong>
        {/*Hide/unhide icon*/}
        <VisibilityIcon
          id="viewButton"
          onClick={(): void => {
            // Call props function
            props.viewOnClick();
          }}
        />
      </div>
    </div>
  );
};
