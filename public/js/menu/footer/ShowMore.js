document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector("#content");
  const toggleBtn = document.querySelector("#toggleBtn");

  if (!content || !toggleBtn) {
    console.error("Element with the provided ID was not found.");
    return;
  }

  toggleBtn.addEventListener("click", () => {
    if (content.classList.contains("line-clamp-3")) {
      content.classList.replace("line-clamp-3", "line-clamp-10"); // Expand to 10 lines
      toggleBtn.textContent = "بستن"; // Update button text
    } else {
      content.classList.replace("line-clamp-10", "line-clamp-3"); // Collapse to 3 lines
      toggleBtn.textContent = "مشاهده بیشتر"; 
    }
  });
});
