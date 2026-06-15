document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("resources-container");
  if (!container) return;

  try {
    const response = await fetch("/content/resources/index.json");
    const resources = await response.json();

    // Group resources by category
    const grouped = resources.reduce((acc, item) => {
      const cat = item.category || "General Resources";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});

    const buildTags = (tags) => {
      if (!tags || tags.length === 0) return "";
      return tags.map(tag => `<span class="resource-tag">${tag}</span>`).join("");
    };

    container.innerHTML = "";

    Object.entries(grouped).forEach(([category, items]) => {
      const section = document.createElement("div");
      section.className = "resources-section";

      const header = document.createElement("h2");
      header.className = "resources-category-title";
      header.textContent = category;
      section.appendChild(header);

      const grid = document.createElement("div");
      grid.className = "resources-grid";

      items.forEach((item) => {
        const card = document.createElement("a");
        card.className = "resource-card";
        card.href = item.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";

        card.innerHTML = `
          <div class="resource-card-header">
            <h3>
              ${item.title}
              ${window.App.getIcon("external", "external-icon")}
            </h3>
          </div>
          <p class="resource-desc">${item.description}</p>
          <div class="resource-tags-wrap">
            ${buildTags(item.tags)}
          </div>
        `;
        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });

  } catch (error) {
    console.error("Error loading resources:", error);
    container.innerHTML = `<p class="error">Failed to load resources. Please try again later.</p>`;
  }
});
