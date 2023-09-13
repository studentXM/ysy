import { createRoot } from "react-dom/client";
import React from "react";
import "./index.scss"
import App from "./App";
const root = createRoot(document.getElementById("app") as Element);
root.render(<App />)