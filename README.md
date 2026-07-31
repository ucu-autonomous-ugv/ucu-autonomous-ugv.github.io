# UCU Autonomous UGV Club

The official website of the **UCU Autonomous UGV Lab & Student Club** at the Ukrainian Catholic University, published via GitHub Pages at [ucu-autonomous-ugv.github.io](https://ucu-autonomous-ugv.github.io).

The site presents the club's research, projects, theses, publications, people, and resources, and hosts a blog with news and updates.

## Tech stack

A static site with no build step, framework, or package manager:

- Plain **HTML** pages with shared `<site-header>` / `<site-footer>` web components ([assets/js/site.js](assets/js/site.js))
- Plain **CSS** ([assets/css/](assets/css/))
- Vanilla **JavaScript** for rendering content client-side ([assets/js/content.js](assets/js/content.js), [assets/js/home.js](assets/js/home.js), [assets/js/people.js](assets/js/people.js), [assets/js/resources.js](assets/js/resources.js))
- [marked](https://github.com/markedjs/marked) (loaded from CDN) to render Markdown content in the browser

## Project structure

```
index.html            Home page
research/, projects/, publications/, theses/
                       Research listing (all share the "research" content section)
people/                People / team listing
resources/              Curated resources listing
blog/                   Blog listing
reach/                  Contact page
item/                   Generic detail page for a single content entry
assets/
  css/                  Stylesheets
  js/                   Site behavior and rendering logic
  img/, video/          Static media
content/
  research/, people/, resources/, blog/
                        JSON indexes + Markdown entries that drive each section
```

## Content model

Pages don't contain content directly — each listing page reads a JSON index from `content/<section>/index.json` and renders it client-side with `fetch`. Detail pages (blog posts, research entries) also load a matching Markdown file.

- **Research / Projects / Theses / Publications** (`content/research/`): entries in `index.json` have a `kind` of `Project`, `Thesis`, or `Publication`; the `/research/` page filters by tab. Each entry can either link out (`link`) or render its own Markdown page (`content/research/<slug>.md`).
- **Blog** (`content/blog/`): each post needs an entry in `index.json`, a short `<slug>.entry.md` excerpt shown in the list, and a full `<slug>.page.md` for the detail page.
- **People** (`content/people/`): entries in `index.json`, with `category` of `student`, `alumni`, or a custom category.
- **Resources** (`content/resources/`): entries in `index.json` grouped by `category`.

To add content, edit the relevant `index.json` (and Markdown files for research/blog entries) — no rebuild is required.

## Local development

Since this is a static site, serve the repository root with any local web server (fetches for JSON/Markdown content require `http(s)://`, so opening `index.html` directly via `file://` will not work):

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.

## Deployment

The site is deployed automatically by GitHub Pages from this repository — pushing to `main` publishes the change.
