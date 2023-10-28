import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import { Component, createContext, useContext } from "react";
import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

// export const UserContext = createContext();

export class App extends Component {
  componentDidMount() {
    console.log("loaded");
  }

  render() {
    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              // <UserContext.Provider value={{ code, setCode }}>
              <Home />
              // </UserContext.Provider>
            }
          />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default App;
