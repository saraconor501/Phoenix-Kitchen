import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function smoothScrollToTop(duration = 300) {
  const start = window.scrollY;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    window.scrollTo(0, start * (1 - progress));

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    smoothScrollToTop(100); // 300 мс для быстрого, но плавного скролла
  }, [pathname]);

  return null;
}

export default ScrollToTop;