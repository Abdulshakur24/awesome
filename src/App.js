import React from "react";
import { useSelector } from "react-redux";
import HomeScreen from "./HomeScreen";
import Login from "./Login";

function App() {
  const user = useSelector((states) => states.users.user);

  return user ? <HomeScreen /> : <Login />;
}

export default App;
