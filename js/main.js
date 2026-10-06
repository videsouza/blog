/* =========================================================
   main.js — renderiza os links e cuida das interações
   (não precisa editar; gerencie tudo em js/content.js)
   ========================================================= */
(function () {
  "use strict";

  var ICONS = window.ICONS || {};
  var LINKS = window.LINKS || [];

  function iconSvg(name) {
    return ICONS[name] || ICONS.link || "";
  }

  // Insere SVG de forma controlada (apenas marcação interna de ícones nossos)
  function makeIcon(name) {
    var span = document.createElement("span");
    span.className = "link-icon";
    span.innerHTML = iconSvg(name);
    return span;
  }

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  function buildCard(item, index) {
    var a = document.createElement("a");
    a.className = "link-card";
    a.href = item.url || "#";

    if (isExternal(item.url)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    // Cores do ícone (via custom properties, sem CSS inline executável)
    if (item.color) a.style.setProperty("--accent-fg", item.color);
    if (item.bg) a.style.setProperty("--accent-bg", item.bg);

    // Ícone
    a.appendChild(makeIcon(item.icon));

    // Texto
    var textWrap = document.createElement("span");
    textWrap.className = "link-text";

    var title = document.createElement("span");
    title.className = "link-title";
    title.textContent = item.title || "";
    textWrap.appendChild(title);

    if (item.sub) {
      var sub = document.createElement("span");
      sub.className = "link-sub";
      sub.textContent = item.sub;
      textWrap.appendChild(sub);
    }
    a.appendChild(textWrap);

    // Seta
    var arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.innerHTML = iconSvg("arrow");
    a.appendChild(arrow);

    a.setAttribute("aria-label", item.title || "link");
    a.style.transitionDelay = (index * 55) + "ms";
    return a;
  }

  function render() {
    var container = document.getElementById("links");
    if (!container) return;
    var frag = document.createDocumentFragment();
    LINKS.forEach(function (item, i) { frag.appendChild(buildCard(item, i)); });
    container.appendChild(frag);

    // Animação de entrada
    requestAnimationFrame(function () {
      container.querySelectorAll(".link-card").forEach(function (c) {
        c.classList.add("is-in");
      });
    });
  }

  // Monograma a partir das iniciais do nome exibido
  function setMonogram() {
    var box = document.getElementById("monogram");
    var nameEl = document.querySelector(".name");
    if (!box || !nameEl) return;
    var parts = nameEl.textContent.trim().split(/\s+/);
    var initials = parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0])
      : parts[0].slice(0, 2);
    box.textContent = initials.toUpperCase();
  }

  function setYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    setMonogram();
    setYear();
  });
})();
