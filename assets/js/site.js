// Centralized namespace for shared utilities and components
window.App = {
  // Shared icon provider
  getIcon: (name, className = "") => {
    const icons = {
      github: `<path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.624-5.475 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>`,
      linkedin: `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>`,
      youtube: `<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>`,
      external: `<path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.97 7 1.96 2 6.963-7 3.993 4v-10z"/>`,
      globe: `<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 22.531c-3.12-.492-5.627-2.617-6.529-5.531h2.529c.307 2.504 1.83 4.673 4 5.531zm-2-7.531h-3.238c-.279-1.246-.429-2.58-.456-4h3.694c.027 1.42.177 2.754.456 4zm-.456-6h-3.694c.027-1.42.177-2.754.456-4h3.238c-.279 1.246-.429 2.58-.456 4zm2.456-6.469c-2.17.858-3.693 3.027-4 5.531h-2.529c.902-2.914 3.409-5.039 6.529-5.531zm4 12.938h-4c-.031-1.397-.183-2.748-.485-4h4.97c-.302 1.252-.454 2.603-.485 4zm.031-6h-5.032c.031-1.397.183-2.748.485-4h4.062c-.302 1.252-.454 2.603-.485 4zm-.031-2.469c.307-2.504 1.83-4.673 4-5.531v2.529c-3.12.492-5.627 2.617-6.529 5.531h2.529zm4 5.531h-2.529c-.307 2.914-1.83 5.039-4 5.531v-2.529c3.12-.492 5.627-2.617 6.529-5.531zm2 2c-.279 1.246-.429 2.58-.456 4h-3.694c.027-1.42-.177-2.754-.456-4h4.606zm.456-4h-4.606c.279-1.246.429-2.58.456-4h3.694c-.027 1.42-.177 2.754-.456 4z"/>`
    };
    const fillRule = name === "github" ? "" : 'fill="currentColor"';
    return `<svg class="${className}" viewBox="0 0 24 24" ${fillRule} width="16" height="16">${icons[name] || ""}</svg>`;
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
          <img class="brand-logo" src="/assets/img/logo.svg" alt="" />
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
          <img class="footer-logo footer-logo-large" src="/assets/img/logo_white.svg" alt="" />
          <p class="footer-copy">&copy; 2026 Ukrainian Catholic University</p>
          <p class="footer-updated">Last updated: <span data-updated></span></p>
        </div>
        <div class="footer-col">
          <h4>Follow us</h4>
          <ul class="footer-social">
            <li><a href="https://github.com/ucu-autonomous-ugv">${window.App.getIcon("github", "footer-icon")}GitHub</a></li>
            <li><a href="#">${window.App.getIcon("linkedin", "footer-icon")}LinkedIn</a></li>
            <li><a href="#">${window.App.getIcon("youtube", "footer-icon")}YouTube</a></li>
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
            Tel: +380 00 000 00 00<br />
            Email: <a href="mailto:hello@example.com">hello@example.com</a>
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
