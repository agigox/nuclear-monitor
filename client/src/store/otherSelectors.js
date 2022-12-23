import moment from 'moment-timezone';

// eslint-disable-next-line import/prefer-default-export
export function getCurrentDate() {
  return (
    // qs.parse(location.search.substr(1)).date ||
    moment()
      .startOf('hour')
      .toISOString()
  );
}
