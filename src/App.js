import React, { useEffect, useState } from "react";
import { fetchAccidents } from "./services/api";
import ChartComponent from "./components/Chart";
import "./styles.css";

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
        <div className="container">
            <h1>Analyse des Accidents Routiers</h1>
            <ChartComponent data={fullDataset} />
        </div>
    );
};

export default App;
