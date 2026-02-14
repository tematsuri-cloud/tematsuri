document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ranking-container");
  if (!container) return;

  try {
    const res = await fetch(RANKING_FILE);
    const json = await res.json();

    if (!json.titles || !Array.isArray(json.titles)) {
      container.innerHTML = "ランキングデータ形式が正しくありません。";
      return;
    }

    // =========================
    // 🏠 index.html 用（TOP50）
    // =========================
    if (typeof IS_INDEX !== "undefined" && IS_INDEX) {
      let html = "";

      json.titles.forEach(t => {
        html += `
          <div class="ranking-card">
            <h3>${t.name}</h3>
            <a href="pages/ranking_${t.id}.html">
              ▶ ランキングを見る（TOP100）
            </a>
          </div>
        `;
      });

      container.innerHTML = html;
      return;
    }

    // =========================
    // 📄 個別ページ用
    // =========================
    const title = json.titles.find(t => t.id === TITLE_ID);

    if (!title || !Array.isArray(title.top50)) {
      container.innerHTML = "該当ランキングが見つかりません。";
      return;
    }

    let table = `
      <table class="ranking-table">
        <tr><th>順位</th><th>名前</th><th>スコア</th></tr>
    `;

    title.top50.forEach(p => {
      table += `
        <tr>
          <td>${p.rank}</td>
          <td>${p.name}</td>
          <td>${p.score}</td>
        </tr>
      `;
    });

    table += "</table>";
    container.innerHTML = table;

  } catch (e) {
    console.error(e);
    container.innerHTML = "ランキング読み込みエラー";
  }
});

