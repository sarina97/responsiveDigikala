const Slider = async () => {
  try {
    // Fetch data from API
    const response = await fetch("http://localhost:3004/data");
    const data = await response.json();

    if (!data.slider) {
      console.error("No slider data found in the API response");
      return;
    }

    renderSlider(data.slider); // Pass the slider data to the render function
  } catch (error) {
    console.error("Error fetching API data:", error);
  }
};

const renderSlider = (sliderData) => {
  const swiperWrapper = document.querySelector(".swiper1 .swiper-wrapper1");

  if (!swiperWrapper) {
    console.error("No .swiper-wrapper found for swiper1");
    return;
  }

  // Clear any existing slides in the swiper-wrapper
  swiperWrapper.innerHTML = "";

  // Add slides dynamically
  sliderData.forEach((item) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = `
      <a href="${item.link}" target="_blank">
        <img
          class="block object-cover overflow-hidden h-40 md:h-fit md:w-full"
          src="${item.url}"
          alt="${item.name}"
        />
      </a>
    `;
    swiperWrapper.appendChild(slide);
  });

  // Initialize Swiper instance
  new Swiper(".swiper1", {
    slidesPerView: 1, // Number of slides visible at once
    spaceBetween: 10, // Space between slides
    navigation: {
      nextEl: ".swiper1-button-next",
      prevEl: ".swiper1-button-prev",
    },
    pagination: {
      el: ".swiper1-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000, // Delay in milliseconds (3 seconds)
      disableOnInteraction: false, // Continue autoplay after interaction
    },
    loop: true,
  });
};

// Initialize the slider when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", Slider);

export default Slider;
