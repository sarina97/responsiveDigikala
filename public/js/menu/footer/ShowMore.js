function setupExpandableContent(contentId, buttonId, collapsedClass = "line-clamp-3") {
    const content = document.getElementById(contentId);
    const toggleBtn = document.getElementById(buttonId);
    let isExpanded = false;
  
    if (!content || !toggleBtn) {
      console.error("Invalid IDs provided for content or button.");
      return;
    }
  
    toggleBtn.addEventListener("click", () => {
      if (isExpanded) {
        content.classList.add(collapsedClass);
        toggleBtn.textContent = "مشاهده بیشتر";
      } else {
        content.classList.remove(collapsedClass);
        toggleBtn.textContent = "بستن";
      }
      isExpanded = !isExpanded;
    });
  }
  
  // Call the function for specific IDs
  setupExpandableContent("content", "toggleBtn");
  function setupExpandableContent(contentId, buttonId, collapsedClass = "line-clamp-3") {
    const content = document.getElementById(contentId);
    const toggleBtn = document.getElementById(buttonId);
    let isExpanded = false;
  
    if (!content || !toggleBtn) {
      console.error("Invalid IDs provided for content or button.");
      return;
    }
  
    toggleBtn.addEventListener("click", () => {
      if (isExpanded) {
        content.classList.add(collapsedClass);
        toggleBtn.textContent = "مشاهده بیشتر";
      } else {
        content.classList.remove(collapsedClass);
        toggleBtn.textContent = "بستن";
      }
      isExpanded = !isExpanded;
    });
  }
  
  // Call the function for specific IDs
  setupExpandableContent("content", "toggleBtn");
