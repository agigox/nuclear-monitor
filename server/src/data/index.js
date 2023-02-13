import fs from 'fs';
import path from 'path';
import { getProductionCategory, readCSV } from '../utils/helpers';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
export const plants = readCSV(
  fs.readFileSync(path.join(__dirname, './plants.csv'), 'utf8'),
).map((plantData) => ({
  id: plantData.id,
  name: plantData.name,
  reactorsNumber: plantData.reactorsNumber,
  coords: [Number(plantData.lat), Number(plantData.long)],
  coolingType: plantData.coolingType,
  coolingPlace: plantData.coolingPlace,
  hasCoolingTower: plantData.hasCoolingTower === 'TRUE',
}));

export const reactors = readCSV(
  fs.readFileSync(path.join(__dirname, './reactors.csv'), 'utf8'),
).map((reactorData) =>
  Object.assign(reactorData, {
    reactorIndex: Number(reactorData.reactorIndex),
    thermalPower_MW: Number(reactorData.thermalPower_MW),
    rawPower_MW: Number(reactorData.rawPower_MW),
    netPower_MW: Number(reactorData.netPower_MW),
    coolingTowerCount: Number(reactorData.coolingTowerCount),
    moxAuthorizationDate: reactorData.moxAuthorizationDate || null,
    plantId: reactorData.plantId
  }),
);

export const plantsUp = readCSV(
  fs.readFileSync(path.join(__dirname, './plants.csv'), 'utf8'),
).map((plantData) => {
  const available = reactors.filter(reactor => reactor.plantId === plantData.id).map((fa => ({
    name: fa.name,
    installedCapacity: Number(fa.netPower_MW),
    availableCapacity: Number(fa.netPower_MW),
    unavailableCapacity: 0
  })))
  return ({
    plant: plantData.name,
    total: available,
    availabilities: available,
    unavailabilities: { fullyDown: [], partiallyDown: [], unavailablePower: [] }
  })
});

export const referentiel = readCSV(
  fs.readFileSync(path.join(__dirname, './referentielv5.csv'), 'utf8'),
).map((item) => {
  return ({
  ...item,
  central: item.plantId,
  eicProd: item.EIC_API_Prod,
  eicIndispoCentral: item.EIC_API_Indispo_Centrale,
  eicIndispoGroup: item.EIC_API_Indispo_Groupe,
  pmax: Number(item.netPower_MW),
  availableCapacity: 0,
  unavailableCapacity: 0,
  productionCapacity: 0,
  productionType: item.stage,
  category: getProductionCategory(item.stage),
  reactorIndex: item.reactorIndex
})});

export const pmax = readCSV(
  fs.readFileSync(path.join(__dirname, './pmax.csv'), 'utf8'),
).map(({category, installed_capacity}) => {
  return ({
  key: category,
  installedCapacity: Number(installed_capacity),
  pmax: Number(installed_capacity),
})});
