import { AdresseEtablissement } from "./AdresseEtablissement";
import { UniteLegale } from "./UniteLegale";

export type Etablissement = {
  siren?: string;
  siret?: string;
  trancheEffectifsEtablissement?: string;
  anneeEffectifsEtablissement?: string;
  adresseEtablissement?: AdresseEtablissement;
  uniteLegale?: UniteLegale;
};
