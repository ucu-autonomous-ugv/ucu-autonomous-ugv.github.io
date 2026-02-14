const toTitleCase = (text) =>
  text
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const normalizePath = (path) =>
  path.endsWith(".html") ? path.slice(0, -5) : path;

const ensureTrailingSlash = (path) => (path.endsWith("/") ? path : `${path}/`);

const renderList = async (section) => {
  const container = document.querySelector(`[data-section="${section}"]`);
  if (!container) {
    return;
  }

  const response = await fetch(`content/${section}/index.json`);
  const items = await response.json();

  const params = new URLSearchParams(window.location.search);
  const pageSize = 10;
  const requestedPage = Number.parseInt(params.get("page") || "1", 10);
  const totalPages = Math.ceil(items.length / pageSize);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), Math.max(totalPages, 1));
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = items.slice(startIndex, startIndex + pageSize);

  const cards = await Promise.all(
    pageItems.map(async (item) => {
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
        <a class="btn ghost" href="/item/?section=${section}&slug=${item.slug}">Read more</a>
      `;

      return card;
    })
  );

  container.innerHTML = "";
  cards.forEach((card) => container.appendChild(card));

  if (totalPages > 1) {
    const pager = document.createElement("nav");
    pager.className = "pagination";

    const buildLink = (label, page, isActive = false) => {
      const link = document.createElement("a");
      link.className = `page-link${isActive ? " is-active" : ""}`;
      link.textContent = label;
      const url = new URL(window.location.href);
      url.searchParams.set("page", String(page));
      const pagePath = ensureTrailingSlash(normalizePath(url.pathname));
      link.href = `${pagePath}${url.search}`;
      return link;
    };

    if (currentPage > 1) {
      pager.appendChild(buildLink("Previous", currentPage - 1));
    }

    for (let page = 1; page <= totalPages; page += 1) {
      pager.appendChild(buildLink(String(page), page, page === currentPage));
    }

    if (currentPage < totalPages) {
      pager.appendChild(buildLink("Next", currentPage + 1));
    }

    container.insertAdjacentElement("afterend", pager);
  }
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
  if (backLink) backLink.href = `/${section}/`;

  document.title = `${item.title} | UCU Autonomous UGV Lab`;
};

renderList("projects");
renderList("theses");
renderList("publications");
renderItem();
