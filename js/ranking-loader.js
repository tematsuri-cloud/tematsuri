
const container = document.getElementById("ranking-container");

// 開催中を上に並び替え
const sortedTitles = [...TITLES].sort((a, b) => {
  return isNowActive(b) - isNowActive(a);
});

fetch("rankings/index_ranking.json")
  .then(res => res.json())
  .then(data => {
    sortedTitles.forEach(title => {
      const section = document.createElement("section");
      section.className = "title-section";
      if (isNowActive(title)) section.classList.add("active");

      section.innerHTML = `
        <h2>${title.name}</h2>
        <ol>
          ${data[title.id].slice(0, 50).map(p =>
            `<li>${p.name}（${p.score}）</li>`
          ).join("")}
        </ol>
        <a href="pages/ranking_${title.id}.html">
          100位まで見る →
        </a>
      `;
      container.appendChild(section);
    });
  });
