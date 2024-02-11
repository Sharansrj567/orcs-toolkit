import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import store from "./store";
import history from "./utils/history";
import { getToken } from "./utils/helper";
import { fetchUserData } from "./store/slices/authThunk";

import App from "./components/App";

if (getToken()) {
  store.dispatch(fetchUserData());
}

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
