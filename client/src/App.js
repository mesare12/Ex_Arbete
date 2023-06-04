import React, {useState, useEffect } from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import Menu from "./components/menu";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from './components/Login';
import useToken from './components/useToken'

const App = () => {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />
    }

return (
    <div>
        <Navbar />

        <Routes>
            <Route exact path="/" element={<Menu />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/create" element={<Create />} />
        </Routes>
    </div>
);
};

export default App;