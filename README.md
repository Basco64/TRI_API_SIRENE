# API Sirene Explorer

[English version below](#english-version)

## 🇫🇷 Version française

Une application simple et efficace pour explorer et extraire des données de l'API Sirene de l'INSEE.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-13.4+-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?logo=typescript)

### 📋 Fonctionnalités

- Recherche d'entreprises par code NAF et localisation
- Extraction de grandes quantités de données (jusqu'à 10 000 résultats)
- Pagination automatique pour contourner les limitations de l'API
- Export des résultats au format CSV
- Interface utilisateur simple et intuitive

### 🚀 Installation

1. Clonez ce dépôt:

```bash
git clone https://github.com/Basco64/TRI_API_SIRENE.git
cd TRI_API_SIRENE
```

2. Installez les dépendances:

```bash
npm install
# ou
yarn install
```

3. Créez un fichier `.env.local` à la racine du projet avec votre clé API INSEE:

```
NEXT_PUBLIC_INSEE_API_KEY=votre_clé_api_ici
```

### 🔑 Obtention d'une clé API INSEE

Pour utiliser cette application, vous devez créer un compte sur le portail API de l'INSEE et obtenir une clé API:

1. Inscrivez-vous sur [https://portail-api.insee.fr/user/login](https://portail-api.insee.fr/user/login)
2. Après validation de votre compte, accédez à la section "Mes applications"
3. Créez une nouvelle application pour obtenir une clé API pour l'API Sirene V3.11
4. Copiez la clé API générée dans votre fichier `.env.local`

### 🖥️ Utilisation

1. Démarrez le serveur de développement:

```bash
npm run dev
# ou
yarn dev
```

2. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur
3. Entrez un code NAF (ex: `nafr2-62.01Z` pour les développeurs en programmation informatique)
4. Spécifiez une localisation (ex: `33*` pour la Gironde, `75*` pour Paris)
5. Cliquez sur le bouton pour lancer l'extraction des données
6. Le fichier CSV sera automatiquement téléchargé une fois le traitement terminé

### 📊 Format des données

Les données sont exportées au format CSV avec les colonnes suivantes:
- Nom de l'entreprise
- Adresse complète (numéro, type de voie, voie)
- Code postal
- Commune
- SIREN/SIRET
- Tranche d'effectifs
- Année des effectifs

### 🛠️ Personnalisation

Vous pouvez personnaliser le projet selon vos besoins:

- Modifiez la fonction `generateCSV` dans `functions/toCSV.ts` pour changer le format d'export
- Ajustez les paramètres de requête dans `functions/fetchSireneData.ts` pour filtrer différemment les données
- Adaptez l'interface utilisateur dans `app/page.tsx` selon vos préférences

### ⚠️ Limitations

- L'API Sirene ne permet pas de récupérer plus de 10 000 résultats par requête
- Les requêtes sont soumises aux quotas de l'API INSEE (renseignez-vous sur le portail API)
- Cette application est optimisée pour une utilisation côté client, ce qui peut exposer votre clé API


### 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à ouvrir une issue ou proposer une pull request.

---

<a name="english-version"></a>
## 🇬🇧 English Version

A simple and efficient application for exploring and extracting data from the INSEE Sirene API.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-13.4+-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?logo=typescript)

### 📋 Features

- Search for companies by NAF code and location
- Extract large amounts of data (up to 10,000 results)
- Automatic pagination to bypass API limitations
- Export results to CSV format
- Simple and intuitive user interface

### 🚀 Installation

1. Clone this repository:

```bash
git clone https://github.com/Basco64/TRI_API_SIRENE.git
cd TRI_API_SIRENE
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file at the project root with your INSEE API key:

```
NEXT_PUBLIC_INSEE_API_KEY=your_api_key_here
```

### 🔑 Getting an INSEE API Key

To use this application, you need to create an account on the INSEE API portal and obtain an API key:

1. Register at [https://portail-api.insee.fr/user/login](https://portail-api.insee.fr/user/login)
2. After validating your account, go to the "My applications" section
3. Create a new application to obtain an API key for the Sirene V3.11 API
4. Copy the generated API key into your `.env.local` file

### 🖥️ Usage

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser
3. Enter a NAF code (e.g., `nafr2-62.01Z` for software developers)
4. Specify a location (e.g., `33*` for Gironde, `75*` for Paris)
5. Click the button to start extracting data
6. The CSV file will be automatically downloaded once processing is complete

### 📊 Data Format

The data is exported in CSV format with the following columns:
- Company name
- Complete address (number, street type, street)
- Postal code
- City
- SIREN/SIRET
- Staff size range
- Staff count year

### 🛠️ Customization

You can customize the project according to your needs:

- Modify the `generateCSV` function in `functions/toCSV.ts` to change the export format
- Adjust the query parameters in `functions/fetchSireneData.ts` to filter the data differently
- Adapt the user interface in `app/page.tsx` according to your preferences

### ⚠️ Limitations

- The Sirene API does not allow retrieving more than 10,000 results per request
- Requests are subject to INSEE API quotas (check the API portal for more information)
- This application is optimized for client-side use, which may expose your API key


### 🤝 Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

Developed by [Basco64](https://github.com/Basco64)
