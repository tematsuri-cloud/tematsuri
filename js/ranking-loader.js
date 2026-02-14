document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ranking-container");
  if (!container) return;

  try {
    const res = await fetch(RANKING_FILE);
    const json = await res.json();

    // 🔴 ここで構造チェック
    if (
      !json ||
      !json.titles ||
      !Array.isArray(json.titles)
    ) {
      console.error("JSON構造:", json);
      container.innerHTML = "ランキングデータ形式が正しくありません。";
      return;
    }

    // =========================
    // 🏠 index.html 用
    // =========================
    if (typeof IS_INDEX !== "undefined" && IS_INDEX) {
      let html = `
        <p class="ranking-updated">
          更新日：${json.updated || "不明"}
        </p>
      `;

      json.titles.forEach(t => {
        html += `
          <div class="ranking-card">
            <h4>${t.name}</h4>
            <p>参加者数：${t.top50?.length || 0}</p>
            <a href="pages/ranking_${t.id}.html">
              ▶ TOP100 ランキングを見る
            </a>
          </div>
        `;
      });

      container.innerHTML = html;
      return;
    }

  } catch (e) {
    console.error("ランキング取得エラー:", e);
    container.innerHTML = "ランキング読み込みエラー";
  }
});

