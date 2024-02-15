import React from "react";
import { ColorModeContext, useMode } from "./Theme/Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./components/Topbar/Topbar";
import SidebarComponent from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
// import Dashboard from "./components/Dashboard/Dashboard";

// import Astrologers from "./components/Astrologers/Astrologers";
// import Contacts from "./components/Contacts/Contacts";
// import Dashboard from "./components/Dashboard/Dashboard";
// import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarComponent />

          <main className="content">
            <Topbar />
            <Dashboard />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
