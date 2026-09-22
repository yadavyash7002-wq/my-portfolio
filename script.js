/* =====================================================
   EASY EDIT SECTION
   YAHAN BAAD MEIN DATA CHANGE KARNA HAI
===================================================== */

const PORTFOLIO = {

  /* ---------------------------------
     PERSONAL INFO
  ---------------------------------- */

  email: "YOUR_EMAIL@example.com",

  github:
    "https://github.com/yadavyash7002-wq",

  linkedin:
    "https://www.linkedin.com/",


  /* ---------------------------------
     SKILLS
  ---------------------------------- */

  skills: [

    {
      name: "HTML",
      type: "Web"
    },

    {
      name: "CSS",
      type: "Web"
    },

    {
      name: "JavaScript",
      type: "Web"
    },

    {
      name: "Make.com",
      type: "Automation"
    },

    {
      name: "Workflow Automation",
      type: "Automation"
    },

    {
      name: "C++",
      type: "Currently Learning"
    }

  ],


  /* ---------------------------------
     PROJECTS

     ADD NEW PROJECT LIKE THIS:

     {
       title: "Project Name",
       description: "Project description.",
       number: "02",
       tags: ["HTML", "CSS", "JavaScript"],
       link: "https://github.com/..."
     }

  ---------------------------------- */

  projects: [

    /*
    {
      title: "Your Project",
      description:
        "Write what the project actually does here.",
      number: "01",
      tags: [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      link:
        "https://github.com/your-project"
    }
    */

  ]

};


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  setupYear();

  setupNavbar();

  setupMobileMenu();

  setupHeroName();

  renderSkills();

  renderProjects();

  setupRevealAnimations();

  setupContactLinks();

});


/* =====================================================
   YEAR
===================================================== */

function setupYear() {

  const yearElement =
    document.getElementById("currentYear");

  if (!yearElement) {
    return;
  }

  yearElement.textContent =
    new Date().getFullYear();

}


/* =====================================================
   NAVBAR
===================================================== */

function setupNavbar() {

  const navbar =
    document.querySelector(".navbar");

  if (!navbar) {
    return;
  }

  const updateNavbar =
    () => {

      if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

      } else {

        navbar.classList.remove("scrolled");

      }

    };

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

}


/* =====================================================
   MOBILE MENU
===================================================== */

function setupMobileMenu() {

  const toggle =
    document.getElementById("menuToggle");

  const menu =
    document.getElementById("mobileMenu");

  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener(
    "click",
    () => {

      const isOpen =
        toggle.classList.toggle("active");

      menu.classList.toggle(
        "open",
        isOpen
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

      toggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );


  const menuLinks =
    menu.querySelectorAll("a");

  menuLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          toggle.classList.remove("active");

          menu.classList.remove("open");

          document.body.classList.remove(
            "menu-open"
          );

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    }
  );

}


/* =====================================================
   HERO NAME ANIMATION
===================================================== */

function setupHeroName() {

  const nameButton =
    document.getElementById("heroName");

  if (!nameButton) {
    return;
  }

  nameButton.addEventListener(
    "click",
    () => {

      nameButton.classList.remove(
        "active"
      );

      /*
       Re-trigger animation
      */

      void nameButton.offsetWidth;

      nameButton.classList.add(
        "active"
      );

    }
  );

}


/* =====================================================
   RENDER SKILLS
===================================================== */

function renderSkills() {

  const container =
    document.getElementById("skillsGrid");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  PORTFOLIO.skills.forEach(
    (skill, index) => {

      const card =
        document.createElement("div");

      card.className =
        "skill-card";


      card.innerHTML = `

        <div class="skill-left">

          <span class="skill-index">
            ${String(index + 1).padStart(2, "0")}
          </span>

          <span class="skill-name">
            ${escapeHTML(skill.name)}
          </span>

        </div>

        <span class="skill-type">
          ${escapeHTML(skill.type)}
        </span>

      `;


      container.appendChild(card);

    }
  );

}


/* =====================================================
   RENDER PROJECTS
===================================================== */

function renderProjects() {

  const container =
    document.getElementById("projectsList");

  if (!container) {
    return;
  }

  container.innerHTML = "";


  /*
     NO PROJECTS YET
  */

  if (
    !Array.isArray(PORTFOLIO.projects) ||
    PORTFOLIO.projects.length === 0
  ) {

    container.innerHTML = `

      <div class="empty-project">

        <p>
          Projects will appear here as they are added.
          <br />
          Update the PROJECTS section in script.js.
        </p>

      </div>

    `;

    return;
  }


  /*
     PROJECT CARDS
  */

  PORTFOLIO.projects.forEach(
    (project, index) => {

      const number =
        project.number ||
        String(index + 1).padStart(2, "0");


      const card =
        document.createElement("article");

      card.className =
        "project-card";


      const tags =
        Array.isArray(project.tags)
          ? project.tags
          : [];


      const tagsHTML =
        tags.map(
          tag =>
            `<span>${escapeHTML(tag)}</span>`
        ).join("");


      const safeLink =
        project.link || "#";


      card.innerHTML = `

        <div class="project-number">
          ${escapeHTML(number)}
        </div>

        <div>

          <h3>
            ${escapeHTML(project.title)}
          </h3>

          <p class="project-description">
            ${escapeHTML(project.description)}
          </p>

          <div class="project-tags">
            ${tagsHTML}
          </div>

        </div>

        <a
          class="project-link"
          href="${escapeAttribute(safeLink)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open project"
        >
          ↗
        </a>

      `;


      container.appendChild(card);

    }
  );

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function setupRevealAnimations() {

  const elements =
    document.querySelectorAll(".reveal");


  /*
     Reduced motion:
     show everything immediately
  */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reducedMotion) {

    elements.forEach(
      element =>
        element.classList.add("visible")
    );

    return;
  }


  /*
     Intersection Observer
  */

  const observer =
    new IntersectionObserver(
      (entries, obs) => {

        entries.forEach(
          entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            obs.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );


  elements.forEach(
    element =>
      observer.observe(element)
  );

}


/* =====================================================
   CONTACT LINKS
===================================================== */

function setupContactLinks() {

  const emailLink =
    document.getElementById("emailLink");

  if (emailLink) {

    emailLink.href =
      `mailto:${PORTFOLIO.email}`;

    emailLink.childNodes[0].nodeValue =
      `${PORTFOLIO.email} `;

  }


  const githubLinks =
    document.querySelectorAll(
      'a[href*="github.com"]'
    );


  githubLinks.forEach(
    link => {

      link.href =
        PORTFOLIO.github;

    }
  );


  const linkedinLinks =
    document.querySelectorAll(
      'a[href*="linkedin.com"]'
    );


  linkedinLinks.forEach(
    link => {

      link.href =
        PORTFOLIO.linkedin;

    }
  );

}


/* =====================================================
   ESCAPE HELPERS
===================================================== */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

  return String(value)
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

      }
