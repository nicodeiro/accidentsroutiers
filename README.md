# AccidentsRoutiers
# 🚗 Prédiction et Analyse des Accidents de la Route

## 📌 Description du Projet
Ce projet vise à analyser les accidents de la route en utilisant un ensemble de données couvrant la période de 2012 à 2014. L'objectif est de comprendre les tendances des accidents et de développer des modèles de machine learning pour prédire des facteurs clés comme la gravité d'un accident ou le nombre de victimes.

## 📂 Contenu du Dataset
Le dataset comprend plusieurs variables liées aux accidents, notamment :
- **Date & Heure** : Période de l'accident
- **Localisation** : Coordonnées GPS et autorités locales
- **Conditions de route & météo** : Pluie, brouillard, luminosité
- **Type de route** : Autoroute, nationale, urbaine
- **Gravité de l'accident** : Léger, grave, fatal
- **Nombre de véhicules & victimes**

## 📊 Analyses Exploratoires
Nous avons généré plusieurs visualisations pour mieux comprendre les tendances :
1. **Distribution des accidents par gravité**
2. **Impact de la météo sur les accidents**
3. **Accidents en fonction du jour de la semaine et de l'heure**
4. **Comparaison accidents urbains vs ruraux**
5. **Types de routes les plus accidentogènes**

## 🤖 Modèles de Machine Learning
Nous avons mis en place plusieurs modèles pour prédire certains aspects des accidents :
- **Classification** : Prédiction de la gravité d'un accident
- **Régression** : Prédiction du nombre de victimes
- **Clustering** : Identification des zones à risque 
- **Séries temporelles** : Prédiction des périodes à fort risque d'accidents

## 🚀 Installation
### 1️⃣ Cloner le projet
```bash
git clone https://github.com/votre-repo/AccidentsRoutiers.git
cd AccidentsRoutiers
```
### 2️⃣ Installer les dépendances
```bash
npm install
```
### 3️⃣ Lancer l'application
```bash
npm start
```
### 4️⃣ Mode développement
```bash
npm run dev
```

## 📌 Technologies Utilisées
- **React** pour l'interface utilisateur
- **Chart.js** pour la visualisation des données
- **Express.js & MongoDB** pour le backend et la gestion des données
- **Git & GitHub** pour le suivi du projet
