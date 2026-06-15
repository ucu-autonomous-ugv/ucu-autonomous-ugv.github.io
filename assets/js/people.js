document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("people-container");
  if (!container) return;

  try {
    const response = await fetch("/content/people/index.json");
    const people = await response.json();

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
            `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${key}">${window.App.getIcon(key, "social-icon")}</a>`
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
