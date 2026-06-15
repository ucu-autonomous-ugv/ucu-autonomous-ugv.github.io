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

  const response = await fetch(`/content/${section}/index.json`);
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
        `/content/${section}/${item.slug}.entry.md`
      );
      const entryText = await entryResponse.text();

      const card = document.createElement("a");
      card.className = "list-card";
      card.href = `/item/?section=${section}&slug=${item.slug}`;
      card.innerHTML = `
        <div class="list-card-header">
          <span class="resource-tag list-tag">${item.kind}</span>
          <h3>
            ${item.title}
            <svg class="external-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.97 7 1.96 2 6.963-7 3.993 4v-10z"/>
            </svg>
          </h3>
        </div>
        <p class="list-meta">${item.meta}</p>
        <div class="list-excerpt">${marked.parse(entryText)}</div>
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

const renderResearch = async () => {
  const container = document.querySelector('[data-section="research"]');
  if (!container) {
    return;
  }

  const response = await fetch("/content/research/index.json");
  const items = await response.json();

  const tabButtons = document.querySelectorAll(".research-nav-btn");
  const countAll = document.querySelector('[data-count="all"]');
  const countProjects = document.querySelector('[data-count="projects"]');
  const countTheses = document.querySelector('[data-count="theses"]');
  const countPublications = document.querySelector('[data-count="publications"]');

  const totalCount = items.length;
  const projectsCount = items.filter((item) => item.kind === "Project").length;
  const thesesCount = items.filter((item) => item.kind === "Thesis").length;
  const publicationsCount = items.filter((item) => item.kind === "Publication").length;

  if (countAll) countAll.textContent = totalCount;
  if (countProjects) countProjects.textContent = projectsCount;
  if (countTheses) countTheses.textContent = thesesCount;
  if (countPublications) countPublications.textContent = publicationsCount;

  const params = new URLSearchParams(window.location.search);
  let activeTab = params.get("tab") || "all";

  const validTabs = ["all", "projects", "theses", "publications"];
  if (!validTabs.includes(activeTab)) {
    activeTab = "all";
  }

  tabButtons.forEach((btn) => {
    if (btn.getAttribute("data-tab") === activeTab) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  });

  let filteredItems = items;
  if (activeTab === "projects") {
    filteredItems = items.filter((item) => item.kind === "Project");
  } else if (activeTab === "theses") {
    filteredItems = items.filter((item) => item.kind === "Thesis");
  } else if (activeTab === "publications") {
    filteredItems = items.filter((item) => item.kind === "Publication");
  }

  const pageSize = 10;
  const requestedPage = Number.parseInt(params.get("page") || "1", 10);
  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), Math.max(totalPages, 1));
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const cards = pageItems.map((item) => {
    const card = document.createElement("a");
    card.className = "list-card";

    if (item.link) {
      card.href = item.link;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    } else {
      card.href = `/item/?section=research&slug=${item.slug}`;
    }

    const tagsHTML = (item.tags || [])
      .map((t) => `<span class="entry-tag">${t}</span>`)
      .join("");

    card.innerHTML = `
      <div class="list-card-header">
        <span class="resource-tag list-tag">${item.kind}</span>
        <h3>
          ${item.title}
          <svg class="external-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.97 7 1.96 2 6.963-7 3.993 4v-10z"/>
          </svg>
        </h3>
      </div>
      <div class="entry-tags-wrap">${tagsHTML}</div>
      <p class="list-meta">${item.meta}</p>
      <div class="list-excerpt">${marked.parse(item.summary || "")}</div>
    `;
    return card;
  });

  container.innerHTML = "";
  cards.forEach((card) => container.appendChild(card));

  const existingPagination = container.parentElement.querySelector(".pagination");
  if (existingPagination) {
    existingPagination.remove();
  }

  if (totalPages > 1) {
    const pager = document.createElement("nav");
    pager.className = "pagination";

    const buildLink = (label, page, isActive = false) => {
      const link = document.createElement("a");
      link.className = `page-link${isActive ? " is-active" : ""}`;
      link.textContent = label;

      const url = new URL(window.location.href);
      url.searchParams.set("page", String(page));
      url.searchParams.set("tab", activeTab);
      const pagePath = ensureTrailingSlash(normalizePath(url.pathname));
      link.href = `${pagePath}${url.search}`;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.history.pushState({}, "", link.href);
        renderResearch();
      });
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

  tabButtons.forEach((btn) => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = newBtn.getAttribute("data-tab");
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      url.searchParams.delete("page");
      window.history.pushState({}, "", url.href);
      renderResearch();
    });
  });
};

const renderItem = async () => {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");
  const slug = params.get("slug");

  if (!section || !slug) {
    return;
  }

  const listResponse = await fetch(`/content/${section}/index.json`);
  const items = await listResponse.json();
  const item = items.find((entry) => entry.slug === slug);

  if (!item) {
    return;
  }

  const mdUrl = section === "research"
    ? `/content/${section}/${slug}.md`
    : `/content/${section}/${slug}.page.md`;

  const pageResponse = await fetch(mdUrl);
  const pageText = await pageResponse.text();

  const titleEl = document.querySelector("[data-item-title]");
  const metaEl = document.querySelector("[data-item-meta]");
  const categoryEl = document.querySelector("[data-item-category]");
  const contentEl = document.querySelector("[data-item-content]");
  const backLink = document.querySelector("[data-back-link]");

  if (titleEl) titleEl.textContent = item.title;
  if (metaEl) metaEl.textContent = item.meta;
  
  if (categoryEl) {
    if (section === "research") {
      categoryEl.textContent = `${toTitleCase(section)} / ${item.kind}`;
    } else {
      categoryEl.textContent = toTitleCase(section);
    }
  }
  
  if (contentEl) contentEl.innerHTML = marked.parse(pageText);
  
  if (backLink) {
    if (section === "research") {
      const tabName = item.kind === "Thesis" ? "theses" : item.kind.toLowerCase() + "s";
      backLink.href = `/research/?tab=${tabName}`;
    } else {
      backLink.href = `/${section}/`;
    }
  }

  document.title = `${item.title} | UCU UGV Club`;
};

window.addEventListener("popstate", () => {
  renderResearch();
});

renderResearch();
renderList("blog");
renderItem();
