import React from "react";
import { Button as MuiButton } from "@mui/material";
import "./styles.css";

export default function Button({ children, className, ...props }) {
  return (
    <MuiButton
      className={`button${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
