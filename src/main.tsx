import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Header from "./components/common/Header";

import "./styles/index.scss";
import MonkeysPage from "./pages/MonkeysPage";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/monkeys" element={<MonkeysPage />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
