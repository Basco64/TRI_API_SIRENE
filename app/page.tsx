"use client";
import fetchSireneData from "@/functions/fetchSireneData";
import { downloadCSV, generateCSV } from "@/functions/toCSV";
import { Etablissement } from "@/types/Etablissement";
import { useState } from "react";


export default function Home() {
  const [local, setLocal] = useState("33*");
  const [NAF, setNAF] = useState("nafr2-62.01Z");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await fetchSireneData(NAF, local);

      if (result.success) {
        const csvContent = generateCSV(result.data as Etablissement[]);

        const fileName = `sirene_${NAF.replace(/[^a-zA-Z0-9]/g, "_")}_${local.replace(
          /[^a-zA-Z0-9]/g,
          "_"
        )}.csv`;

        downloadCSV(csvContent, fileName);
        alert(
          `Merci d'avoir choisi Basco Airline. \nVotre document est arrivé dans vos téléchargements.\nNombre de résultats : ${result.total}`
        );
      } else {
        if (result.status === 400) {
          alert("Verifie tes paramètres.");
        } else {
          alert("Une erreur est survenue lors de la recherche.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur inattendue est survenue.");
    } finally {
      setLocal("");
      setNAF("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="mb-32">
          <div className="text-2xl font-bold"> Recherche API Sirene</div>
        </header>
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="w-full max-w-sm">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Localisation
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="33* pour la gironde"
                  onChange={(e) => setLocal(e.target.value)}
                  value={local}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NAF">
                  Code NAF rév. 2
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="NAF"
                  type="text"
                  placeholder="nafr2-62.01Z pour les developpeurs"
                  onChange={(e) => setNAF(e.target.value)}
                  value={NAF}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Extraction en cours..." : "Recevoir son CSV cadeau"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
