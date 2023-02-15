import fs from 'fs';
import path from 'path';
import { getProductionCategory, readCSV } from '../utils/helpers';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);


export const referentiel = readCSV(
  fs.readFileSync(path.join(__dirname, './referentiel.csv'), 'utf8'),
).map((item) => {
  return ({
  unitName: item.name,
  productionUnit: item.plantId,
  eicProd: item.EIC_API_Prod,
  eicIndispoCentral: item.EIC_API_Indispo_Centrale,
  eicIndispoGroup: item.EIC_API_Indispo_Groupe,
  regroupementHydro: item.RegroupementHydro,
  pmax: Number(item.netPower_MW),
  productionType: item.stage,
  productionCategory: getProductionCategory(item.stage),
  reactorIndex: item.reactorIndex
})});

export const pmax = readCSV(
  fs.readFileSync(path.join(__dirname, './pmax.csv'), 'utf8'),
).map(({productionCategory, pmax}) => {
  return ({
  key: productionCategory,
  pmax: Number(pmax),
})});
