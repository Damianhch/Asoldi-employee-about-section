(function () {
  const DURATION_MS = 10000; // 10 seconds per page
  const TICK_MS = 50;

  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const progressBar = document.getElementById("progressBar");
  let currentIndex = 0;
  let startTime = null;
  let animationId = null;

  let slideDirection = 'left'; // Track alternating direction

  function goToSlide(index) {
    const i = Math.max(0, Math.min(index, slides.length - 1));
    if (i === currentIndex) return;

    const outgoingSlide = slides[currentIndex];
    const incomingSlide = slides[i];

    // Remove all classes from slides
    slides.forEach(function (slide) {
      slide.classList.remove("active", "exiting", "slide-left", "slide-right");
    });

    // Mark outgoing slide as exiting and add direction class
    outgoingSlide.classList.add("exiting");
    if (slideDirection === 'left') {
      outgoingSlide.classList.add("slide-left");
    } else {
      outgoingSlide.classList.add("slide-right");
    }

    // Add direction class and active to incoming slide
    if (slideDirection === 'left') {
      incomingSlide.classList.add("slide-left", "active");
    } else {
      incomingSlide.classList.add("slide-right", "active");
    }

    currentIndex = i;

    // Alternate direction for next transition
    slideDirection = slideDirection === 'left' ? 'right' : 'left';

    // Update dots
    dots.forEach(function (dot) {
      dot.classList.remove("active");
      dot.setAttribute("aria-selected", "false");
    });
    var activeDot = document.querySelector('.dot[data-index="' + currentIndex + '"]');
    if (activeDot) {
      activeDot.classList.add("active");
      activeDot.setAttribute("aria-selected", "true");
    }

    // Clean up animation classes after animation completes
    setTimeout(function() {
      slides.forEach(function (slide) {
        slide.classList.remove("exiting", "slide-left", "slide-right");
      });
    }, 600);

    startProgress();
  }

  function startProgress() {
    startTime = null;
    if (progressBar) progressBar.style.width = "0%";

    function update(timestamp) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const pct = Math.min(100, (elapsed / DURATION_MS) * 100);
      if (progressBar) progressBar.style.width = pct + "%";

      if (elapsed < DURATION_MS) {
        animationId = requestAnimationFrame(update);
      } else {
        goToSlide((currentIndex + 1) % slides.length);
      }
    }

    if (animationId !== null) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(update);
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var idx = parseInt(dot.getAttribute("data-index"), 10);
      if (!isNaN(idx)) goToSlide(idx);
    });
  });

  // Start first slide and progress
  startProgress();
})();
