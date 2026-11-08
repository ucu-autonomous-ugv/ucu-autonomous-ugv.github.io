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
    container.innerHTML = '<p class="home-empty">No posts yet</p>';
    return;
  }

  const cards = await Promise.all(
    newsItems.map(async (item) => {
      const excerpt = await window.App.fetchItemExcerpt(item);

      let authorHTML = "";
      if (item.authors && item.authors.length) {
        authorHTML = `<p class="news-authors">By ${item.authors.join(", ")}</p>`;
      }

      // Log-style timestamp, the same YYYY-MM-DD the content files use
      const date = window.App.getItemDate(item);
      const isoDate = date.getTime() === 0
        ? ""
        : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <time class="news-date" datetime="${isoDate}">${isoDate}</time>
        <div>
          <div class="news-tag-row">
            <span class="resource-tag list-tag">${item.kind}</span>
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
