// Centralized namespace for shared utilities and components
window.App = {
  // Shared icon provider
  getIcon: (name, className = "") => {
    const icons = {
      github: `<path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.624-5.475 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>`,
      linkedin: `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>`,
      youtube: `<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>`,
      huggingface: `<path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624"/>`,
      external: `<path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.97 7 1.96 2 6.963-7 3.993 4v-10z"/>`,
      globe: `<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 22.531c-3.12-.492-5.627-2.617-6.529-5.531h2.529c.307 2.504 1.83 4.673 4 5.531zm-2-7.531h-3.238c-.279-1.246-.429-2.58-.456-4h3.694c.027 1.42.177 2.754.456 4zm-.456-6h-3.694c.027-1.42.177-2.754.456-4h3.238c-.279 1.246-.429 2.58-.456 4zm2.456-6.469c-2.17.858-3.693 3.027-4 5.531h-2.529c.902-2.914 3.409-5.039 6.529-5.531zm4 12.938h-4c-.031-1.397-.183-2.748-.485-4h4.97c-.302 1.252-.454 2.603-.485 4zm.031-6h-5.032c.031-1.397.183-2.748.485-4h4.062c-.302 1.252-.454 2.603-.485 4zm-.031-2.469c.307-2.504 1.83-4.673 4-5.531v2.529c-3.12.492-5.627 2.617-6.529 5.531h2.529zm4 5.531h-2.529c-.307 2.914-1.83 5.039-4 5.531v-2.529c3.12-.492 5.627-2.617 6.529-5.531zm2 2c-.279 1.246-.429 2.58-.456 4h-3.694c.027-1.42-.177-2.754-.456-4h4.606zm.456-4h-4.606c.279-1.246.429-2.58.456-4h3.694c-.027 1.42-.177 2.754-.456 4z"/>`,
      // arXiv wordmark (official one-color logo), wider than the 24x24 icon grid
      arxiv: `<g transform="translate(-358.165 -223.27)"><path d="M492.976,269.5l24.36-29.89c1.492-1.989,2.2-3.03,1.492-4.723a5.142,5.142,0,0,0-4.481-3.161h0a4.024,4.024,0,0,0-3.008,1.108L485.2,261.094Z"/><path d="M526.273,325.341,493.91,287.058l-.972,1.033-7.789-9.214-7.743-9.357-4.695,5.076a4.769,4.769,0,0,0,.015,6.53L520.512,332.2a3.913,3.913,0,0,0,3.137,1.192,4.394,4.394,0,0,0,4.027-2.818C528.4,328.844,527.6,327.133,526.273,325.341Z"/><path d="M479.215,288.087l6.052,6.485L458.714,322.7a2.98,2.98,0,0,1-2.275,1.194,3.449,3.449,0,0,1-3.241-2.144c-.513-1.231.166-3.15,1.122-4.168l.023-.024.021-.026,24.851-29.448m-.047-1.882-25.76,30.524c-1.286,1.372-2.084,3.777-1.365,5.5a4.705,4.705,0,0,0,4.4,2.914,4.191,4.191,0,0,0,3.161-1.563l27.382-29.007-7.814-8.372Z"/><path d="M427.571,255.154c1.859,0,3.1,1.24,3.985,3.453,1.062-2.213,2.568-3.453,4.694-3.453h14.878a4.062,4.062,0,0,1,4.074,4.074v7.828c0,2.656-1.327,4.074-4.074,4.074-2.656,0-4.074-1.418-4.074-4.074V263.3H436.515a2.411,2.411,0,0,0-2.656,2.745v27.188h10.007c2.658,0,4.074,1.329,4.074,4.074s-1.416,4.074-4.074,4.074h-26.39c-2.659,0-3.986-1.328-3.986-4.074s1.327-4.074,3.986-4.074h8.236V263.3h-7.263c-2.656,0-3.985-1.329-3.985-4.074,0-2.658,1.329-4.074,3.985-4.074Z"/><path d="M539.233,255.154c2.656,0,4.074,1.416,4.074,4.074v34.007h10.1c2.746,0,4.074,1.329,4.074,4.074s-1.328,4.074-4.074,4.074H524.8c-2.656,0-4.074-1.328-4.074-4.074s1.418-4.074,4.074-4.074h10.362V263.3h-8.533c-2.744,0-4.073-1.329-4.073-4.074,0-2.658,1.329-4.074,4.073-4.074Zm4.22-17.615a5.859,5.859,0,1,1-5.819-5.819A5.9,5.9,0,0,1,543.453,237.539Z"/><path d="M605.143,259.228a4.589,4.589,0,0,1-.267,1.594L590,298.9a3.722,3.722,0,0,1-3.721,2.48h-5.933a3.689,3.689,0,0,1-3.808-2.48l-15.055-38.081a3.23,3.23,0,0,1-.355-1.594,4.084,4.084,0,0,1,4.164-4.074,3.8,3.8,0,0,1,3.718,2.656l14.348,36.134,13.9-36.134a3.8,3.8,0,0,1,3.72-2.656A4.084,4.084,0,0,1,605.143,259.228Z"/><path d="M390.61,255.154c5.018,0,8.206,3.312,8.206,8.4v37.831H363.308a4.813,4.813,0,0,1-5.143-4.929V283.427a8.256,8.256,0,0,1,7-8.148l25.507-3.572v-8.4H362.306a4.014,4.014,0,0,1-4.141-4.074c0-2.87,2.143-4.074,4.355-4.074Zm.059,38.081V279.942l-24.354,3.4v9.9Z"/><path d="M448.538,224.52h.077c1,.024,2.236,1.245,2.589,1.669l.023.028.024.026,46.664,50.433a3.173,3.173,0,0,1-.034,4.336l-4.893,5.2-6.876-8.134L446.652,230.4c-1.508-2.166-1.617-2.836-1.191-3.858a3.353,3.353,0,0,1,3.077-2.02m0-1.25a4.606,4.606,0,0,0-4.231,2.789c-.705,1.692-.2,2.88,1.349,5.1l39.493,47.722,7.789,9.214,5.853-6.221a4.417,4.417,0,0,0,.042-6.042L452.169,225.4s-1.713-2.08-3.524-2.124Z"/></g>`
    };

    // Icons that do not fit the square 24x24 grid carry their own geometry
    const geometry = {
      arxiv: { viewBox: "0 0 246.978 110.119", width: 36, height: 16 }
    };
    const { viewBox = "0 0 24 24", width = 16, height = 16 } = geometry[name] || {};

    const fillRule = name === "github" ? "" : 'fill="currentColor"';
    return `<svg class="${className}" viewBox="${viewBox}" ${fillRule} width="${width}" height="${height}">${icons[name] || ""}</svg>`;
  },

  // Formatting helpers
  toTitleCase: (text) =>
    text
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),

  normalizePath: (path) =>
    path.endsWith(".html") ? path.slice(0, -5) : path,

  ensureTrailingSlash: (path) => 
    path.endsWith("/") ? path : `${path}/`,

  buildItemHref: (item) => {
    if (item.link) {
      return item.link;
    }
    return `/item/?section=${item.section}&slug=${item.slug}`;
  },

  // Content lives in JSON/Markdown that changes independently of the scripts,
  // so always revalidate it instead of serving a stale copy from disk cache
  contentFetchOpts: { cache: "no-cache" },

  // Sections merged into the news feed shown on the home page and the blog list
  newsSections: ["blog", "research"],

  getItemDate: (item) => {
    if (!item) return new Date(0);

    if (item.date) {
      // Read "YYYY-MM-DD" as a local date; new Date() would treat it as UTC and
      // shift the displayed day for viewers west of Greenwich
      const isoParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(item.date);
      if (isoParts) {
        const [, year, month, day] = isoParts.map(Number);
        return new Date(year, month - 1, day);
      }
      return new Date(item.date);
    }

    if (!item.meta) return new Date(0);

    // Try parsing full date like "June 12, 2026"
    const datePart = item.meta.split("•")[0].trim();
    const parsedDate = Date.parse(datePart);
    if (!Number.isNaN(parsedDate)) {
      return new Date(parsedDate);
    }

    // Try extracting a 4-digit year from meta, e.g. "MSc thesis, 2025" -> 2025
    const yearMatch = item.meta.match(/\b(20\d{2})\b/);
    if (yearMatch) {
      return new Date(Number.parseInt(yearMatch[1], 10), 0, 1);
    }

    return new Date(0);
  },

  formatDate: (date) => {
    if (!date || date.getTime() === 0) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  },

  fetchSectionItems: async (section) => {
    const response = await fetch(`/content/${section}/index.json`, window.App.contentFetchOpts);
    if (!response.ok) {
      return [];
    }

    const items = await response.json();
    return items.map((item) => ({ ...item, section }));
  },

  // Newest first; entries sharing a date fall back to their section order
  // (news before research) so the ordering never depends on fetch timing
  compareByDateDesc: (a, b) => {
    const byDate = window.App.getItemDate(b) - window.App.getItemDate(a);
    if (byDate !== 0) {
      return byDate;
    }

    const rank = (item) => {
      const index = window.App.newsSections.indexOf(item.section);
      return index === -1 ? window.App.newsSections.length : index;
    };

    return rank(a) - rank(b);
  },

  // Single source of truth for the news feed: every news section, newest first
  fetchNewsItems: async () => {
    const groups = await Promise.all(
      window.App.newsSections.map((section) => window.App.fetchSectionItems(section))
    );

    return groups.flat().sort(window.App.compareByDateDesc);
  },

  fetchItemExcerpt: async (item) => {
    if (item.summary) {
      return marked.parse(item.summary);
    }

    const response = await fetch(`/content/${item.section}/${item.slug}.entry.md`, window.App.contentFetchOpts);
    if (!response.ok) {
      return "";
    }

    return marked.parse(await response.text());
  },

  // Source / paper shortcut icons shown in a card's tag row
  buildItemLinks: (item) => {
    const links = [];

    if (item.paper) {
      links.push(`
        <a href="${item.paper}" class="code-link" target="_blank" rel="noopener noreferrer" title="Read the paper on arXiv">
          ${window.App.getIcon("arxiv", "paper-icon-large")}
        </a>
      `);
    }

    if (item.dataset) {
      links.push(`
        <a href="${item.dataset}" class="code-link" target="_blank" rel="noopener noreferrer" title="View the dataset on Hugging Face">
          ${window.App.getIcon("huggingface", "code-icon-large")}
        </a>
      `);
    }

    if (item.code) {
      links.push(`
        <a href="${item.code}" class="code-link" target="_blank" rel="noopener noreferrer" title="View Code">
          ${window.App.getIcon("github", "code-icon-large")}
        </a>
      `);
    }

    if (!links.length) {
      return "";
    }

    return `<span class="card-links">${links.join("")}</span>`;
  },

  // Meta line shared by every list card and the item page: subtitle • authors • date
  buildItemMeta: (item) => {
    const parts = [];
    if (item.meta) parts.push(item.meta);
    if (item.authors && item.authors.length) parts.push(`By ${item.authors.join(", ")}`);

    const formattedDate = window.App.formatDate(window.App.getItemDate(item));
    if (formattedDate) parts.push(formattedDate);

    return parts.join(" • ");
  }
};

// Web Components definition
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    
    const cleanPath = path.replace(/\/index\.html$/, "/").replace(/\/$/, "");

    // Determine active layout
    const isHome = cleanPath === "" || cleanPath === "." || cleanPath.endsWith("/index");
    const isResearch = cleanPath.includes("/research") || 
                       cleanPath.includes("/projects") || 
                       cleanPath.includes("/publications") || 
                       cleanPath.includes("/theses") || 
                       (cleanPath.includes("/item") && section === "research");
    const isPeople = cleanPath.includes("/people");
    const isResources = cleanPath.includes("/resources");
    const isBlog = cleanPath.includes("/blog") || 
                   (cleanPath.includes("/item") && section === "blog");
    const isReach = cleanPath.includes("/reach");

    this.className = "site-header";
    this.innerHTML = `
      <div class="container header-content">
        <a class="brand ${isHome ? "is-active" : ""}" href="/">
          <img class="brand-logo" src="/assets/img/logo-ucu.png" alt="" />
          UCU UGV Club
        </a>
        <nav class="site-nav">
          <a class="${isResearch ? "active" : ""}" href="/research/">Research</a>
          <a class="${isPeople ? "active" : ""}" href="/people/">People</a>
          <a class="${isResources ? "active" : ""}" href="/resources/">Resources</a>
          <a class="${isBlog ? "active" : ""}" href="/blog/">Blog</a>
          <a class="${isReach ? "active" : ""}" href="/reach/">Reach us</a>
        </nav>
      </div>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.className = "site-footer";
    this.innerHTML = `
      <div class="container footer-grid">
        <div class="footer-brand">
          <img class="footer-logo footer-logo-large" src="/assets/img/logo-ucu-white.png" alt="" />
          <p class="footer-copy">&copy; 2026 Ukrainian Catholic University</p>
          <p class="footer-updated">Last updated: <span data-updated></span></p>
        </div>
        <div class="footer-col">
          <h4>Follow us</h4>
          <ul class="footer-social">
            <li><a href="https://github.com/ucu-autonomous-ugv/ucu-autonomous-ugv.github.io">${window.App.getIcon("github", "footer-icon")}GitHub</a></li>
            <li><a href="https://www.linkedin.com/company/ucu-apps/?originalSubdomain=ua">${window.App.getIcon("linkedin", "footer-icon")}LinkedIn</a></li>
            <li><a href="https://www.youtube.com/@ComputerScienceUCU">${window.App.getIcon("youtube", "footer-icon")}YouTube</a></li>
            <li><a href="https://huggingface.co/ucu-autonomous-ugv">${window.App.getIcon("huggingface", "footer-icon")}Hugging Face</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <p class="footer-contact">
            2 Kozelnytska Street<br />
            Lviv, 79026<br />
            Ukraine
          </p>
          <p class="footer-contact">
            Tel: (032) 240-99-44<br />
            Email: <a href="mailto:apps@ucu.edu.ua">apps@ucu.edu.ua</a>
          </p>
        </div>
      </div>
    `;

    // Dynamic timestamp logic
    const updateEl = this.querySelector("[data-updated]");
    if (updateEl) {
      const now = new Date();
      updateEl.textContent = now.toISOString().split("T")[0];
    }
  }
}

// Register components
customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
