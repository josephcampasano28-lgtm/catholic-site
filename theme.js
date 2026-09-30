(function () {
  const root = document.documentElement;

  let theme = "light";
  try {
    const saved = localStorage.getItem("theme");
    if (saved) {
      theme = saved;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }
  } catch (e) {}
  root.setAttribute("data-theme", theme);

  const nav = document.querySelector("nav");
  if (!nav) return;

  const btn = document.createElement("button");
  btn.className = "theme-toggle";
  btn.type = "button";

  function updateLabel() {
    const dark = root.getAttribute("data-theme") === "dark";
    btn.textContent = "";
    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = dark ? "\u2600" : "\u263E";
    btn.appendChild(icon);
    btn.append(dark ? " Light" : " Dark");
  }
  updateLabel();

  function applyTheme(next) {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    updateLabel();
  }

  btn.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      applyTheme(next);
      return;
    }

    if (document.startViewTransition) {
      const r = btn.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(function () {
        applyTheme(next);
        btn.classList.add("spin");
      });

      transition.ready
        .then(function () {
          root.animate(
            {
              clipPath: [
                "circle(0px at " + x + "px " + y + "px)",
                "circle(" + radius + "px at " + x + "px " + y + "px)"
              ]
            },
            {
              duration: 800,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)"
            }
          );
        })
        .catch(function () {});

      transition.finished
        .then(function () {
          btn.classList.remove("spin");
        })
        .catch(function () {
          btn.classList.remove("spin");
        });
    } else {
      root.classList.add("theme-fading");
      applyTheme(next);
      btn.classList.add("spin");
      setTimeout(function () {
        root.classList.remove("theme-fading");
        btn.classList.remove("spin");
      }, 800);
    }
  });

  nav.appendChild(btn);
})();
