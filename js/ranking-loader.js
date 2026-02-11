document.addEventListener("DOMContentLoaded", async () => {

  const container = document.getElementById("ranking-container");

  try {

    const res = await fetch("../rankings/index_ranking.json", { cache: "no-store" });
    const data = await res.json();

    if (!data.titles) {
      container.innerHTML = "<p>ランキングデータ形式が正しくありません。</p>";
      return;
    }

    data.titles.forEach(title => {

      const card = document.createElement("div");
      card.className = "ranking-card";

      let tableRows = "";

      if (title.top50 && title.top50.length > 0) {
        title.top50.forEach(player => {
          tableRows += `
            <tr>
              <td class="rank">${player.rank}</td>
              <td>${player.name}</td>
              <td class="score">${player.score}</td>
            </tr>
          `;
        });
      } else {
        tableRows = `<tr><td colspan="3">データなし</td></tr>`;
      }

      card.innerHTML = `
        <h2>${title.name}</h2>
        <table class="ranking-table">
          ${tableRows}
        </table>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "<p>ランキング読み込みエラー</p>";
    console.error(err);
  }

});
