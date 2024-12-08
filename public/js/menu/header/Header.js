const handleHeaderScroll = () => {
  const header = document.querySelector(".header_content_second");
  const headerOriginalHeight = header.offsetHeight; // Get the actual height of the header
  let lastScrollY = window.scrollY;

  // Set initial styles
  header.style.transition =
    "transform 0.3s ease, opacity 0.3s ease, height 0.3s ease";

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scroll down: hide header
      header.style.transform = "translateY(-100%)";
      header.style.opacity = "0";
      header.style.height = "0"; // Collapses the height
    } else {
      // Scroll up: show header
      header.style.transform = "translateY(0)";
      header.style.opacity = "1";
      header.style.height = `${headerOriginalHeight}px`; // Restores original height
    }

    lastScrollY = currentScrollY;
  });
};

export default handleHeaderScroll