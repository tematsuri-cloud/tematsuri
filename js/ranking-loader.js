document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ranking-container");

  try {
    const response = await fetch(RANKING_FILE);
    const json = await response.json();

    // 🔍 titles があるかチェック
    if (!json.titles || !Array.isArray(json.titles)) {
      container.innerHTML = "ランキングデータ形式が正しくありません。";
      return;
    }

    // 🔍 対象タイトルを取得（id で判定）
    const titleData = json.titles.find(t => t.id === TITLE_ID);

    if (!titleData || !Array.isArray(titleData.top50)) {
      container.innerHTML = "該当タイトルのランキングが見つかりません。";
      return;
    }

    const list = titleData.top50;

    let html = `
      <table class="ranking-table">
        <tr>
          <th>順位</th>
          <th>名前</th>
          <th>スコア</th>
        </tr>
    `;

    list.forEach(p => {
      html += `
        <tr>
          <td>${p.rank}</td>
          <td>${p.name}</td>
          <td>${p.score}</td>
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

