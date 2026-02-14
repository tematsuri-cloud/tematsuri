document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ranking-container");

  try {
    const response = await fetch(RANKING_FILE);
    const data = await response.json();

    if (!Array.isArray(data)) {
      container.innerHTML = "ランキングデータ形式が正しくありません。";
      return;
    }

    let html = `
      <table class="ranking-table">
        <tr>
          <th>順位</th>
          <th>名前</th>
          <th>レート</th>
        </tr>
    `;

    data.forEach(player => {
      html += `
        <tr>
          <td>${player.rank}</td>
          <td>${player.name}</td>
          <td>${player.rating}</td>
        </tr>
      `;
    });

    html += "</table>";

    container.innerHTML = html;

  } catch (e) {
    console.error(e);
    container.innerHTML = "ランキング読み込みエラー";
  }
});
