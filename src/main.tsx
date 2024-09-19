import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { store } from "./reducer/rootReducer.ts";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
