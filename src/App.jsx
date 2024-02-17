import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./Theme/Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./components/Topbar/Topbar";
import SidebarComponent from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Service_URL from "./Constant";
import { Routes, Route } from "react-router-dom";
import Astrologers from "./components/Astrologers/Astrologers";
import Users from "./components/Users/Users";
import axios from "axios";
import PendingAstrologers from "./components/Astrologers/PendingAstrologers";
import Login from "./components/Auth/Login";
import { Flag } from "@mui/icons-material";
const App = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState({});
  const [selectedPendingAstrologer, setSelectedPendingAstrologer] =
    useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${Service_URL}/user-details`);
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
    fetchData();
  }, []);

  const dataArray = Object.values(data);

  const verifiedAstrologers = dataArray.filter(
    (item) => item.role === "verified"
  );
  const pendingAstrologerNames = dataArray.filter(
    (item) => item.role === "pending"
  );
  const users = dataArray.filter((item) => item.role === "user");

  const disabledOrRejected = dataArray.filter(
    (item) => item.role === "disabled" || item.role === "rejected"
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedIn ? (
          <div className="app">
            <SidebarComponent />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/astrologers"
                  element={<Astrologers astrologers={verifiedAstrologers} />}
                />
                <Route
                  path="/pendingRequests"
                  element={
                    <PendingAstrologers astrologers={pendingAstrologerNames} />
                  }
                />
                <Route path="/users" element={<Users users={users} />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
