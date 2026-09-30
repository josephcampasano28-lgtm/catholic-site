(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Back to top button ----------
  const top = document.createElement("button");
  top.id = "to-top";
  top.type = "button";
  top.setAttribute("aria-label", "Back to top");
  top.textContent = "\u2191";
  document.body.appendChild(top);

  window.addEventListener(
    "scroll",
    function () {
      top.classList.toggle("show", window.scrollY > 400);
    },
    { passive: true }
  );

  top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  if (reduce) return;

  // ---------- Hero sparkles ----------
  const hero = document.querySelector(".hero");
  if (hero) {
    for (let i = 0; i < 22; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      const size = 3 + Math.random() * 5;
      s.style.left = Math.random() * 100 + "%";
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.animationDuration = 5 + Math.random() * 6 + "s";
      s.style.animationDelay = Math.random() * 8 + "s";
      hero.appendChild(s);
    }
  }

  // ---------- Card tilt ----------
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse" || card.classList.contains("reveal")) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = "transform 0.1s";
      card.style.transform =
        "perspective(700px) rotateX(" + -py * 8 + "deg) rotateY(" + px * 8 + "deg) translateY(-3px)";
    });
    card.addEventListener("pointerleave", function () {
      card.style.transition = "transform 0.3s, box-shadow 0.2s";
      card.style.transform = "";
    });
  });

  // ---------- Button ripple ----------
  document.querySelectorAll(".button").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const dot = document.createElement("span");
      dot.className = "ripple";
      dot.style.width = size + "px";
      dot.style.height = size + "px";
      dot.style.left = e.clientX - r.left - size / 2 + "px";
      dot.style.top = e.clientY - r.top - size / 2 + "px";
      btn.appendChild(dot);
      setTimeout(function () {
        dot.remove();
      }, 600);
    });
  });

  // ---------- Page fade when changing pages ----------
  document.addEventListener("click", function (e) {
    const a = e.target.closest("a");
    if (!a || !a.href || a.target === "_blank") return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(function () {
      location.href = a.href;
    }, 280);
  });

  window.addEventListener("pageshow", function () {
    document.body.classList.remove("leaving");
  });
})();
