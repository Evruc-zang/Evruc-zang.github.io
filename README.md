# Ziming Zang · Academic Homepage

Personal academic homepage deployed at <https://evruc-zang.github.io/>.
The home page is adapted from the [Luka Homepage Template](https://github.com/wzsyyh/luka-homepage-template)
and populated with information from Ziming Zang's English CV.

## Features

- Responsive academic-homepage layout with profile sidebar and research sections.
- Light/dark theme toggle.
- Education, research experience, academic activities, publications, awards, and skills.
- Downloadable CV at `assets/cv/Ziming_Zang_Resume_EN.pdf`.
- Static HTML, CSS, and JavaScript; no build step is required.

## Local preview

From the repository root, run:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000/>.

## Updating content

- Homepage sections and metadata: `index.html`
- Downloadable CV: replace `assets/cv/Ziming_Zang_Resume_EN.pdf`
- Homepage styles: `assets/css/theme-luka.css`
- Profile photo: replace `assets/img/portrait.jpg`

The existing `cv.html`, `projects.html`, and `publications.html` pages are retained
from the previous site and remain directly accessible.

## Deployment

The site is hosted by GitHub Pages from the `main` branch at the repository root.
After making changes:

```powershell
git add .
git commit -m "Update academic homepage"
git push
```

## Attribution and license

The homepage design is adapted from the Luka Homepage Template by
[Yuheng Yang](https://wzsyyh.github.io/). The original template license is included
in [`LUKA-TEMPLATE-LICENSE.md`](LUKA-TEMPLATE-LICENSE.md).
