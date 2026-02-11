async function loadRanking(titleId) {
  try {
    const response = await fetch(`../rankings/${titleId}.json`);
    const data = await response.json();

    document.getElementById("title-name").innerText =
      `${data.title} ランキング`;

    document.getElementById("updated-date").innerText =
      `最終更新: ${data.updated}`;

    const table = document.getElementById("ranking-table");

    table.innerHTML = data.ranking.map(player => `
      <tr>
        <td>${player.rank}</td>
        <td>${player.name}</td>
        <td>${player.score}</td>
      </tr>
    `).join("");

  } catch (error) {
    console.error("ランキング取得失敗:", error);
  }
}
