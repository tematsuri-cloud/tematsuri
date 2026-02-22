document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ranking-container");
  if (!container) return;

  // =========================
  // 🏠 index.html 用          //　
  // =========================
  if (typeof IS_INDEX !== "undefined" && IS_INDEX) {
    let html = "";

    titles.forEach(title => {
      const ongoing = isNowInPeriod(title.start, title.end);

      html += `
        <div class="ranking-card ${ongoing ? "ongoing" : ""}">
          <h4>
            ${title.name}
            ${ongoing ? '<span class="badge">開催中</span>' : ''}
          </h4>
　　　　　　　<p class="updated">更新日：${title.updated}</p>
　　　　　　　<a href="pages/ranking_${title.id}.html">
            ▶ ランキングを見る（TOP100）
          </a>
        </div>
      `;
    });

    container.innerHTML = html;
    return;
  }

  // =========================
  // 🏆 個別ランキングページ用
  // =========================
  try {
    const res = await fetch(RANKING_FILE);
    const data = await res.json();

    if (!Array.isArray(data)) {
      container.innerHTML = "ランキングデータ形式が正しくありません。";
      return;
    }

    let html = `<ul class="ranking-list">`;
    data.forEach(row => {
      html += `
        <li>
          <span class="rank">${row.rank}</span>
          <span class="name">${row.name}</span>
          <span class="score">${row.score}</span>
        </li>
      `;
    });
    html += `</ul>`;

    container.innerHTML = html;

  } catch (e) {
    console.error(e);
    container.innerHTML = "ランキング読み込みエラー";
  }
});

