// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle (Hamburger)
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // 2. Mobile Dropdown Toggle (Click to open "Coffee Selection")
  const dropdownToggle = document.querySelector(
    '.nav-links > li > a[href="coffeeselection.html"]',
  );

  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", (e) => {
      // Only do this on mobile (screens smaller than 768px)
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Stop page from navigating immediately
        const parentLi = dropdownToggle.parentElement;
        parentLi.classList.toggle("open"); // Add/remove 'open' class to show dropdown
      }
    });
  }

  // 3. Modal Logic
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");
  if (modal) {
    if (!localStorage.getItem("visited")) {
      modal.style.display = "flex";
      localStorage.setItem("visited", true);
    }
    if (closeBtn) {
      closeBtn.onclick = function () {
        modal.style.display = "none";
      };
    }
    window.onclick = function (event) {
      if (event.target === modal) modal.style.display = "none";
    };
  }

  // 4. Slideshow Logic
  const slides = document.querySelectorAll(".slideshow img");
  if (slides.length > 0) {
    let slideIndex = 0;
    slides[0].classList.add("active");

    function showSlides() {
      slides[slideIndex].classList.remove("active");
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("active");
    }
    setInterval(showSlides, 4000);
  }

  // 5. Music & Tape Logic
  const audio = document.getElementById("myAudio");
  const musicBtn = document.getElementById("musicToggle");
  const cassetteTape = document.getElementById("cassetteTape");

  if (audio && musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            musicBtn.innerHTML = "⏸ Pause Music";
            musicBtn.style.background = "var(--primary-color)";
            musicBtn.style.color = "#ffffff";
            cassetteTape.classList.add("show");
          })
          .catch((error) => console.log("Playback error:", error));
      } else {
        audio.pause();
        musicBtn.innerHTML = "▶ Play Music";
        musicBtn.style.background = "#ffffff";
        musicBtn.style.color = "var(--primary-color)";
        cassetteTape.classList.remove("show");
      }
    });
  }
});
