document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Toggle visibility of the <ul> inside the section
        const targetList = targetSection.querySelector("ul");
        targetList.classList.toggle("hidden");

        // Update the aria-expanded attribute
        const isExpanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!isExpanded));

        // Update the button's icon (toggle between up/down arrows)
        btn.innerHTML = isExpanded ? "&#9662;" : "&#9652;";
      }
    });
  });
});
