(function () {
  const DURATION_MS = 10000; // 10 seconds per page
  const TICK_MS = 50;

  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const progressBar = document.getElementById("progressBar");
  let currentIndex = 0;
  let startTime = null;
  let animationId = null;

  function goToSlide(index) {
    const i = Math.max(0, Math.min(index, slides.length - 1));
    if (i === currentIndex) return;
    currentIndex = i;

    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });
    dots.forEach(function (dot) {
      dot.classList.remove("active");
      dot.setAttribute("aria-selected", "false");
    });

    slides[currentIndex].classList.add("active");
    var activeDot = document.querySelector('.dot[data-index="' + currentIndex + '"]');
    if (activeDot) {
      activeDot.classList.add("active");
      activeDot.setAttribute("aria-selected", "true");
    }

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
