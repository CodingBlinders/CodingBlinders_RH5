import React from "react";
import { Checkbox as MuiCheckbox } from "@mui/material";
import "./styles.css";

export default function Checkbox({ children, className, ...props }) {
  return (
    <MuiCheckbox
      className={`checkbox${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
