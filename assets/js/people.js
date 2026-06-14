document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("people-container");
  if (!container) return;

  try {
    const response = await fetch("/content/people/index.json");
    const people = await response.json();

    const getLinkIcon = (type) => {
      let path = "";
      if (type === "github") {
        path = `<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>`;
      } else if (type === "linkedin") {
        path = `<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>`;
      } else {
        path = `<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 22.531c-3.12-.492-5.627-2.617-6.529-5.531h2.529c.307 2.504 1.83 4.673 4 5.531zm-2-7.531h-3.238c-.279-1.246-.429-2.58-.456-4h3.694c.027 1.42.177 2.754.456 4zm-.456-6h-3.694c.027-1.42.177-2.754.456-4h3.238c-.279 1.246-.429 2.58-.456 4zm2.456-6.469c-2.17.858-3.693 3.027-4 5.531h-2.529c.902-2.914 3.409-5.039 6.529-5.531zm4 12.938h-4c-.031-1.397-.183-2.748-.485-4h4.97c-.302 1.252-.454 2.603-.485 4zm.031-6h-5.032c.031-1.397.183-2.748.485-4h4.062c-.302 1.252-.454 2.603-.485 4zm-.031-2.469c.307-2.504 1.83-4.673 4-5.531v2.529c-3.12.492-5.627 2.617-6.529 5.531h2.529zm4 5.531h-2.529c-.307 2.914-1.83 5.039-4 5.531v-2.529c3.12-.492 5.627-2.617 6.529-5.531zm2 2c-.279 1.246-.429 2.58-.456 4h-3.694c.027-1.42-.177-2.754-.456-4h4.606zm.456-4h-4.606c.279-1.246.429-2.58.456-4h3.694c-.027 1.42-.177 2.754-.456 4z"/>`;
      }
      return `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">${path}</svg>`;
    };

    const getAvatarMarkup = (person) => {
      if (person.avatar) {
        return `<img src="${person.avatar}" alt="${person.name}" class="people-avatar" />`;
      }
      const initials = person.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
      return `
        <div class="people-avatar-placeholder">
          <span>${initials}</span>
        </div>
      `;
    };

    const buildSocialLinks = (links) => {
      if (!links) return "";
      return Object.entries(links)
        .map(
          ([key, url]) =>
            `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${key}">${getLinkIcon(key)}</a>`
        )
        .join("");
    };

    const renderCards = (groupList, heading) => {
      if (groupList.length === 0) return "";
      
      const grid = document.createElement("div");
      grid.className = "people-grid";

      groupList.forEach((person) => {
        const card = document.createElement("article");
        card.className = "people-card";
        card.innerHTML = `
          <div class="people-card-header">
            ${getAvatarMarkup(person)}
            <div class="people-card-identity">
              <h3>${person.name}</h3>
              <p class="people-role">${person.role}</p>
              ${person.classYear ? `<p class="people-class">${person.classYear}</p>` : ""}
            </div>
          </div>
          <div class="people-card-body">
            <p>${person.bio || ""}</p>
          </div>
          <div class="people-card-footer">
            ${buildSocialLinks(person.links)}
          </div>
        `;
        grid.appendChild(card);
      });

      const sectionTitle = document.createElement("h2");
      sectionTitle.className = "people-section-title";
      sectionTitle.textContent = heading;

      const sectionWrap = document.createElement("div");
      sectionWrap.className = "people-section-wrap";
      sectionWrap.appendChild(sectionTitle);
      sectionWrap.appendChild(grid);
      return sectionWrap;
    };

    const renderAlumni = (alumniList) => {
      if (alumniList.length === 0) return "";

      const wrap = document.createElement("div");
      wrap.className = "people-section-wrap alumni-section-wrap";

      const sectionTitle = document.createElement("h2");
      sectionTitle.className = "people-section-title";
      sectionTitle.textContent = "Alumni";
      wrap.appendChild(sectionTitle);

      const list = document.createElement("ul");
      list.className = "alumni-list";

      // Group alumni by classYear
      const grouped = alumniList.reduce((acc, person) => {
        const yr = person.classYear || "Unknown Class";
        if (!acc[yr]) acc[yr] = [];
        acc[yr].push(person);
        return acc;
      }, {});

      // Sort class years descending
      const sortedYears = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

      sortedYears.forEach((year) => {
        const subheader = document.createElement("li");
        subheader.className = "alumni-year-header";
        subheader.textContent = year;
        list.appendChild(subheader);

        grouped[year].forEach((person) => {
          const item = document.createElement("li");
          item.className = "alumni-item";

          let linksHtml = "";
          if (person.links) {
            linksHtml = Object.entries(person.links)
              .map(([key, url]) => `<a class="alumni-link" href="${url}" target="_blank" rel="noopener noreferrer">${key}</a>`)
              .join(" • ");
          }

          item.innerHTML = `
            <span class="alumni-name">${person.name}</span>
            <span class="alumni-role">— ${person.currentPosition || person.role}</span>
            ${linksHtml ? `<span class="alumni-links-wrap">[ ${linksHtml} ]</span>` : ""}
          `;
          list.appendChild(item);
        });
      });

      wrap.appendChild(list);
      return wrap;
    };

    // Separate categories
    const leadership = people.filter((p) => p.category === "noclas");
    const students = people.filter((p) => p.category === "student");
    const alumni = people.filter((p) => p.category === "alumni");

    // Render leadership
    if (leadership.length > 0) {
      container.appendChild(renderCards(leadership, "Faculty & Leadership"));
    }

    // Render students
    if (students.length > 0) {
      container.appendChild(renderCards(students, "Students"));
    }

    // Render alumni
    if (alumni.length > 0) {
      container.appendChild(renderAlumni(alumni));
    }

  } catch (error) {
    console.error("Error loading people:", error);
    container.innerHTML = `<p class="error">Failed to load team profiles. Please try again later.</p>`;
  }
});
