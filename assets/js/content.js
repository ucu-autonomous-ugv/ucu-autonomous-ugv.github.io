const toTitleCase = (text) =>
  text
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const renderList = async (section) => {
  const container = document.querySelector(`[data-section="${section}"]`);
  if (!container) {
    return;
  }

  const response = await fetch(`content/${section}/index.json`);
  const items = await response.json();

  const cards = await Promise.all(
    items.map(async (item) => {
      const entryResponse = await fetch(
        `content/${section}/${item.slug}.entry.md`
      );
      const entryText = await entryResponse.text();

      const card = document.createElement("article");
      card.className = "list-card";
      card.innerHTML = `
        <span class="tag">${item.kind}</span>
        <h3>${item.title}</h3>
        <p class="lead">${item.meta}</p>
        <div>${marked.parse(entryText)}</div>
        <a class="btn ghost" href="item.html?section=${section}&slug=${item.slug}">Read more</a>
      `;

      return card;
    })
  );

  cards.forEach((card) => container.appendChild(card));
};

const renderItem = async () => {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");
  const slug = params.get("slug");

  if (!section || !slug) {
    return;
  }

  const listResponse = await fetch(`content/${section}/index.json`);
  const items = await listResponse.json();
  const item = items.find((entry) => entry.slug === slug);

  if (!item) {
    return;
  }

  const pageResponse = await fetch(`content/${section}/${slug}.page.md`);
  const pageText = await pageResponse.text();

  const titleEl = document.querySelector("[data-item-title]");
  const metaEl = document.querySelector("[data-item-meta]");
  const categoryEl = document.querySelector("[data-item-category]");
  const contentEl = document.querySelector("[data-item-content]");
  const backLink = document.querySelector("[data-back-link]");

  if (titleEl) titleEl.textContent = item.title;
  if (metaEl) metaEl.textContent = item.meta;
  if (categoryEl) categoryEl.textContent = toTitleCase(section);
  if (contentEl) contentEl.innerHTML = marked.parse(pageText);
  if (backLink) backLink.href = `${section}.html`;

  document.title = `${item.title} | UCU Autonomous UGV Lab`;
};

renderList("projects");
renderList("theses");
renderList("publications");
renderItem();
