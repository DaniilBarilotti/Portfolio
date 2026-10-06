(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ======================= i18n ======================= */
  var I18N = {
    en: {
      "meta.title":        "Daniil Barilotti — Portfolio",
      "nav.about":         "About",
      "nav.skills":        "Skills",
      "nav.projects":      "Projects",
      "nav.coursework":    "Coursework",
      "nav.languages":     "Languages",
      "nav.contacts":      "Contact",
      "hero.tagline":      "Frontend development, with a foundation in cybersecurity.",
      "about.eyebrow":     "01 — About",
      "about.title":       "Who I am & where I study.",
      "about.text":        "I study cybersecurity at V. N. Karazin National University and work with React, TypeScript and responsive interfaces. My projects explore frontend state, API integration and usable security dashboards.",
      "edu.role":          "Cybersecurity · 4th year",
      "edu.meta":          "Cryptography, networking, information security.",
      "skills.eyebrow":    "02 — Skills",
      "skills.title":      "What I work with.",
      "skills.all":        "All",
      "skills.front":      "Frontend",
      "skills.sec":        "Security",
      "skills.tools":      "Tools",
      "projects.eyebrow":  "03 — Projects",
      "projects.title":    "Selected work.",
      "projects.all":      "View all on GitHub",
      "proj.view":         "Repo →",
      "proj.live":         "Live →",
      "proj.swipe":        "Source code, scope and demos — in one place.",
      "course.eyebrow":    "04 — Education & Coursework",
      "course.title":      "Academic & professional training.",
      "course.intro":      "University coursework and completed courses.",
      "course.c1.t":       "Cryptography",
      "course.c1.d":       "Complexity analysis of DSA, RSA and elliptic-curve algorithms; discrete logarithm on elliptic curves.",
      "course.c2.t":       "Computer networks",
      "course.c2.d":       "OSI model, IP subnetting, TCP/UDP, NAT and routing.",
      "course.c3.t":       "Information transmission theory",
      "course.c3.d":       "Signal distance metrics, multichannel systems and error analysis.",
      "course.c4.t":       "Mate Academy — Frontend",
      "course.c4.d":       "Completed the Front-end developer profession: 334+ hands-on tasks covering HTML, CSS, JavaScript, TypeScript, React and Redux. Issued Jan 10, 2026.",
      "lang.eyebrow":      "05 — Languages",
      "lang.title":        "Languages I speak.",
      "lang.native":       "Native",
      "lang.uk":           "Ukrainian",
      "lang.en":           "English",
      "lang.de":           "German",
      "motiv.eyebrow":     "06 — Motivation",
      "motiv.quote":       "I want to build products people can trust — secure by design and crafted down to the smallest detail.",
      "game.eyebrow":      "07 — Mini-game",
      "game.title":        "Access code",
      "game.sub":          "Repeat the sequence of flashes. Each level the code grows. Can you reach 10?",
      "game.idle":         "Press \u201CStart\u201D to break into the system.",
      "game.start":        "Start",
      "game.restart":      "Restart",
      "game.again":        "Play again",
      "game.watch":        "Watch closely\u2026",
      "game.your":         "Your turn · level",
      "game.right":        "Correct \u2713",
      "game.win":          "\uD83C\uDF89 System cracked! All 10 levels cleared.",
      "game.lose":         "Access denied at level",
      "game.code":         "Code:",
      "game.repeat":       "repeat it on the tiles (level",
      "contacts.eyebrow":  "08 — Contact",
      "contacts.title":    "Let\u2019s connect",
      "contacts.lead":     "Based in Alfeld, Germany. Open to junior frontend roles, internships and IT-support opportunities.",
      "contacts.email":    "Email",
      "footer.tag":        "Cybersecurity · Frontend"
    },
    de: {
      "meta.title":        "Daniil Barilotti — Portfolio",
      "nav.about":         "Über mich",
      "nav.skills":        "Skills",
      "nav.projects":      "Projekte",
      "nav.coursework":    "Ausbildung",
      "nav.languages":     "Sprachen",
      "nav.contacts":      "Kontakt",
      "hero.tagline":      "Frontend-Entwicklung mit einem Fundament in Cybersicherheit.",
      "about.eyebrow":     "01 — Über mich",
      "about.title":       "Wer ich bin & wo ich studiere.",
      "about.text":        "Ich studiere Cybersicherheit an der Nationalen W.-N.-Karasin-Universität und arbeite mit React, TypeScript und responsiven Oberflächen. Meine Projekte behandeln Frontend-Zustand, API-Anbindung und verständliche Sicherheits-Dashboards.",
      "edu.role":          "Cybersicherheit · 4. Jahr",
      "edu.meta":          "Kryptografie, Netzwerke, Informationssicherheit.",
      "skills.eyebrow":    "02 — Skills",
      "skills.title":      "Womit ich arbeite.",
      "skills.all":        "Alle",
      "skills.front":      "Frontend",
      "skills.sec":        "Sicherheit",
      "skills.tools":      "Tools",
      "projects.eyebrow":  "03 — Projekte",
      "projects.title":    "Ausgewählte Projekte.",
      "projects.all":      "Alle auf GitHub ansehen",
      "proj.view":         "Repo →",
      "proj.live":         "Live →",
      "proj.swipe":        "Quellcode, Projektumfang und Demos an einem Ort.",
      "course.eyebrow":    "04 — Ausbildung & Kurse",
      "course.title":      "Akademische & berufliche Ausbildung.",
      "course.intro":      "Universitätskurse und abgeschlossene Weiterbildungen.",
      "course.c1.t":       "Kryptografie",
      "course.c1.d":       "Komplexitätsanalyse von DSA, RSA und Elliptische-Kurven-Algorithmen; diskreter Logarithmus auf elliptischen Kurven.",
      "course.c2.t":       "Rechnernetze",
      "course.c2.d":       "OSI-Modell, IP-Subnetting, TCP/UDP, NAT und Routing.",
      "course.c3.t":       "Theorie der Informationsübertragung",
      "course.c3.d":       "Signalabstandsmetriken, Mehrkanalsysteme und Fehleranalyse.",
      "course.c4.t":       "Mate Academy — Frontend",
      "course.c4.d":       "Frontend-Entwickler-Profession abgeschlossen: 334+ praktische Aufgaben zu HTML, CSS, JavaScript, TypeScript, React und Redux. Ausgestellt am 10. Januar 2026.",
      "lang.eyebrow":      "05 — Sprachen",
      "lang.title":        "Sprachen, die ich spreche.",
      "lang.native":       "Muttersprache",
      "lang.uk":           "Ukrainisch",
      "lang.en":           "Englisch",
      "lang.de":           "Deutsch",
      "motiv.eyebrow":     "06 — Motivation",
      "motiv.quote":       "Ich will Produkte bauen, denen Menschen vertrauen — sicher von Grund auf und bis ins kleinste Detail durchdacht.",
      "game.eyebrow":      "07 — Mini-Spiel",
      "game.title":        "Zugangscode",
      "game.sub":          "Wiederhole die Abfolge der Blitze. Mit jedem Level wird der Code länger. Schaffst du 10?",
      "game.idle":         "Drücke \u201EStart\u201C, um ins System einzudringen.",
      "game.start":        "Start",
      "game.restart":      "Neu starten",
      "game.again":        "Nochmal spielen",
      "game.watch":        "Gut aufpassen\u2026",
      "game.your":         "Du bist dran · Level",
      "game.right":        "Richtig \u2713",
      "game.win":          "\uD83C\uDF89 System geknackt! Alle 10 Level geschafft.",
      "game.lose":         "Zugriff verweigert auf Level",
      "game.code":         "Code:",
      "game.repeat":       "wiederhole ihn auf den Kacheln (Level",
      "contacts.eyebrow":  "08 — Kontakt",
      "contacts.title":    "Lass uns vernetzen",
      "contacts.lead":     "In Alfeld, Deutschland. Offen für Junior-Frontend-Stellen, Praktika und IT-Support.",
      "contacts.email":    "E-Mail",
      "footer.tag":        "Cybersicherheit · Frontend"
    }
  };

  /* ======================= Projects ======================= */
  var PROJECTS = [
  {
    "name": "Phone Catalog",
    "tag": "React · TypeScript · Redux",
    "kind": "catalog",
    "url": "https://github.com/DaniilBarilotti/phone-catalog",
    "live": "https://daniilbarilotti.github.io/phone-catalog/",
    "desc": {
      "en": "A storefront frontend with product variants, URL-based sorting, pagination, persistent cart and favourites. Learning project with static product data; no payment backend.",
      "de": "Shop-Frontend mit Produktvarianten, Sortierung in der URL, Pagination, persistentem Warenkorb und Favoriten. Lernprojekt mit statischen Produktdaten; ohne Zahlungsbackend."
    },
    "labels": {
      "en": "Learning project",
      "de": "Lernprojekt"
    }
  },
  {
    "name": "PromptGuard UI",
    "tag": "React · Vite · API",
    "live": "https://promptguard-ui.vercel.app",
    "kind": "security",
    "url": "https://github.com/DaniilBarilotti/promptguard-ui",
    "desc": {
      "en": "Chat and incident dashboard for an LLM guardrail system. My scope is the frontend and API integration. The standalone demo uses simulated verdicts, not a security detector.",
      "de": "Chat und Vorfallübersicht für ein LLM-Guardrail-System. Mein Bereich: Frontend und API-Anbindung. Die eigenständige Demo nutzt simulierte Ergebnisse, keinen Sicherheitsdetektor."
    },
    "labels": {
      "en": "Team project · frontend",
      "de": "Teamprojekt · Frontend"
    }
  },
  {
    "name": "FORNO Pizzeria",
    "tag": "HTML · CSS · JavaScript",
    "kind": "forno",
    "url": "https://github.com/DaniilBarilotti/forno-pizzeria",
    "live": "https://daniilbarilotti.github.io/forno-pizzeria/",
    "desc": {
      "en": "A German / English restaurant concept with an editorial layout, responsive menu and accessible ingredient accordions. Fictional venue, created as a portfolio design.",
      "de": "Restaurantkonzept auf Deutsch und Englisch mit redaktionellem Layout, responsiver Speisekarte und zugänglichen Zutaten-Akkordeons. Fiktives Restaurant als Portfolioentwurf."
    },
    "labels": {
      "en": "Design concept",
      "de": "Designkonzept"
    }
  },
  {
    "name": "To-do App",
    "tag": "React · TypeScript · REST",
    "kind": "tasks",
    "url": "https://github.com/DaniilBarilotti/todo-app",
    "live": "https://daniilbarilotti.github.io/todo-app/",
    "desc": {
      "en": "Task management with API-backed create, edit, delete and completion flows. A learning project focused on asynchronous UI, loading states and error feedback.",
      "de": "Aufgabenverwaltung mit API für Erstellen, Bearbeiten, Löschen und Statuswechsel. Lernprojekt mit Fokus auf asynchroner UI, Ladezuständen und Fehlermeldungen."
    },
    "labels": {
      "en": "Learning project",
      "de": "Lernprojekt"
    }
  },
  {
    "name": "2048",
    "tag": "JavaScript · SCSS",
    "kind": "game",
    "url": "https://github.com/DaniilBarilotti/2048_game",
    "live": "https://daniilbarilotti.github.io/2048_game/",
    "desc": {
      "en": "A keyboard-controlled puzzle with tile merging, score tracking and win / loss detection. A learning project demonstrating array transformations and game state.",
      "de": "Tastaturgesteuertes Puzzle mit Zusammenführen von Kacheln, Punktestand und Gewinn-/Verlusterkennung. Lernprojekt zu Array-Transformationen und Spielzustand."
    },
    "labels": {
      "en": "Learning project",
      "de": "Lernprojekt"
    }
  },
  {
    "name": "Bose Landing Page",
    "tag": "HTML · SCSS · BEM",
    "kind": "landing",
    "url": "https://github.com/DaniilBarilotti/miami-landing",
    "live": "https://daniilbarilotti.github.io/miami-landing/",
    "desc": {
      "en": "Responsive product landing page based on a training design brief. Product sections, mobile navigation and a contact-form layout; no affiliation with Bose.",
      "de": "Responsive Produkt-Landingpage auf Basis einer Übungsaufgabe. Produktbereiche, mobile Navigation und Kontaktformular-Layout; keine Verbindung zu Bose."
    },
    "labels": {
      "en": "Design implementation",
      "de": "Layoutübung"
    }
  },
  {
    "name": "SupportDesk Lite",
    "tag": "Python · SQLite · JavaScript",
    "live": null,
    "kind": "support",
    "url": "https://github.com/DaniilBarilotti/Portfolio/tree/portfolio-refresh-20261006/projects/supportdesk-lite",
    "desc": {
      "en": "A new local IT-ticket tracker with a SQLite database, JSON API and browser dashboard. Source and setup guide available; the backend runs locally.",
      "de": "Neuer lokaler IT-Ticket-Tracker mit SQLite-Datenbank, JSON-API und Browser-Dashboard. Quellcode und Startanleitung verfügbar; das Backend läuft lokal."
    },
    "labels": {
      "en": "New portfolio demo",
      "de": "Neue Portfoliodemo"
    }
  }
];

  /* ======================= language ======================= */
  var lang = "en";
  try {
    var saved = localStorage.getItem("site_lang");
    if (saved && I18N[saved]) lang = saved;
  } catch (e) {}

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  }

  function renderProjects() {
    var track = document.getElementById("projTrack");
    track.innerHTML = "";
    PROJECTS.forEach(function (p) {
      var card = document.createElement("div");
      card.className = "proj-card";
      card.dataset.kind = p.kind;

      var linksHtml = '<div class="proj-links">';
      if (p.live) {
        linksHtml += '<a class="proj-link" href="' + p.live + '" target="_blank" rel="noopener"></a>';
      }
      linksHtml += '<a class="proj-link repo" href="' + p.url + '" target="_blank" rel="noopener"></a>';
      linksHtml += '</div>';

      card.innerHTML =
        '<div class="project-cover" aria-hidden="true"><span class="cover-name"></span><span class="cover-symbol"></span></div><div class="project-type"></div><div class="proj-top"><h3></h3></div><span class="tag"></span><p></p>' + linksHtml;

      card.querySelector(".cover-name").textContent = p.name;
      card.querySelector(".cover-symbol").textContent = ({catalog:"01 / SHOP",security:"02 / GUARD",forno:"03 / FORNO",tasks:"04 / TASKS",game:"05 / 2048",landing:"06 / BOSE",support:"07 / DESK"})[p.kind];
      card.querySelector(".project-type").textContent = p.labels[lang];
      card.querySelector("h3").textContent = p.name;
      card.querySelector(".tag").textContent = p.tag;
      card.querySelector("p").textContent = p.desc[lang] || p.desc.en;

      var links = card.querySelectorAll(".proj-link");
      if (p.live) {
        links[0].textContent = t("proj.live");
        links[1].textContent = t("proj.view");
      } else {
        links[0].textContent = t("proj.view");
      }

      track.appendChild(card);
    });
    updateCarBtns();
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (I18N[lang] && I18N[lang][key] != null) el.textContent = I18N[lang][key];
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
    renderProjects();
    if (quoteTyped) quote.textContent = t("motiv.quote");
    if (!playing) statusEl.textContent = t("game.idle");
  }

  document.getElementById("langToggle").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    lang = b.getAttribute("data-lang");
    try { localStorage.setItem("site_lang", lang); } catch (er) {}
    applyLang();
  });

  /* ======================= year + nav ======================= */
  document.getElementById("year").textContent = new Date().getFullYear();
  var nav = document.getElementById("nav");

  function onScroll() {
    if (window.scrollY > 80) nav.classList.add("show");
    else nav.classList.remove("show");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ======================= reveal ======================= */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: .15, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ======================= color palette button ======================= */
  var PALETTES = [
    ["#5b8cff", "#b06bff"],
    ["#36d1dc", "#5b86e5"],
    ["#43e97b", "#38f9d7"],
    ["#ff6fd8", "#ff9a6c"],
    ["#a06bff", "#ff7eb0"]
  ];
  var palIndex = 0;
  var paletteBtn = document.getElementById("paletteBtn");

  function applyPalette(i) {
    document.documentElement.style.setProperty("--accent-1", PALETTES[i][0]);
    document.documentElement.style.setProperty("--accent-2", PALETTES[i][1]);
  }

  paletteBtn.addEventListener("click", function () {
    var next = (palIndex + 1) % PALETTES.length;
    if (reduce) { palIndex = next; applyPalette(next); return; }
    var r = paletteBtn.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var far = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    var rip = document.createElement("div");
    rip.id = "ripple";
    rip.style.left = cx + "px";
    rip.style.top = cy + "px";
    rip.style.width = rip.style.height = far * 2 + "px";
    rip.style.background = "radial-gradient(circle, " + PALETTES[next][0] + ", " + PALETTES[next][1] + ")";
    rip.style.transition = "transform .7s cubic-bezier(.2,.7,.2,1), opacity .5s ease .4s";
    document.body.appendChild(rip);
    requestAnimationFrame(function () { rip.style.transform = "translate(-50%,-50%) scale(1)"; });
    setTimeout(function () { palIndex = next; applyPalette(next); }, 360);
    setTimeout(function () { rip.style.opacity = "0"; }, 700);
    setTimeout(function () { rip.remove(); }, 1300);
  });

  /* ======================= skill tabs ======================= */
  var tabs = document.getElementById("tabs");
  tabs.addEventListener("click", function (e) {
    var btn = e.target.closest(".tab");
    if (!btn) return;
    tabs.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("active"); });
    btn.classList.add("active");
    var cat = btn.getAttribute("data-cat");
    document.querySelectorAll("#chips .chip").forEach(function (c) {
      c.classList.toggle("hide", !(cat === "all" || c.getAttribute("data-cat") === cat));
    });
  });

  /* ======================= carousel ======================= */
  var track = document.getElementById("projTrack");
  var prevBtn = document.getElementById("carPrev");
  var nextBtn = document.getElementById("carNext");

  function step() {
    var card = track.querySelector(".proj-card");
    return card ? card.offsetWidth + 18 : 320;
  }

  function updateCarBtns() {
    if (!prevBtn) return;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    nextBtn.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", function () { updateCarBtns(); }, { passive: true });
    window.addEventListener("resize", updateCarBtns);
  }

  /* ======================= motivation typewriter ======================= */
  var quote = document.getElementById("quote");
  var quoteTyped = false;
  var mIo = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      mIo.disconnect();
      var txt = t("motiv.quote");
      if (reduce) { quoteTyped = true; quote.textContent = txt; return; }
      quote.innerHTML = "<span class='cursor'></span>";
      var cur = quote.querySelector(".cursor"), i = 0;
      var iv = setInterval(function () {
        if (i >= txt.length) { clearInterval(iv); quoteTyped = true; return; }
        cur.insertAdjacentText("beforebegin", txt.charAt(i));
        i++;
      }, 36);
    });
  }, { threshold: .5 });
  mIo.observe(document.getElementById("motiv"));

  /* ======================= mini-game ======================= */
  var tiles = Array.prototype.slice.call(document.querySelectorAll(".tile"));
  var statusEl = document.getElementById("status");
  var startBtn = document.getElementById("start");
  var seq = [], input = [], level = 0, playing = false, accepting = false;
  var AudioCtx = window.AudioContext || window.webkitAudioContext, actx = null;
  var freqs = [261.6, 329.6, 392.0, 523.3];

  function beep(i, ok) {
    if (!AudioCtx) return;
    try {
      actx = actx || new AudioCtx();
      var o = actx.createOscillator(), g = actx.createGain();
      o.frequency.value = ok === false ? 110 : freqs[i];
      o.type = "sine";
      o.connect(g); g.connect(actx.destination);
      g.gain.setValueAtTime(.0001, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(.18, actx.currentTime + .02);
      g.gain.exponentialRampToValueAtTime(.0001, actx.currentTime + .32);
      o.start(); o.stop(actx.currentTime + .34);
    } catch (e) {}
  }

  function light(i, ok) {
    tiles[i].classList.add("lit");
    beep(i, ok);
    setTimeout(function () { tiles[i].classList.remove("lit"); }, 320);
  }

  function playSeq() {
    accepting = false;
    statusEl.textContent = t("game.watch");
    seq.forEach(function (k, idx) {
      setTimeout(function () { light(k); }, 600 + idx * 620);
    });
    setTimeout(function () {
      accepting = true;
      statusEl.innerHTML = t("game.your") + " <b>" + level + "</b>";
    }, 600 + seq.length * 620 + 200);
  }

  function nextLevel() {
    input = []; level++;
    seq.push(Math.floor(Math.random() * 4));
    if (reduce) {
      statusEl.innerHTML = t("game.code") + " <b>" + seq.join(" ") + "</b> · " + t("game.repeat") + " " + level + ")";
      accepting = true;
    } else {
      playSeq();
    }
  }

  function win() {
    playing = false; accepting = false;
    statusEl.textContent = t("game.win");
    startBtn.textContent = t("game.again");
    tiles.forEach(function (x, i) { setTimeout(function () { light(i); }, i * 120); });
  }

  function lose() {
    playing = false; accepting = false;
    statusEl.innerHTML = t("game.lose") + " <b>" + level + "</b>.";
    startBtn.textContent = t("game.restart");
  }

  function handleTile(i) {
    if (!playing || !accepting) return;
    light(i); input.push(i);
    var idx = input.length - 1;
    if (input[idx] !== seq[idx]) { light(i, false); return lose(); }
    if (input.length === seq.length) {
      accepting = false;
      if (level >= 10) return win();
      statusEl.textContent = t("game.right");
      setTimeout(nextLevel, 700);
    }
  }

  tiles.forEach(function (tl, i) {
    tl.setAttribute("tabindex", "0");
    tl.setAttribute("role", "button");
    tl.addEventListener("click", function () { handleTile(i); });
    tl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleTile(i); }
    });
  });

  startBtn.addEventListener("click", function () {
    seq = []; input = []; level = 0; playing = true;
    startBtn.textContent = t("game.restart");
    nextLevel();
  });

  /* ======================= konami bonus (matrix) ======================= */
  var code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], pos = 0;
  var canvas = document.getElementById("matrix"), ctx = canvas.getContext("2d"), rainOn = false, raf;

  function sizeC() { canvas.width = innerWidth; canvas.height = innerHeight; }

  function startRain() {
    if (rainOn || reduce) return;
    rainOn = true; sizeC(); canvas.classList.add("on");
    var fs = 16, cols = Math.floor(canvas.width / fs), drops = new Array(cols).fill(1);
    var chars = "01\u30A2\u30A4\u30A6\u30A8\u30AA\u30ABabcdef{}<>$#".split("");
    function draw() {
      ctx.fillStyle = "rgba(7,8,12,.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent-1") || "#5b8cff";
      ctx.font = fs + "px Space Mono, monospace";
      for (var i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > canvas.height && Math.random() > .975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    setTimeout(stopRain, 6000);
  }

  function stopRain() {
    rainOn = false; canvas.classList.remove("on"); cancelAnimationFrame(raf);
    setTimeout(function () { ctx.clearRect(0, 0, canvas.width, canvas.height); }, 600);
  }

  window.addEventListener("resize", function () { if (rainOn) sizeC(); });
  document.addEventListener("keydown", function (e) {
    pos = (e.keyCode === code[pos]) ? pos + 1 : 0;
    if (pos === code.length) { pos = 0; startRain(); }
  });

  /* ======================= init ======================= */
  applyLang();
})();

