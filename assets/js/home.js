const NEWS_LIMIT = 4;

const parseNewsDate = (meta) => {
  if (!meta) {
    return "";
  }

  const [datePart] = meta.split("•");
  return datePart.trim();
};

const getItemDate = (item) => {
  if (!item || !item.meta) return new Date(0);
  
  // Try parsing full date like "June 12, 2026"
  const datePart = item.meta.split("•")[0].trim();
  const parsedDate = Date.parse(datePart);
  if (!isNaN(parsedDate)) {
    return new Date(parsedDate);
  }
  
  // Try extracting a 4-digit year from meta, e.g. "MSc thesis, 2025" -> 2025
  const yearMatch = item.meta.match(/\b(20\d{2})\b/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[1]), 0, 1);
  }
  
  return new Date(0);
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

const renderNews = async () => {
  const container = document.querySelector("[data-home-news]");
  if (!container) {
    return;
  }

  const blogItems = await fetchSectionItems("blog");
  const researchItems = await fetchSectionItems("research");
  
  const allItems = [...blogItems, ...researchItems];
  allItems.sort((a, b) => getItemDate(b) - getItemDate(a));
  
  const newsItems = allItems.slice(0, NEWS_LIMIT);

  if (!newsItems.length) {
    container.innerHTML = '<p class="home-empty">No news posts yet. Check back soon.</p>';
    return;
  }

  const cards = await Promise.all(
    newsItems.map(async (item) => {
      const excerpt = item.summary
        ? marked.parse(item.summary)
        : await fetchExcerpt(item.section, item.slug);
        
      const card = document.createElement("a");
      card.className = "news-card";
      card.href = window.App.buildItemHref(item);
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

renderNews();

