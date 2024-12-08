const amazing = async () => {
  try {
    const response = await fetch("http://localhost:3004/data");
    const data = await response.json(); // Await here to ensure the data is resolved parse data to usable json object 

    // Timer logic
    let hours = 20;
    let minutes = 0;
    let seconds = 0;

    const updateTimer = () => {
      seconds--;

      if (seconds < 0) {
        seconds = 59;
        minutes--;
      }
      if (minutes < 0) {
        minutes = 59;
        hours--;
      }
      if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(timerInterval);
        document.querySelector('.amazing_timer').textContent = "Time's up!";
        return;
      }

      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };

    const timerInterval = setInterval(updateTimer, 1000); // Save interval ID to clear later

    // Main data
    const swiperWrapper = document.querySelector(".swiper-wrapper5");
    const amazingHeader = document.querySelector(".amzing_header");

    // Check if products exist in the data
    if (!data.products || !data.products.length) {
      console.error("No products found in the data");
      return;
    }
console.log( data.products);

    data.products.forEach((product) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide", "flex", "flex-col", "items-center", "justify-center", "p-4");

      slide.innerHTML = `
        <div class="bg-white border w-[8rem] h-[200px] md:w-[10rem] md:h-[260px] rounded-sm p-2 md:p-4 flex md:justify-between flex-col items-center">
          <img src="${product.image}" alt="${product.title}" class="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-contain mb-2">
          <h3 class=" text-gray-500 text-[9px] md:text-[11px]">${product.title}</h3>
          <div class="flex items-center justify-between w-full mt-2">
            <span class="text-gray-800 text-[12px] font-bold">${product.price} ریال</span>
            <span class="bg-red-600 text-white text-[10px] rounded-full px-2 py-[2px] mt-2">${product.offer}</span>
            </div>
            <span class="line-through text-gray-400 text-xs ">${product.originalPrice} ریال</span>
        </div>
      `;

      swiperWrapper.appendChild(slide);
    });

    // Initialize Swiper
   new Swiper(".amazing-swiper", {
      slidesPerView: 2.5,
      spaceBetween: 2,
      navigation: {
        nextEl: ".swiper-button-next5",
        prevEl: ".swiper-button-prev5",
      },
      on: {
        slideNextTransitionStart: () => amazingHeader.classList.add("lg:hidden"),
        slidePrevTransitionStart: () => amazingHeader.classList.remove("lg:hidden"),
          
      },
      breakpoints: {
        1600: {
          // Extra Large (xl)
          slidesPerView: 6.4,
          spaceBetween: 10,
        },
        1300: {
          // For screens smaller than 1024px (LG size in Tailwind)
          slidesPerView: 5  ,
          spaceBetween: 8, // Adjust spacing if needed
        },
        780: {
          // For screens smaller than 1024px (LG size in Tailwind)
          slidesPerView: 4.8,
          spaceBetween: 8, // Adjust spacing if needed
        },
        610: {
          // Optional: For medium screens (MD size in Tailwind)
          slidesPerView: 4.5,
          spaceBetween: 10,
        },

        400: {
          slidesPerView: 3.2,
          spaceBetween: 2,
        },
      },
    });
  } catch (e) {
    console.error("Error loading Swiper:", e);
  }
};

export default amazing;
