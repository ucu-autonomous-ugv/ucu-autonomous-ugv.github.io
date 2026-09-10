const NEWS_LIMIT = 3;

const renderNews = async () => {
  const container = document.querySelector("[data-home-news]");
  if (!container) {
    return;
  }

  // Same feed the blog page lists, trimmed to the latest few entries
  const allItems = await window.App.fetchNewsItems();
  const newsItems = allItems.slice(0, NEWS_LIMIT);

  if (!newsItems.length) {
    container.innerHTML = '<p class="home-empty">No news posts yet. Check back soon.</p>';
    return;
  }

  const cards = await Promise.all(
    newsItems.map(async (item) => {
      const excerpt = await window.App.fetchItemExcerpt(item);

      let authorHTML = "";
      if (item.authors && item.authors.length) {
        authorHTML = `<p class="news-authors" style="font-size: 0.82rem; color: var(--muted); margin: -4px 0 8px 0; font-weight: 500;">By ${item.authors.join(", ")}</p>`;
      }

      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <time class="news-date">${window.App.formatDate(window.App.getItemDate(item))}</time>
        <div>
          <div class="card-tag-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; width: 100%;">
            <span class="resource-tag list-tag" style="margin-bottom: 0;">${item.kind}</span>
            ${window.App.buildItemLinks(item)}
          </div>
          <h3><a href="${window.App.buildItemHref(item)}" class="stretched-link">${item.title}</a></h3>
          ${authorHTML}
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
