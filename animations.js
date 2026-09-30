(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  document.documentElement.classList.add("js-anim");

  // ---------- Scroll progress bar ----------
  const bar = document.createElement("div");
  bar.id = "progress";
  document.body.appendChild(bar);

  function updateBar() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateBar, { passive: true });
  updateBar();

  // ---------- Reveal on scroll ----------
  const items = document.querySelectorAll(
    "main h2, .card, .daily, #search-box, main > ul, main > p"
  );

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");
        observer.unobserve(el);

        // Clean up afterwards so hover effects work normally again
        setTimeout(function () {
          el.classList.remove("reveal", "visible");
          el.style.transitionDelay = "";
        }, 1200);
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(function (el) {
    el.classList.add("reveal");
    if (el.classList.contains("card")) {
      const index = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.transitionDelay = (index % 4) * 90 + "ms";
    }
    observer.observe(el);
  });
})();
