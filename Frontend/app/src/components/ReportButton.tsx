//Importing packages
import React from "react";
import FlagIcon from "@material-ui/icons/Flag";
import "./style/ReportButton.css";

//Props interface
interface Props {
  event: () => void;
}

//Report button component
export const ReportButton: React.FC<Props> = (props) => {
  return (
    <div>
      {/*Icon*/}
      <FlagIcon id="icon" onClick={props.event} />
    </div>
  );
};
