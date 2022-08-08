import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Registration } from "./components/authorization/Registration";
import { Authorization } from "./components/authorization/Authorization";
import { NavBar } from "./components/NavBar";
import { UserPage } from "./components/UserPage";
import { CardItemPage } from "./components/Cards/CardItemPage";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && isAuth) return;
    if (!token && !isAuth) return;
    if (token && !isAuth) setIsAuth(true);
  }, [isAuth]);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar setAuth={setIsAuth} auth={isAuth} />
        {isAuth ? (
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/card/:id" element={<CardItemPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/authorization"
              element={<Authorization setAuth={setIsAuth} />}
            />
            <Route path="/registration" element={<Registration />} />
            <Route path="/" element={<Registration />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
