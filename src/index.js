import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";

import reportWebVitals from "./reportWebVitals";
import initAxios from "utils/axios";
import store from "store";
import theme from "theme";
import App from "./App";

import "./index.css";

initAxios();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Router>
            <App />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
