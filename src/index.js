import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./App"
import { store } from "./redux/store";

const rootElem = document.createElement("div");
rootElem.id = "root";
document.body.appendChild(rootElem);
const reactRoot = ReactDOM.createRoot(rootElem);
reactRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
)