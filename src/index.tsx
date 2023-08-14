import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

import "./index.scss"

const root = createRoot(document.getElementById("app") as Element);
root.render(<App />)
