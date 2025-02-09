import React from "react";

import "./App.css";

import ScreenRoute from "./Component/Router/ScreenRoute";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
  console.log = () => {};
} else {
  console.log(process.env);
}
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ScreenRoute />
      </Provider>
    </div>
  );
}

export default App;
