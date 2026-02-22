
function isNowActive(title) {
  const now = new Date();
  return now >= new Date(title.start) && now <= new Date(title.end);
}
function isOngoing(titleId, date) {
  const period = titlePeriods[titleId];
  if (!period) return false;

  const year = date.getFullYear();

  const start = new Date(`${year}-${period.start}`);
  const end = new Date(`${year}-${period.end}`);

  return date >= start && date <= end;
}
function isNowInPeriod(start, end) {
  const today = new Date();
  const s = new Date(start);
  const e = new Date(end);

  return today >= s && today <= e;
}
