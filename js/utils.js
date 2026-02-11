
function isNowActive(title) {
  const now = new Date();
  return now >= new Date(title.start) && now <= new Date(title.end);
}
