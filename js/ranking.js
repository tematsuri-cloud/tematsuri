
const container = document.getElementById("ranking-container");
const now = new Date();

function isActive(match) {
  return now >= new Date(match.start) && now < new Date(match.end);
}

async function loadRanking(match, active) {
  const res = await fetch(match.json);
  const data = await res.json();

  let html = `
    <div class="card ${active ? "active" : ""}">
      <h2>${match.nameJa}</h2>
      <p>${match.nameEn}</p>
      ${active ? "<strong>🔥 開催中</strong>" : ""}
      <ol>
  `;

  data.slice(0, 50).forEach((row, i) => {
    html += `<li>${row.name} - ${row.score}</li>`;
  });

  html += `
      </ol>
    </div>
  `;

  return html;
}

(async () => {
  container.innerHTML = "";

  // 開催中 → それ以外 の順に並べ替え
  const sorted = [...TITLE_MATCHES].sort(
    (a, b) => isActive(b) - isActive(a)
  );

  for (const match of sorted) {
    try {
      const html = await loadRanking(match, isActive(match));
      container.insertAdjacentHTML("beforeend", html);
    } catch {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="card"><h2>${match.nameJa}</h2><p>ランキング準備中</p></div>`
      );
    }
  }
})();
