import React, { useEffect, useState } from "react";
import { fetchAccidents } from "./services/api";
import ChartComponent from "./components/Chart";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Prediction from "./pages/Prediction";

const App = () => {
    const [fullDataset, setFullDataset] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchAccidents();
            setFullDataset(data); // ✅ Utiliser toutes les données
        };
        getData();
    }, []);

    return (
        <Router>
            <div className="container">
    <Routes>
        <Route path="/" element={<ChartComponent data={fullDataset} />} />
        <Route path="/prediction" element={<Prediction />} />
    </Routes>
</div>
        </Router>
    );
};

export default App;
