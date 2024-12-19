function ToggleFAQ(id) {
  // Select all FAQ items
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item, index) => {
    const icon = item.querySelector(`#icon-${index + 1}`);
    const answer = item.querySelector(`#answer-${index + 1}`);

    if (index + 1 === id) {
      // Toggle the current FAQ section
      const isHidden = answer.classList.contains("hidden");
      answer.classList.toggle("hidden", !isHidden);
      icon.textContent = isHidden ? "-" : "+";
    } else {
      // Ensure all other sections are closed
      answer.classList.add("hidden");
      icon.textContent = "+";
    }
  });
}

window.ToggleFAQ = ToggleFAQ
export default ToggleFAQ;
