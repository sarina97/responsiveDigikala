document.addEventListener("DOMContentLoaded", () => {
    const supermarketBtn = document.getElementById("supermarket-btn");
  
    // Scroll event listener
    window.addEventListener("scroll", () => {
      const scrollPercentage = (window.scrollY / document.body.scrollHeight) * 100;
  
      if (scrollPercentage > 20) {
        // Expand button when scrolled beyond 20%
        supermarketBtn.classList.add("expanded");
        supermarketBtn.querySelector(".text").classList.remove("hidden");
      } else {
        // Collapse button when scrolled back to top
        supermarketBtn.classList.remove("expanded");
        supermarketBtn.querySelector(".text").classList.add("hidden");
      }
    });
  });
  