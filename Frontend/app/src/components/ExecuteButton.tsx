// Importing packages
import React, { useRef, useEffect } from "react";
import "./style/ExecuteButton.css";

// Props interface
interface Props {
  text: string;
  onclick: () => any;
}

// ExecuteButton component
export const ExecuteButton: React.FC<Props> = (props) => {
  // Button ref
  const buttonRef = useRef(null);

  // Use effect
  useEffect((): void => {
    // Button reference
    const element = buttonRef.current;

    // Listeners
    window.addEventListener("keydown", (e: KeyboardEvent): void => {
      // Check button click
      if (e.code === "Enter") element.click();
    });

    // Clean up listeners
    return window.removeEventListener("keydown", (): void => {});
  }, []);

  // Render component
  return (
    <div>
      {/*Button*/}
      <button onClick={props.onclick} id="button" ref={buttonRef}>
        {props.text}
      </button>
    </div>
  );
};
