import { Etablissement } from "./Etablissement";

export type SireneAPIResponse = {
  header: {
    total: number;
  };
  etablissements: Etablissement[];
};
