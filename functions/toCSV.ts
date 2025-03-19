import { Etablissement } from "@/types/Etablissement";

export function generateCSV(data: Etablissement[]): string {
  const headers = [
    "Nom",
    "Numéro",
    "Type Voie",
    "Voie",
    "Code Postal",
    "Commune",
    "SIREN",
    "SIRET",
    "Tranche Effectifs",
    "Année Effectifs",
  ];

  const csvRows = [headers.join(",")];

  const formatCSVValue = (value: any): string => {
    if (value === null || value === undefined) return '""';
    return `"${String(value).replace(/"/g, '""')}"`;
  };

  const getEffectifs = (codeEffectif: string): string => {
    const effectifsMap: Record<string, string> = {
      NN: "Unités non employeuses",
      "00": "0 salarié",
      "01": "1 ou 2 salariés",
      "02": "3 à 5 salariés",
      "03": "6 à 9 salariés",
      "11": "10 à 19 salariés",
      "12": "20 à 49 salariés",
      "21": "50 à 99 salariés",
      "22": "100 à 199 salariés",
      "31": "200 à 249 salariés",
      "32": "250 à 499 salariés",
      "41": "500 à 999 salariés",
      "42": "1 000 à 1 999 salariés",
      "51": "2 000 à 4 999 salariés",
      "52": "5 000 à 9 999 salariés",
      "53": "10 000 salariés et plus",
    };

    return effectifsMap[codeEffectif] || "Non renseigné";
  };

  for (const etablissement of data) {
    const codeEffectif = etablissement.trancheEffectifsEtablissement;

    if (codeEffectif === "NN" || codeEffectif === "00" || codeEffectif === "01") {
      continue;
    }

    if (etablissement.uniteLegale?.denominationUniteLegale !== null) {
      const row = [
        formatCSVValue(etablissement.uniteLegale?.denominationUniteLegale || ""),
        formatCSVValue(etablissement.adresseEtablissement?.numeroVoieEtablissement || ""),
        formatCSVValue(etablissement.adresseEtablissement?.typeVoieEtablissement || ""),
        formatCSVValue(etablissement.adresseEtablissement?.libelleVoieEtablissement || ""),
        formatCSVValue(etablissement.adresseEtablissement?.codePostalEtablissement || ""),
        formatCSVValue(etablissement.adresseEtablissement?.libelleCommuneEtablissement || ""),
        formatCSVValue(etablissement.siren || ""),
        formatCSVValue(etablissement.siret || ""),
        formatCSVValue(getEffectifs(codeEffectif || "")),
        formatCSVValue(etablissement.anneeEffectifsEtablissement || ""),
      ].join(",");

      csvRows.push(row);
    }
  }

  return csvRows.join("\n");
}

export function downloadCSV(csvContent: string, fileName: string = "donnees_sirene.csv"): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}
