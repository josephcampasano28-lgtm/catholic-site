(function () {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");
  if (!buttons.length) return;

  function show(id) {
    buttons.forEach(function (b) {
      const on = b.dataset.tab === id;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (p) {
      p.classList.toggle("active", p.id === id);
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      show(b.dataset.tab);
      history.replaceState(null, "", "#" + b.dataset.tab);
    });
  });

  const start = location.hash.replace("#", "");
  show(["child", "teen", "adult"].includes(start) ? start : "child");
})();
