import React from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header /> 
        <Outlet /> {/* This will load different pages based on route */}
      </div>
    </Provider>
  );
};

export default App;
