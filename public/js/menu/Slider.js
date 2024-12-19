const Slider = async () => {
  try {

    const response = await fetch("https://sarina97.github.io/responsiveDigikala/dbv2.json");
    const data = await response.json();
    

    if (!data.data.slider) {
      console.error("No slider data found in the API response");
      return;
    }

    renderSlider(data.data.slider);
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

  swiperWrapper.innerHTML = "";

  sliderData.forEach((item) => {    
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide" ,"px-3" , "md:p-0");
    slide.innerHTML = `
      <a href="${item.link}" target="_blank">
        <img
          class="block object-cover overflow-hidden rounded-2xl md:rounded-none h-40 md:h-fit md:w-full"
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
