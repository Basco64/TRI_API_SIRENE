import axios from "axios";

export default async function fetchSireneData(NAF: string, local: string) {
  const config = {
    headers: {
      "X-INSEE-Api-Key-Integration": process.env.NEXT_PUBLIC_INSEE_API_KEY,
      "Content-Type": "application/json",
    },
  };

  const resultsPerPage = 800;
  let currentPage = 0;
  let totalResults = 0;
  let allResults: any[] = [];

  try {
    const initialResponse = await axios.get(
      `https://api.insee.fr/api-sirene/3.11/siret?q=activitePrincipaleUniteLegale:${NAF} AND codePostalEtablissement:${local} AND etatAdministratifUniteLegale:A&nombre=${resultsPerPage}&debut=1`,
      config
    );

    totalResults = initialResponse.data.header.total;
    allResults = initialResponse.data.etablissements || [];

    while (allResults.length < totalResults && currentPage * resultsPerPage < 10000) {
      currentPage++;
      const nextStartPosition = currentPage * resultsPerPage + 1;

      const remainingResults = totalResults - allResults.length;
      const nextPageSize = Math.min(resultsPerPage, remainingResults);

      if (nextStartPosition > 10000) break;

      const response = await axios.get(
        `https://api.insee.fr/api-sirene/3.11/siret?q=activitePrincipaleUniteLegale:${NAF} AND codePostalEtablissement:${local} AND etatAdministratifUniteLegale:A&nombre=${nextPageSize}&debut=${nextStartPosition}`,
        config
      );

      const newResults = response.data.etablissements || [];
      allResults = [...allResults, ...newResults];

      if (newResults.length < nextPageSize) break;
    }

    return {
      success: true,
      data: allResults,
      total: totalResults,
      retrieved: allResults.length,
    };
  } catch (error: any) {
    console.error("Error fetching Sirene data:", error);
    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}
