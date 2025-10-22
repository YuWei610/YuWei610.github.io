/*!
 * Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Activate Bootstrap scrollspy on the main nav element
  const sideNav = document.body.querySelector("#sideNav");
  if (sideNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#sideNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// Hover/focus video control
// - Mouse enter / focus: play
// - Mouse leave / blur: pause and reset
// - Touch: tap to toggle

function safePlay(video) {
  video.muted = true;
  const p = video.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

function pauseAndReset(video) {
  video.pause();
  try {
    video.currentTime = 0;
  } catch (_) {}
}

function initProjectVideos() {
  const cards = document.querySelectorAll(".proj-card");
  const isTouch = matchMedia("(pointer: coarse)").matches;

  cards.forEach((card) => {
    const video = card.querySelector(".proj-video");
    if (!video) return;

    // Mouse
    card.addEventListener("mouseenter", () => safePlay(video));
    card.addEventListener("mouseleave", () => pauseAndReset(video));

    // Keyboard
    card.addEventListener("focus", () => safePlay(video));
    card.addEventListener("blur", () => pauseAndReset(video));

    // Touch toggle
    if (isTouch) {
      let playing = false;
      card.addEventListener(
        "click",
        () => {
          if (!playing) {
            safePlay(video);
            playing = true;
          } else {
            pauseAndReset(video);
            playing = false;
          }
        },
        { passive: true }
      );
    }
  });
}

if (document.readyState !== "loading") {
  initProjectVideos();
} else {
  document.addEventListener("DOMContentLoaded", initProjectVideos);
}
