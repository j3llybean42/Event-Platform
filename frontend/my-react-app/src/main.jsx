import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { StaffProvider } from "./contexts/StaffContext.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000f00',
      contrastText: '#f1ead8',
    },
    secondary: {
      main: '#bec5a4',
      contrastText: '#242715',
    },
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <StaffProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StaffProvider>
    </UserProvider>
  </BrowserRouter>
);
