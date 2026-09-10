const buildListCard = (item, excerptHTML) => {
  const card = document.createElement("div");
  card.className = "list-card";

  const tagsHTML = (item.tags || [])
    .map((t) => `<span class="entry-tag">${t}</span>`)
    .join("");

  const href = window.App.buildItemHref(item);
  const isExternal = Boolean(item.link);

  card.innerHTML = `
    <div class="list-card-header">
      <div class="card-tag-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 8px;">
        <span class="resource-tag list-tag" style="margin-bottom: 0;">${item.kind}</span>
        ${window.App.buildItemLinks(item)}
      </div>
      <h3>
        <a href="${href}" class="stretched-link" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""}>
          ${item.title}
          ${window.App.getIcon("external", "external-icon")}
        </a>
      </h3>
    </div>
    <div class="entry-tags-wrap">${tagsHTML}</div>
    <p class="list-meta">${window.App.buildItemMeta(item)}</p>
    <div class="list-excerpt">${excerptHTML}</div>
  `;

  return card;
};

const paginate = (items, params, pageSize = 10) => {
  const requestedPage = Number.parseInt(params.get("page") || "1", 10);
  const totalPages = Math.ceil(items.length / pageSize);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), Math.max(totalPages, 1));
  const startIndex = (currentPage - 1) * pageSize;

  return {
    currentPage,
    totalPages,
    pageItems: items.slice(startIndex, startIndex + pageSize)
  };
};

// The blog page lists the same merged news feed as the home page, unabridged
const renderNewsList = async () => {
  const container = document.querySelector('[data-section="blog"]');
  if (!container) {
    return;
  }

  const items = await window.App.fetchNewsItems();
  const params = new URLSearchParams(window.location.search);
  const { currentPage, totalPages, pageItems } = paginate(items, params);

  const cards = await Promise.all(
    pageItems.map(async (item) =>
      buildListCard(item, await window.App.fetchItemExcerpt(item))
    )
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
      const pagePath = window.App.ensureTrailingSlash(window.App.normalizePath(url.pathname));
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

  const items = (await window.App.fetchSectionItems("research")).sort(
    window.App.compareByDateDesc
  );

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

  const { currentPage, totalPages, pageItems } = paginate(filteredItems, params);

  const cards = pageItems.map((item) =>
    buildListCard(item, marked.parse(item.summary || ""))
  );

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
      const pagePath = window.App.ensureTrailingSlash(window.App.normalizePath(url.pathname));
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

  const items = await window.App.fetchSectionItems(section);
  const item = items.find((entry) => entry.slug === slug);

  if (!item) {
    return;
  }

  const mdUrl = section === "research"
    ? `/content/${section}/${slug}.md`
    : `/content/${section}/${slug}.page.md`;

  const pageResponse = await fetch(mdUrl, window.App.contentFetchOpts);
  const pageText = await pageResponse.text();

  const titleEl = document.querySelector("[data-item-title]");
  const metaEl = document.querySelector("[data-item-meta]");
  const categoryEl = document.querySelector("[data-item-category]");
  const contentEl = document.querySelector("[data-item-content]");
  const backLink = document.querySelector("[data-back-link]");

  if (titleEl) titleEl.textContent = item.title;
  
  if (metaEl) {
    metaEl.textContent = window.App.buildItemMeta(item);
  }
  
  if (categoryEl) {
    if (section === "research") {
      categoryEl.textContent = `${window.App.toTitleCase(section)} / ${item.kind}`;
    } else {
      categoryEl.textContent = window.App.toTitleCase(section);
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

    // Append "View Code" button if there is a code link
    const existingCodeBtn = document.querySelector("[data-code-link]");
    if (existingCodeBtn) {
      existingCodeBtn.remove();
    }
    if (item.code) {
      const codeBtn = document.createElement("a");
      codeBtn.className = "btn";
      codeBtn.setAttribute("data-code-link", "");
      codeBtn.href = item.code;
      codeBtn.target = "_blank";
      codeBtn.rel = "noopener noreferrer";
      codeBtn.style.marginLeft = "12px";
      codeBtn.innerHTML = `${window.App.getIcon("github", "code-icon")} View Code`;
      backLink.insertAdjacentElement("afterend", codeBtn);
    }
  }

  document.title = `${item.title} | UCU UGV Club`;
};

window.addEventListener("popstate", () => {
  renderResearch();
});

renderResearch();
renderNewsList();
renderItem();
