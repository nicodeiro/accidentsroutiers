export const fetchAccidents = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/accidents");
        const data = await response.json();
        return data; // Assure-toi de ne pas limiter avec slice()
    } catch (error) {
        console.error("Erreur lors de la récupération des accidents :", error);
        return [];
    }
};
