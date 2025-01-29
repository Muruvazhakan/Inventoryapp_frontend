import React from "react";

import "./App.css";

import ScreenRoute from "./Component/Router/ScreenRoute";
import Developer from "./Component/Screen/ViewScreen/Developer";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
  console.log = () => {};
} else {
  console.log(process.env);
}
function App() {
  return (
    <div className="App">
      <ScreenRoute />
    </div>
  );
}

export default App;
