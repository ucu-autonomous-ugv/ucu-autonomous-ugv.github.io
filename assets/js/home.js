const SPOTLIGHT_SECTIONS = ["blog", "projects", "publications", "theses"];
const NEWS_LIMIT = 3;

const parseNewsDate = (meta) => {
  if (!meta) {
    return "";
  }

  const [datePart] = meta.split("•");
  return datePart.trim();
};

const fetchSectionItems = async (section) => {
  const response = await fetch(`/content/${section}/index.json`);
  if (!response.ok) {
    return [];
  }

  const items = await response.json();
  return items.map((item) => ({ ...item, section }));
};

const fetchExcerpt = async (section, slug) => {
  const response = await fetch(`/content/${section}/${slug}.entry.md`);
  if (!response.ok) {
    return "";
  }

  const text = await response.text();
  return marked.parse(text);
};

const buildItemHref = (section, slug) =>
  `/item/?section=${section}&slug=${slug}`;

const renderNews = async () => {
  const container = document.querySelector("[data-home-news]");
  if (!container) {
    return;
  }

  const items = await fetchSectionItems("blog");
  const newsItems = items.slice(0, NEWS_LIMIT);

  if (!newsItems.length) {
    container.innerHTML = '<p class="home-empty">No news posts yet. Check back soon.</p>';
    return;
  }

  const cards = await Promise.all(
    newsItems.map(async (item) => {
      const excerpt = await fetchExcerpt("blog", item.slug);
      const card = document.createElement("a");
      card.className = "news-card";
      card.href = buildItemHref("blog", item.slug);
      card.innerHTML = `
        <time class="news-date">${parseNewsDate(item.meta)}</time>
        <div>
          <span class="resource-tag list-tag">${item.kind}</span>
          <h3>${item.title}</h3>
          <div class="news-excerpt">${excerpt}</div>
        </div>
      `;
      return card;
    })
  );

  container.innerHTML = "";
  cards.forEach((card) => container.appendChild(card));
};

const renderSpotlight = async () => {
  const container = document.querySelector("[data-home-spotlight]");
  if (!container) {
    return;
  }

  const sectionLists = await Promise.all(
    SPOTLIGHT_SECTIONS.map((section) => fetchSectionItems(section))
  );
  const spotlightItems = sectionLists
    .flat()
    .filter((item) => item.spotlight)
    .slice(0, 3);

  if (!spotlightItems.length) {
    container.innerHTML =
      '<p class="home-empty">Spotlight stories will appear here as projects and updates are featured.</p>';
    return;
  }

  const cards = await Promise.all(
    spotlightItems.map(async (item) => {
      const excerpt = await fetchExcerpt(item.section, item.slug);
      const card = document.createElement("a");
      card.className = "spotlight-card";
      card.href = buildItemHref(item.section, item.slug);
      card.innerHTML = `
        <span class="resource-tag">${item.kind}</span>
        <h3>${item.title}</h3>
        <p class="list-meta">${item.meta}</p>
        <div class="list-excerpt">${excerpt}</div>
        <span class="read-more">Read spotlight →</span>
      `;
      return card;
    })
  );

  container.innerHTML = "";
  cards.forEach((card) => container.appendChild(card));
};

renderNews();
renderSpotlight();
