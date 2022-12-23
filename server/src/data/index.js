import fs from 'fs';
import path from 'path';
import { readCSV } from '../utils/helpers';

export const plants = readCSV(
  fs.readFileSync(path.join(__dirname, './plants.csv'), 'utf8'),
).map(plantData => ({
  id: plantData.id,
  name: plantData.name,
  coords: [Number(plantData.lat), Number(plantData.long)],
  coolingType: plantData.coolingType,
  coolingPlace: plantData.coolingPlace,
  hasCoolingTower: plantData.hasCoolingTower === 'TRUE',
}));

export const reactors = readCSV(
  fs.readFileSync(path.join(__dirname, './reactors.csv'), 'utf8'),
).map(reactorData =>
  Object.assign(reactorData, {
    reactorIndex: Number(reactorData.reactorIndex),
    thermalPower_MW: Number(reactorData.thermalPower_MW),
    rawPower_MW: Number(reactorData.rawPower_MW),
    netPower_MW: Number(reactorData.netPower_MW),
    coolingTowerCount: Number(reactorData.coolingTowerCount),
    moxAuthorizationDate: reactorData.moxAuthorizationDate || null,
  }),
);
