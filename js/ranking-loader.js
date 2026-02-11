document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ranking-container");

  try {
    const response = await fetch("rankings/index_ranking.json");
    const data = await response.json();

    if (!data || typeof data !== "object") {
      container.innerHTML = "ランキングデータ形式が正しくありません。";
      return;
    }

    let html = "";

    for (const title in data) {
      const players = data[title];

      if (!Array.isArray(players)) continue;

      html += `<h2>${title.toUpperCase()}</h2>`;
      html += `<table>`;
      html += `
        <tr>
          <th>順位</th>
          <th>名前</th>
          <th>レート</th>
        </tr>
      `;

      players.forEach(player => {
        html += `
          <tr>
            <td>${player.rank}</td>
            <td>${player.name}</td>
            <td>${player.rating}</td>
          </tr>
        `;
      });

      html += `</table>`;
    }

    container.innerHTML = html;

  } catch (error) {
    console.error(error);
    container.innerHTML = "ランキング読み込みエラー";
  }
});
