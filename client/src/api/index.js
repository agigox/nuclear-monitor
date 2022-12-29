const { REACT_APP_NUCLEAR_MONITOR_API } = process.env;

async function doFetch(...args) {
  const res = await fetch(...args);
  console.log(res);
  if (!res.ok) {
    throw new Error('Fetch error');
  }
  return res;
}
// eslint-disable-next-line import/prefer-default-export
export async function getUnavailabilities() {
  const res = await doFetch(
    `${REACT_APP_NUCLEAR_MONITOR_API}/unavailabilities`,
  );
  const data = await res.json();
  return data;
}
