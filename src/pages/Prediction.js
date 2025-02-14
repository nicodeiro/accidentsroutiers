import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Prediction = () => {
    const [inputs, setInputs] = useState({
        numberOfVehicles: "",
        weather: "",
        light: "",
        road: "",
        area: "",
        day: "",
        time: ""
    });

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/predict", inputs);
            setPrediction(res.data);
        } catch (error) {
            console.error("Erreur de prédiction", error);
        }
    };

    return (
        <div className="container">
            <h1>Analyse des Accidents Routiers</h1>
            <h2>Tester les Prédictions</h2>
            <Link to="/">
            <button className="btn-retour">Retour à l'Accueil</button>
            </Link> 
            <p className="text-info">
    <strong>Gravité :</strong><br />
    1 : Léger (Blessures mineures, sans hospitalisation)<br />
    2 : Grave (Blessures sérieuses nécessitant une hospitalisation)<br />
    3 : Fatal (Accident mortel)
</p>
            <form onSubmit={handleSubmit}>
                
                {Object.keys(inputs).map((key) => (
        <div key={key} className="form-group">
                        {key === "numberOfVehicles" ? "numberOfVehicles (minimum 1)" :
     key === "weather" ? "weather (1: Clair, 2: Pluie, 3: Neige, 4: Brouillard)" :
     key === "light" ? "light (1: Plein jour, 2: Nuit éclairée, 3: Nuit non éclairée)" :
     key === "road" ? "road (1: Sec, 2: Mouillé, 3: Verglas)" :
     key === "area" ? "area (1: Urbain, 2: Rural)" :
     key === "day" ? "day (1: Dimanche, 2: Lundi, 3: Mardi, 4: Mercredi, 5: Jeudi, 6: Vendredi, 7: Samedi)" :
     key === "time" ? "time (Heure entre 0 et 23)" :
     key} :
     
                        <input type="text" name={key} value={inputs[key]} onChange={handleChange} />
                    </div>
                ))}
                <button type="submit">Prédire</button>
            </form>
            {prediction && (
                <p>
                    Gravité : {prediction.severity}, Victimes : {prediction.casualties}
                </p>
            )}
        </div>
    );
};

export default Prediction;
