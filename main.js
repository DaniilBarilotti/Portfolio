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
      "hero.tagline":      "I build products that are secure at the core and a pleasure to use.",
      "about.eyebrow":     "01 — About",
      "about.title":       "Who I am & where I study.",
      "about.text":        "I like understanding how things work from the inside — from cryptography and networks to interface motion. In my free time I build games, tools and edit video content.",
      "edu.role":          "Cybersecurity · 4th year",
      "edu.meta":          "Cryptography, networking, information security. Based in Germany.",
      "skills.eyebrow":    "02 — Skills",
      "skills.title":      "What I work with.",
      "skills.all":        "All",
      "skills.front":      "Frontend",
      "skills.sec":        "Security",
      "skills.tools":      "Tools",
      "projects.eyebrow":  "03 — Projects",
      "projects.title":    "Things I built.",
      "projects.all":      "View all on GitHub",
      "proj.view":         "View repo →",
      "proj.swipe":        "← swipe →",
      "course.eyebrow":    "04 — University coursework",
      "course.title":      "Academic work.",
      "course.intro":      "A selection of term papers and practical assignments from my degree.",
      "course.c1.t":       "Cryptography",
      "course.c1.d":       "Complexity analysis of DSA, RSA and elliptic-curve algorithms; discrete logarithm on elliptic curves.",
      "course.c2.t":       "Computer networks",
      "course.c2.d":       "OSI model, IP subnetting, TCP/UDP, NAT and routing.",
      "course.c3.t":       "Information transmission theory",
      "course.c3.d":       "Signal distance metrics, multichannel systems and error analysis.",
      "lang.eyebrow":      "05 — Languages",
      "lang.title":        "Languages I speak.",
      "lang.native":       "Native",
      "lang.ru":           "Russian",
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
      "contacts.lead":     "Open to projects, internships and good conversations.",
      "contacts.email":    "Email",
      "footer.tag":        "Cybersecurity · Frontend"
    },
    de: {
      "meta.title":        "Daniil Barilotti — Portfolio",
      "nav.about":         "Über mich",
      "nav.skills":        "Skills",
      "nav.projects":      "Projekte",
      "nav.coursework":    "Studienarbeiten",
      "nav.languages":     "Sprachen",
      "nav.contacts":      "Kontakt",
      "hero.tagline":      "Ich baue Produkte, die im Kern sicher und angenehm zu benutzen sind.",
      "about.eyebrow":     "01 — Über mich",
      "about.title":       "Wer ich bin & wo ich studiere.",
      "about.text":        "Ich verstehe gern, wie Dinge von innen funktionieren — von Kryptografie und Netzwerken bis hin zu Interface-Animation. In meiner Freizeit baue ich Spiele, Tools und schneide Videos.",
      "edu.role":          "Cybersicherheit · 4. Jahr",
      "edu.meta":          "Kryptografie, Netzwerke, Informationssicherheit. Wohnhaft in Deutschland.",
      "skills.eyebrow":    "02 — Skills",
      "skills.title":      "Womit ich arbeite.",
      "skills.all":        "Alle",
      "skills.front":      "Frontend",
      "skills.sec":        "Sicherheit",
      "skills.tools":      "Tools",
      "projects.eyebrow":  "03 — Projekte",
      "projects.title":    "Was ich gebaut habe.",
      "projects.all":      "Alle auf GitHub ansehen",
      "proj.view":         "Repo ansehen →",
      "proj.swipe":        "← wischen →",
      "course.eyebrow":    "04 — Studienarbeiten",
      "course.title":      "Akademische Arbeiten.",
      "course.intro":      "Eine Auswahl an Hausarbeiten und praktischen Aufgaben aus meinem Studium.",
      "course.c1.t":       "Kryptografie",
      "course.c1.d":       "Komplexitätsanalyse von DSA, RSA und Elliptische-Kurven-Algorithmen; diskreter Logarithmus auf elliptischen Kurven.",
      "course.c2.t":       "Rechnernetze",
      "course.c2.d":       "OSI-Modell, IP-Subnetting, TCP/UDP, NAT und Routing.",
      "course.c3.t":       "Informationsübertragungstheorie",
      "course.c3.d":       "Signalabstandsmetriken, Mehrkanalsysteme und Fehleranalyse.",
      "lang.eyebrow":      "05 — Sprachen",
      "lang.title":        "Sprachen, die ich spreche.",
      "lang.native":       "Muttersprache",
      "lang.ru":           "Russisch",
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
      "contacts.lead":     "Offen für Projekte, Praktika und gute Gespräche.",
      "contacts.email":    "E-Mail",
      "footer.tag":        "Cybersicherheit · Frontend"
    }
  };

  /* ======================= Projects ======================= */
  var PROJECTS = [
    {
      name: "promptguard-ui",
      tag:  "React · Security",
      url:  "https://github.com/DaniilBarilotti/promptguard-ui",
      desc: {
        en: "Frontend of a team security system detecting prompt injection attacks on LLM apps. Chat UI with real-time threat visualization, incident log and Red Team mode. Built during internship at DevBrother.",
        de: "Frontend eines Sicherheitssystems zur Erkennung von Prompt-Injection-Angriffen auf LLM-Apps. Chat-UI mit Echtzeit-Bedrohungsvisualisierung, Incident-Log und Red-Team-Modus. Entwickelt beim Praktikum bei DevBrother."
      }
    },
    {
      name: "2048_game",
      tag:  "JavaScript",
      url:  "https://github.com/DaniilBarilotti/2048_game",
      desc: {
        en: "Classic 2048 puzzle implemented in vanilla JavaScript.",
        de: "Klassisches 2048-Puzzle in reinem JavaScript."
      }
    },
    {
      name: "miami-landing",
      tag:  "SCSS",
      url:  "https://github.com/DaniilBarilotti/miami-landing",
      desc: {
        en: "Responsive landing page built with semantic markup and SCSS.",
        de: "Responsive Landingpage mit semantischem Markup und SCSS."
      }
    },
    {
      name: "phone-catalog",
      tag:  "TypeScript",
      url:  "https://github.com/DaniilBarilotti/phone-catalog",
      desc: {
        en: "Phone catalog app with filtering, sorting and a cart.",
        de: "Handy-Katalog mit Filter, Sortierung und Warenkorb."
      }
    },
    {
      name: "todo-app",
      tag:  "TypeScript",
      url:  "https://github.com/DaniilBarilotti/todo-app",
      desc: {
        en: "Task manager with clean state handling and a tidy UI.",
        de: "Aufgabenverwaltung mit sauberem State-Handling und aufgeräumter UI."
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
      var a = document.createElement("a");
      a.className = "proj-card";
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML =
        '<div class="proj-top"><h3></h3><span class="tag"></span></div><p></p><span class="proj-link"></span>';
      a.querySelector("h3").textContent = p.name;
      a.querySelector(".tag").textContent = p.tag;
      a.querySelector("p").textContent = p.desc[lang] || p.desc.en;
      a.querySelector(".proj-link").textContent = t("proj.view");
      track.appendChild(a);
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
    if (reduce) {
      palIndex = next;
      applyPalette(next);
      return;
    }
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
      if (reduce) {
        quoteTyped = true;
        quote.textContent = txt;
        return;
      }
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
      o.connect(g);
      g.connect(actx.destination);
      g.gain.setValueAtTime(.0001, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(.18, actx.currentTime + .02);
      g.gain.exponentialRampToValueAtTime(.0001, actx.currentTime + .32);
      o.start();
      o.stop(actx.currentTime + .34);
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
    input = [];
    level++;
    seq.push(Math.floor(Math.random() * 4));
    if (reduce) {
      statusEl.innerHTML = t("game.code") + " <b>" + seq.join(" ") + "</b> · " + t("game.repeat") + " " + level + ")";
      accepting = true;
    } else {
      playSeq();
    }
  }

  function win() {
    playing = false;
    accepting = false;
    statusEl.textContent = t("game.win");
    startBtn.textContent = t("game.again");
    tiles.forEach(function (x, i) { setTimeout(function () { light(i); }, i * 120); });
  }

  function lose() {
    playing = false;
    accepting = false;
    statusEl.innerHTML = t("game.lose") + " <b>" + level + "</b>.";
    startBtn.textContent = t("game.restart");
  }

  function handleTile(i) {
    if (!playing || !accepting) return;
    light(i);
    input.push(i);
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
    rainOn = true;
    sizeC();
    canvas.classList.add("on");
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
    rainOn = false;
    canvas.classList.remove("on");
    cancelAnimationFrame(raf);
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
