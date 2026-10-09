// Taiwan Hotel Mwanza — shared site behaviour
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.querySelector(".mobile-panel");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { panel.classList.remove("open"); });
    });
  }

  /* ---------- Fixed "+" prefix on phone fields ---------- */
  document.querySelectorAll(".phone-input").forEach(function (input) {
    function sanitize() {
      var digits = input.value.replace(/[^\d]/g, ""); // strip everything except digits
      input.value = "+" + digits;
    }
    if (!input.value) input.value = "+";
    input.addEventListener("input", sanitize);
    input.addEventListener("focus", function () {
      // keep the caret after the "+" rather than in front of it
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        var pos = input.value.length;
        input.setSelectionRange(pos, pos);
      }
    });
    input.addEventListener("keydown", function (e) {
      var atStart = input.selectionStart <= 1 && input.selectionEnd <= 1;
      if (atStart && (e.key === "Backspace" || e.key === "Delete")) {
        // block deleting the leading "+"
        if (input.selectionStart <= 1) e.preventDefault();
      }
    });
    input.form && input.form.addEventListener("submit", sanitize);
  });

  
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  if (header && hero) {
    header.classList.add("on-hero");
    var onScroll = function () {
      var heroHeight = hero.offsetHeight;
      if (window.scrollY > heroHeight - 90) {
        header.classList.remove("on-hero");
      } else {
        header.classList.add("on-hero");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- EN / SW language toggle ---------- */
  var DICT = window.TH_I18N || {};
  var STORAGE_KEY = "th_lang";

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang === "sw" ? "sw" : "en");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var entry = DICT[key];
      if (entry && entry[lang]) {
        el.textContent = entry[lang];
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var entry = DICT[key];
      if (entry && entry[lang]) el.setAttribute("placeholder", entry[lang]);
    });
    document.querySelectorAll("[data-i18n-label]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-label");
      var entry = DICT[key];
      if (entry && entry[lang]) el.setAttribute("label", entry[lang]);
    });
    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      var nextLang = lang === "en" ? "sw" : "en";
      var labelKey = nextLang === "sw" ? "lang_switch_to_sw" : "lang_switch_to_en";
      var labelEntry = DICT[labelKey];
      btn.textContent = nextLang.toUpperCase();
      btn.setAttribute("aria-label", labelEntry && labelEntry[lang] ? labelEntry[lang] : "Change language");
      btn.setAttribute("title", labelEntry && labelEntry[lang] ? labelEntry[lang] : "Change language");
      btn.setAttribute("aria-pressed", lang === "sw" ? "true" : "false");
      btn.setAttribute("data-current", lang);
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function currentLang() {
    try { return localStorage.getItem(STORAGE_KEY) || "en"; } catch (e) { return "en"; }
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(currentLang());
    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = currentLang() === "en" ? "sw" : "en";
        applyLang(next);
      });
    });
  });

  /* ---------- Enquiry form: pre-fill from query string + stay summary card ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var topic = params.get("topic");
    var room = params.get("room");
    var event = params.get("event");
    var checkin = params.get("checkin");
    var checkout = params.get("checkout");
    var guests = params.get("guests");

    var topicField = document.querySelector("#enquiry-topic");
    var detailField = document.querySelector("#enquiry-detail");
    var messageField = document.querySelector("#enquiry-message");
    var fullFields = document.querySelector("#full-fields");
    var summaryCard = document.querySelector("#stay-summary");
    var hCheckin = document.querySelector("#h-checkin");
    var hCheckout = document.querySelector("#h-checkout");
    var hGuests = document.querySelector("#h-guests");
    var visCheckin = document.querySelector("#enquiry-checkin");
    var visCheckout = document.querySelector("#enquiry-checkout");
    var visGuests = document.querySelector("#enquiry-guests");

    function formatDate(iso) {
      if (!iso) return null;
      var d = new Date(iso + "T00:00:00");
      if (isNaN(d.getTime())) return iso;
      return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
    }

    if (topicField && topic) {
      var match = Array.from(topicField.options).find(function (o) {
        return o.value.toLowerCase() === topic.toLowerCase();
      });
      if (match) topicField.value = match.value;
    }

    function selectDetail(value) {
      if (!detailField || !value) return;
      var opt = Array.from(detailField.options).find(function (o) {
        return o.value.toLowerCase() === value.toLowerCase();
      });
      detailField.value = opt ? opt.value : "Other";
      return opt ? opt.value : value;
    }

    var chosenDetail = null;
    if (room) chosenDetail = selectDetail(room);
    if (event) chosenDetail = selectDetail(event);

    if (messageField && room && !messageField.value) {
      messageField.value = "I'd like to check availability for the " + room + " room.";
    }
    if (messageField && event && !messageField.value) {
      messageField.value = "I'd like more information about hosting a " + event + " at Taiwan Hotel.";
    }

    var hasStaySelection = !!(checkin || checkout || room || guests);

    if (hasStaySelection && fullFields && summaryCard) {
      // Carry the chosen values into the hidden fields the form actually submits
      if (hCheckin) hCheckin.value = checkin || "";
      if (hCheckout) hCheckout.value = checkout || "";
      if (hGuests) hGuests.value = guests || "";

      // Populate the human-readable summary card
      var setSummary = function (key, value) {
        var el = summaryCard.querySelector('[data-summary="' + key + '"]');
        if (el) el.textContent = value || "—";
      };
      setSummary("checkin", formatDate(checkin));
      setSummary("checkout", formatDate(checkout));
      setSummary("room", chosenDetail || room || "—");
      setSummary("guests", guests || "—");

      fullFields.hidden = true;
      summaryCard.hidden = false;
    } else if (fullFields) {
      // Direct visit: keep every field visible and sync the visible date/guest
      // pickers into the hidden fields the form submits, on change.
      if (visGuests && hGuests) {
        visGuests.addEventListener("change", function () { hGuests.value = visGuests.value; });
      }
    }
  });

  /* ---------- AJAX submit for Netlify forms (inline confirmation) ---------- */
  function encode(data) {
    return Object.keys(data)
      .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]); })
      .join("&");
  }

  document.querySelectorAll("form[data-netlify-ajax]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var honeypot = form.querySelector('input[name="bot-field"]');
      if (honeypot && honeypot.value) return; // bot trap tripped, silently drop

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      })
        .then(function () {
          form.hidden = true;
          var success = document.getElementById(form.dataset.successTarget || "form-success");
          if (success) success.hidden = false;
        })
        .catch(function () {
          alert("Something went wrong sending your message. Please try WhatsApp or call us directly.");
        });
    });
  });
  /* ---------- Room tour videos: load and play only while in view ---------- */
  var roomVideos = document.querySelectorAll("video[data-lazy-src]");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function attachSource(video) {
    if (video.dataset.loaded) return;
    var source = document.createElement("source");
    source.src = video.getAttribute("data-lazy-src");
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
    video.dataset.loaded = "1";
  }

  if (roomVideos.length) {
    if (reduceMotion) {
      // Respect reduced-motion: no autoplay, give the guest manual controls.
      roomVideos.forEach(function (video) {
        video.setAttribute("controls", "controls");
        video.setAttribute("preload", "metadata");
        video.addEventListener("play", function () { attachSource(video); }, { once: true });
        video.addEventListener("click", function () { attachSource(video); }, { once: true });
      });
    } else if ("IntersectionObserver" in window) {
      var videoObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var video = entry.target;
            if (entry.isIntersecting) {
              attachSource(video);
              var playing = video.play();
              if (playing && playing.catch) {
                playing.catch(function () {
                  // Autoplay blocked (e.g. data saver): fall back to manual controls.
                  video.setAttribute("controls", "controls");
                });
              }
            } else if (!video.paused) {
              video.pause();
            }
          });
        },
        { threshold: 0.3 }
      );
      roomVideos.forEach(function (video) { videoObserver.observe(video); });
    } else {
      roomVideos.forEach(function (video) {
        attachSource(video);
        video.setAttribute("controls", "controls");
      });
    }

    // Pause every tour when the tab is hidden, resume the visible one on return.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        roomVideos.forEach(function (video) { if (!video.paused) video.pause(); });
      }
    });
  }

  /* ---------- Mobile menu: close on Escape or outside tap ---------- */
  if (toggle && panel) {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (!panel.classList.contains("open")) return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  /* ---------- Subtle scroll-reveal for a more interactive feel ---------- */
  var revealTargets = document.querySelectorAll(
    ".split, .room-card, .venue-card, .testi-card, .ta-strip-card, .amenity-item, .stay-summary"
  );
  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

})();
