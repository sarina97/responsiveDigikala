export function handleSupermarketButton() {
  const supermarketBtn = document.getElementById("supermarket-btn");
  const longText = supermarketBtn.querySelector(".long-text");

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const screenWidth = window.innerWidth;

    // Large screens: Expand/Collapse the button
    if (screenWidth >= 1024) {
      if (currentScroll > lastScroll%10) {

        supermarketBtn.classList.add("w-[300px]");
        longText.classList.remove("hidden");
        longText.classList.add("inline-block");
      } else {
        // Scrolling Up: Collapse
        supermarketBtn.classList.remove("w-[300px]");
        longText.classList.add("hidden");
        longText.classList.remove("inline-block");
      }
    } else {
         if (currentScroll > lastScroll) {
        
        supermarketBtn.classList.add("translate-y-[100px]");
        supermarketBtn.classList.remove("bottom-4");
        longText.classList.add("inline-block");
      } else {
        // Scrolling Up: Show the button
        supermarketBtn.classList.remove("translate-y-[100px]");
        supermarketBtn.classList.add("bottom-4");
        longText.classList.remove("inline-block");
      }
    }

    lastScroll = currentScroll;
  });
}
