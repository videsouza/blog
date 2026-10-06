/* =========================================================
   pages.js — renderiza as páginas de Currículo e Serviços
   (não precisa editar; gerencie o conteúdo nos arquivos
    js/cv-content.js e js/services-content.js)
   ========================================================= */
(function () {
  "use strict";

  var ICONS = window.ICONS || {};
  function iconSvg(name) { return ICONS[name] || ICONS.link || ""; }
  function isExternal(url) { return /^https?:\/\//i.test(url); }

  function el(tag, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }

  function anchor(label, url, cls) {
    var a = el("a", cls);
    a.href = url || "#";
    if (isExternal(url)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    a.textContent = label;
    return a;
  }

  /* ---------- Timeline (formação / experiência / publicações) ---------- */
  function renderTimeline(id, items) {
    var box = document.getElementById(id);
    if (!box || !items) return;
    items.forEach(function (it) {
      var period = el("div", "tl-period"); period.textContent = it.period || "";

      var body = el("div", "tl-body");
      var h3 = el("h3"); h3.textContent = it.title || ""; body.appendChild(h3);
      if (it.org) { var org = el("div", "org"); org.textContent = it.org; body.appendChild(org); }
      if (it.detail) { var p = el("p"); p.textContent = it.detail; body.appendChild(p); }

      var li = el("li", "tl-item reveal");
      li.appendChild(period);
      li.appendChild(body);
      box.appendChild(li);
    });
  }

  /* ---------- Currículo ---------- */
  function renderCV() {
    var CV = window.CV;
    if (!CV) return;

    var sum = document.getElementById("cv-summary");
    if (sum) sum.textContent = CV.summary || "";

    var contact = document.getElementById("cv-contact");
    if (contact && CV.contact) {
      CV.contact.forEach(function (c) { contact.appendChild(anchor(c.label, c.url)); });
    }

    renderTimeline("cv-education", CV.education);
    renderTimeline("cv-experience", CV.experience);
    renderTimeline("cv-publications", CV.publications);

    var skills = document.getElementById("cv-skills");
    if (skills && CV.skills) {
      CV.skills.forEach(function (s) {
        var chip = el("span", "chip"); chip.textContent = s; skills.appendChild(chip);
      });
    }

    var details = document.getElementById("cv-details");
    if (details && CV.details) {
      CV.details.forEach(function (d) {
        var li = el("li");
        var k = el("span", "k"); k.textContent = d.k || "";
        var v = el("span", "v"); v.textContent = d.v || "";
        li.appendChild(k); li.appendChild(v);
        details.appendChild(li);
      });
    }
  }

  /* ---------- Serviços ---------- */
  function renderServices() {
    var S = window.SERVICES_PAGE;
    if (!S) return;

    var title = document.getElementById("sv-title");
    if (title && S.title) title.textContent = S.title;
    var lede = document.getElementById("sv-lede");
    if (lede) lede.textContent = S.lede || "";

    var grid = document.getElementById("services-grid");
    if (grid && S.services) {
      S.services.forEach(function (sv) {
        var card = el("article", "service-card reveal");
        if (sv.color) card.style.setProperty("--accent-fg", sv.color);
        if (sv.bg) card.style.setProperty("--accent-bg", sv.bg);

        var icon = el("div", "service-icon");
        icon.innerHTML = iconSvg(sv.icon);
        card.appendChild(icon);

        var h3 = el("h3"); h3.textContent = sv.title || ""; card.appendChild(h3);
        if (sv.price) { var pr = el("div", "price"); pr.textContent = sv.price; card.appendChild(pr); }
        if (sv.desc) { var p = el("p"); p.textContent = sv.desc; card.appendChild(p); }

        if (sv.feats && sv.feats.length) {
          var ul = el("ul", "feats");
          sv.feats.forEach(function (f) { var li = el("li"); li.textContent = f; ul.appendChild(li); });
          card.appendChild(ul);
        }

        if (sv.cta && sv.cta.url) {
          var ctaWrap = el("div", "service-cta");
          var a = anchor(sv.cta.label || "Saiba mais", sv.cta.url);
          var arrow = el("span");
          arrow.innerHTML = iconSvg("arrow");
          a.appendChild(arrow.firstChild);
          ctaWrap.appendChild(a);
          card.appendChild(ctaWrap);
        }
        grid.appendChild(card);
      });
    }

    if (S.cta) {
      var ct = document.getElementById("cta-title"); if (ct) ct.textContent = S.cta.title || ct.textContent;
      var cx = document.getElementById("cta-text"); if (cx) cx.textContent = S.cta.text || cx.textContent;
      var cb = document.getElementById("cta-btn");
      if (cb) { cb.textContent = S.cta.label || cb.textContent; cb.href = S.cta.url || cb.href; }
    }
  }

  /* ---------- Livros ---------- */
  function renderBooks() {
    var B = window.BOOKS_PAGE;
    if (!B) return;
    var t = document.getElementById("books-title"); if (t && B.title) t.textContent = B.title;
    var l = document.getElementById("books-lede"); if (l) l.textContent = B.lede || "";
    var grid = document.getElementById("books-grid");
    if (!grid || !B.books) return;
    B.books.forEach(function (b) {
      var cover = el("div", "book-cover");
      if (b.cover) {
        var img = el("img"); img.src = b.cover; img.alt = "Capa: " + (b.title || "");
        img.loading = "lazy"; cover.appendChild(img);
      } else {
        var ph = el("span", "ph-title"); ph.textContent = b.title || ""; cover.appendChild(ph);
      }
      var h3 = el("h3"); h3.textContent = b.title || "";
      var yr = el("div", "book-year"); yr.textContent = b.year || "";
      var p = el("p"); p.textContent = b.blurb || "";
      var links = el("div", "book-links");
      (b.links || []).forEach(function (lk) { links.appendChild(anchor(lk.label, lk.url)); });
      var card = el("article", "book-card reveal");
      card.appendChild(cover); card.appendChild(h3); card.appendChild(yr);
      card.appendChild(p); card.appendChild(links);
      grid.appendChild(card);
    });
  }

  /* ---------- Apps & Sistemas ---------- */
  function renderApps() {
    var A = window.APPS_PAGE;
    if (!A) return;
    var t = document.getElementById("apps-title"); if (t && A.title) t.textContent = A.title;
    var l = document.getElementById("apps-lede"); if (l) l.textContent = A.lede || "";
    var grid = document.getElementById("apps-grid");
    if (!grid || !A.apps) return;
    A.apps.forEach(function (ap) {
      var card = el("article", "app-card reveal");
      if (ap.color) card.style.setProperty("--accent-fg", ap.color);
      if (ap.bg) card.style.setProperty("--accent-bg", ap.bg);

      var top = el("div", "app-top");
      var icon = el("div", "app-icon"); icon.innerHTML = iconSvg(ap.icon); top.appendChild(icon);
      var head = el("div", "app-head");
      var h3 = el("h3"); h3.textContent = ap.title || ""; head.appendChild(h3);
      if (ap.status) { var st = el("div", "app-status"); st.textContent = ap.status; head.appendChild(st); }
      top.appendChild(head);
      card.appendChild(top);

      if (ap.desc) { var p = el("p"); p.textContent = ap.desc; card.appendChild(p); }
      if (ap.tags && ap.tags.length) {
        var tags = el("div", "app-tags");
        ap.tags.forEach(function (tg) { var s = el("span", "tag"); s.textContent = tg; tags.appendChild(s); });
        card.appendChild(tags);
      }
      if (ap.links && ap.links.length) {
        var lw = el("div", "app-links");
        ap.links.forEach(function (lk) { lw.appendChild(anchor(lk.label, lk.url)); });
        card.appendChild(lw);
      }
      grid.appendChild(card);
    });
  }

  /* ---------- Downloads ---------- */
  function renderDownloads() {
    var D = window.DOWNLOADS_PAGE;
    if (!D) return;
    var t = document.getElementById("dl-title"); if (t && D.title) t.textContent = D.title;
    var l = document.getElementById("dl-lede"); if (l) l.textContent = D.lede || "";
    var list = document.getElementById("downloads-list");
    if (!list || !D.items) return;
    D.items.forEach(function (it) {
      var li = el("li", "download-item reveal");

      var badge = el("span", "dl-badge"); badge.textContent = it.format || "FILE";
      li.appendChild(badge);

      var body = el("div", "dl-body");
      var h3 = el("h3"); h3.textContent = it.title || ""; body.appendChild(h3);
      if (it.desc) { var p = el("p"); p.textContent = it.desc; body.appendChild(p); }
      if (it.size) { var sz = el("div", "dl-size"); sz.textContent = it.size; body.appendChild(sz); }
      li.appendChild(body);

      var btn = el("a", "dl-btn");
      btn.href = it.url || "#";
      if (isExternal(it.url)) { btn.target = "_blank"; btn.rel = "noopener noreferrer"; }
      else { btn.setAttribute("download", ""); }
      var ic = el("span"); ic.innerHTML = iconSvg("download");
      if (ic.firstChild) btn.appendChild(ic.firstChild);
      btn.appendChild(document.createTextNode("Baixar"));
      li.appendChild(btn);

      list.appendChild(li);
    });
  }

  /* ---------- Livros ---------- */
  function renderBooks() {
    var B = window.BOOKS_PAGE;
    if (!B) return;
    var t = document.getElementById("books-title"); if (t && B.title) t.textContent = B.title;
    var l = document.getElementById("books-lede"); if (l) l.textContent = B.lede || "";
    var grid = document.getElementById("books-grid");
    if (!grid || !B.books) return;
    B.books.forEach(function (b) {
      var cover = el("div", "book-cover");
      if (b.cover) {
        var img = el("img"); img.src = b.cover; img.alt = "Capa: " + (b.title || "");
        img.loading = "lazy"; cover.appendChild(img);
      } else {
        var ph = el("span", "ph-title"); ph.textContent = b.title || ""; cover.appendChild(ph);
      }
      var h3 = el("h3"); h3.textContent = b.title || "";
      var yr = el("div", "book-year"); yr.textContent = b.year || "";
      var p = el("p"); p.textContent = b.blurb || "";
      var links = el("div", "book-links");
      (b.links || []).forEach(function (lk) { links.appendChild(anchor(lk.label, lk.url)); });
      var card = el("article", "book-card reveal");
      card.appendChild(cover); card.appendChild(h3); card.appendChild(yr);
      card.appendChild(p); card.appendChild(links);
      grid.appendChild(card);
    });
  }

  /* ---------- Apps & Sistemas ---------- */
  function renderApps() {
    var A = window.APPS_PAGE;
    if (!A) return;
    var t = document.getElementById("apps-title"); if (t && A.title) t.textContent = A.title;
    var l = document.getElementById("apps-lede"); if (l) l.textContent = A.lede || "";
    var grid = document.getElementById("apps-grid");
    if (!grid || !A.apps) return;
    A.apps.forEach(function (ap) {
      var card = el("article", "app-card reveal");
      if (ap.color) card.style.setProperty("--accent-fg", ap.color);
      if (ap.bg) card.style.setProperty("--accent-bg", ap.bg);

      var top = el("div", "app-top");
      var icon = el("div", "app-icon"); icon.innerHTML = iconSvg(ap.icon); top.appendChild(icon);
      var head = el("div", "app-head");
      var h3 = el("h3"); h3.textContent = ap.title || ""; head.appendChild(h3);
      if (ap.status) { var st = el("div", "app-status"); st.textContent = ap.status; head.appendChild(st); }
      top.appendChild(head);
      card.appendChild(top);

      if (ap.desc) { var p = el("p"); p.textContent = ap.desc; card.appendChild(p); }
      if (ap.tags && ap.tags.length) {
        var tags = el("div", "app-tags");
        ap.tags.forEach(function (tg) { var s = el("span", "tag"); s.textContent = tg; tags.appendChild(s); });
        card.appendChild(tags);
      }
      if (ap.links && ap.links.length) {
        var lw = el("div", "app-links");
        ap.links.forEach(function (lk) { lw.appendChild(anchor(lk.label, lk.url)); });
        card.appendChild(lw);
      }
      grid.appendChild(card);
    });
  }

  /* ---------- Downloads ---------- */
  function renderDownloads() {
    var D = window.DOWNLOADS_PAGE;
    if (!D) return;
    var t = document.getElementById("dl-title"); if (t && D.title) t.textContent = D.title;
    var l = document.getElementById("dl-lede"); if (l) l.textContent = D.lede || "";
    var list = document.getElementById("downloads-list");
    if (!list || !D.items) return;
    D.items.forEach(function (it) {
      var li = el("li", "download-item reveal");

      var badge = el("span", "dl-badge"); badge.textContent = it.format || "FILE";
      li.appendChild(badge);

      var body = el("div", "dl-body");
      var h3 = el("h3"); h3.textContent = it.title || ""; body.appendChild(h3);
      if (it.desc) { var p = el("p"); p.textContent = it.desc; body.appendChild(p); }
      if (it.size) { var sz = el("div", "dl-size"); sz.textContent = it.size; body.appendChild(sz); }
      li.appendChild(body);

      var btn = el("a", "dl-btn");
      btn.href = it.url || "#";
      if (isExternal(it.url)) { btn.target = "_blank"; btn.rel = "noopener noreferrer"; }
      else { btn.setAttribute("download", ""); }
      var ic = el("span"); ic.innerHTML = iconSvg("download");
      if (ic.firstChild) btn.appendChild(ic.firstChild);
      btn.appendChild(document.createTextNode("Baixar"));
      li.appendChild(btn);

      list.appendChild(li);
    });
  }

  /* ---------- Blog / artigos recentes ---------- */
  var MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  function formatDate(iso) {
    if (!iso) return "";
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!m) return iso;
    var dia = parseInt(m[3], 10);
    var mes = MESES[parseInt(m[2], 10) - 1] || "";
    return dia + " " + mes + " " + m[1];
  }

  function renderBlog() {
    var BL = window.BLOG_PAGE;
    if (!BL) return;
    var t = document.getElementById("blog-title"); if (t && BL.title) t.textContent = BL.title;
    var l = document.getElementById("blog-lede"); if (l) l.textContent = BL.lede || "";
    var list = document.getElementById("posts-list");
    if (!list || !BL.posts) return;

    var posts = BL.posts.slice().sort(function (a, b) {
      return String(b.date || "").localeCompare(String(a.date || ""));
    });

    posts.forEach(function (po) {
      var li = el("li", "post-item reveal");

      var date = el("div", "post-date"); date.textContent = formatDate(po.date); li.appendChild(date);

      var body = el("div", "post-body");
      var h3 = el("h3");
      if (po.url && po.url !== "#") {
        h3.appendChild(anchor(po.title || "", po.url));
      } else {
        h3.textContent = po.title || "";
      }
      body.appendChild(h3);

      if (po.excerpt) { var p = el("p"); p.textContent = po.excerpt; body.appendChild(p); }

      if (po.tags && po.tags.length) {
        var tags = el("div", "post-tags");
        po.tags.forEach(function (tg) { var s = el("span", "tag"); s.textContent = tg; tags.appendChild(s); });
        body.appendChild(tags);
      }

      if (po.url && po.url !== "#") {
        var more = anchor("Ler", po.url, "post-more");
        var ic = el("span"); ic.innerHTML = iconSvg("arrow");
        if (ic.firstChild) more.appendChild(ic.firstChild);
        body.appendChild(more);
      }

      li.appendChild(body);
      list.appendChild(li);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function revealObserve() {
    var items = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (i) { obs.observe(i); });
  }

  function setYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderCV();
    renderServices();
    renderBooks();
    renderApps();
    renderDownloads();
    renderBlog();
    setYear();
    revealObserve();
  });
})();
