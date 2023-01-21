const { REACT_APP_NUCLEAR_MONITOR_API } = process.env;

async function doFetch(...args) {
  const res = await fetch(...args);
  if (!res.ok) {
    throw new Error('Fetch error');
  }
  return res;
}
// eslint-disable-next-line import/prefer-default-export
export async function getUnavailabilities() {
  const res = await doFetch(
    `${REACT_APP_NUCLEAR_MONITOR_API}/unavailabilitiesv2`,
  );
  const data = await res.json();
  return data;
}
export async function getReferentiel() {
  const res = await doFetch(`${REACT_APP_NUCLEAR_MONITOR_API}/referentiel`);
  const data = await res.json();
  return data;
}
export async function getProductionCategories() {
  const res = await doFetch(
    `${REACT_APP_NUCLEAR_MONITOR_API}/unavailabilitiesv3`,
  );
  const data = await res.json();
  return data;
}
