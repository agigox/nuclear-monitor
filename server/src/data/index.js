import fs from 'fs';
import path from 'path';
import { readCSV } from '../utils/helpers';
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
  }),
);

export const plantsUp = readCSV(
  fs.readFileSync(path.join(__dirname, './plants.csv'), 'utf8'),
).map((plantData) => ({
  plant: plantData.name,
  total: plantData.reactorsNumber,
  availabilities: plantData.reactorsNumber,
  unavailabilities: { fullyDown: 0, partiallyDown: 0, unavailablePower: 0 }
}));
