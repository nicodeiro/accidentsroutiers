import React from "react";
import { Link } from "react-router-dom";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const ChartComponent = ({ data }) => {
    // 📌 Nombre d'accidents par jour de la semaine
    const dayCounts = data.reduce((acc, accident) => {
        if (!accident || !accident.Day_of_Week) return acc; 
        const day = accident.Day_of_Week;
        acc[day] = (acc[day] || 0) + 1;
        return acc;
    }, {});
    

    const labelsDays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const valuesDays = labelsDays.map((_, index) => dayCounts[index + 1] || 0);

    const dayChartData = {
        labels: labelsDays,
        datasets: [
            {
                label: "Nombre d'accidents",
                data: valuesDays,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    // 📌 Nombre d'accidents par tranche horaire
    const hourCounts = data.reduce((acc, accident) => {
        if (!accident || !accident.Time) return acc; // Vérifie si accident ou accident.Time est null
        const hour = parseInt(accident.Time.split(":")[0], 10);
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, {});
    

    const labelsHours = Array.from({ length: 24 }, (_, i) => `${i}h`);
    const valuesHours = labelsHours.map((_, index) => hourCounts[index] || 0);

    const hourChartData = {
        labels: labelsHours,
        datasets: [
            {
                label: "Nombre d'accidents",
                data: valuesHours,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    // 📌 Répartition des accidents par gravité
    const severityCounts = data.reduce((acc, accident) => {
        if (!accident || !accident.Accident_Severity) return acc;
        const severity = accident.Accident_Severity;
        acc[severity] = (acc[severity] || 0) + 1;
        return acc;
    }, {});
    

    const labelsSeverity = ["Léger", "Grave", "Fatal"];
    const valuesSeverity = [severityCounts[1] || 0, severityCounts[2] || 0, severityCounts[3] || 0];

    const severityChartData = {
        labels: labelsSeverity,
        datasets: [
            {
                label: "Nombre d'accidents",
                data: valuesSeverity,
                backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(255, 99, 132, 0.6)"],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };

    // 📌 Accidents en fonction de la limite de vitesse
    const speedLimitCounts = data.reduce((acc, accident) => {
        if (!accident || !accident.Speed_limit) return acc;
        const speed = accident.Speed_limit;
        acc[speed] = (acc[speed] || 0) + 1;
        return acc;
    }, {});
    

    const labelsSpeed = Object.keys(speedLimitCounts).sort((a, b) => a - b).map(limit => `${limit} km/h`);
    const valuesSpeed = labelsSpeed.map(limit => speedLimitCounts[parseInt(limit)] || 0);

    const speedChartData = {
        labels: labelsSpeed,
        datasets: [
            {
                label: "Nombre d'accidents",
                data: valuesSpeed,
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    // 📌 Répartition des accidents entre zones urbaines et rurales
    const areaCounts = data.reduce((acc, accident) => {
        if (!accident || !accident.Urban_or_Rural_Area) return acc;
        const area = accident.Urban_or_Rural_Area;
        acc[area] = (acc[area] || 0) + 1;
        return acc;
    }, {});
    

    const labelsArea = ["Urbain", "Rural", "Inconnu"];
    const valuesArea = [areaCounts[1] || 0, areaCounts[2] || 0, areaCounts[3] || 0];

    const areaChartData = {
        labels: labelsArea,
        datasets: [
            {
                label: "Nombre d'accidents",
                data: valuesArea,
                backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(201, 203, 207, 0.6)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(201, 203, 207, 1)"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container">
            <h1>Analyse des Accidents Routiers au Royaume-Uni</h1>
            <p className="text-section">
                L’étude <strong>"1,6 million d’accidents de la circulation au Royaume-Uni"</strong> rassemble des données détaillées sur les accidents routiers en Angleterre, Écosse et Pays de Galles entre 2000 et 2016. Elle analyse les tendances temporelles, les conditions météorologiques, les types de routes impliquées et les caractéristiques des conducteurs et des victimes. Cette base de données permet d’identifier les zones à haut risque, d’examiner l’impact des conditions extérieures sur la sécurité routière et d’optimiser les stratégies de prévention. Elle constitue une ressource précieuse pour les chercheurs et les autorités cherchant à améliorer la sécurité sur les routes britanniques.
            </p>
            <Link to="/prediction">
            <button className="btn-prediction">Tester une Prédiction</button>
            </Link>

            <div className="chart-container">
                <h2>Répartition des accidents par gravité</h2>
                <Pie data={severityChartData} />
                <p className="text-section">Ce diagramme circulaire montre la proportion des accidents en fonction de leur gravité : léger, grave et fatal. Une majorité d’accidents sont de gravité légère, tandis qu’un plus faible pourcentage correspond à des accidents graves ou mortels. Cette distribution reflète le fait que, bien que fréquents, la plupart des accidents n’entraînent pas de blessures sévères.</p>
            </div>
            
            <div className="chart-container">
                <h2>Nombre d'accidents par jour de la semaine</h2>
                <Bar data={dayChartData} />
                <p className="text-section">Ce graphique illustre la répartition du nombre d'accidents selon les jours de la semaine. On remarque une tendance à un nombre relativement stable d’accidents du lundi au vendredi, avec une légère baisse le dimanche. Cette distribution peut être liée aux habitudes de déplacement, avec un volume plus important de trafic en semaine en raison des trajets domicile-travail.</p>
            </div>

            <div className="chart-container">
                <h2>Nombre d'accidents par tranche horaire</h2>
                <Line data={hourChartData} />
                <p className="text-section">Ce graphique représente la variation du nombre d'accidents en fonction de l'heure de la journée. On observe deux pics marqués : l’un en matinée entre 7h et 9h, correspondant aux déplacements domicile-travail, et un second plus important entre 16h et 19h, période de retour du travail et de forte circulation. La baisse significative durant la nuit est logique, car le trafic y est réduit.</p>
            </div>

            <div className="chart-container">
                <h2>Accidents en fonction de la limite de vitesse</h2>
                <Bar data={speedChartData} />
                <p className="text-section">Ce graphique met en évidence le nombre d'accidents selon la vitesse limite autorisée sur la route concernée. On constate que la grande majorité des accidents se produisent sur des routes limitées à 30 km/h, ce qui correspond souvent aux zones urbaines. Cela peut s’expliquer par la forte densité de trafic et la présence de piétons et cyclistes. À l’inverse, les routes avec des vitesses limites plus élevées enregistrent moins d’accidents, probablement en raison d’un trafic plus fluide et moins d’intersections.</p>
            </div>

            <div className="chart-container">
                <h2>Répartition des accidents entre zones urbaines et rurales</h2>
                <Pie data={areaChartData} />
                <p className="text-section">Ce graphique montre que la majorité des accidents se produisent en zone urbaine, en lien avec le graphique sur les limites de vitesse, où les routes limitées à 30 km/h concentrent le plus d’accidents. Les zones urbaines, avec une circulation dense et de nombreux usagers vulnérables, sont plus propices aux collisions. En revanche, bien que moins fréquents, les accidents en zone rurale sont souvent plus graves en raison des vitesses plus élevées et de l’absence d’infrastructures sécuritaires.</p>
            </div>
        </div>
    );
};

export default ChartComponent;
