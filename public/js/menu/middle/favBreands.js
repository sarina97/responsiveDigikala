const favBreands = async () => {
    try {
      const response = await fetch("http://localhost:3004/data");
      if (!response.ok) throw new Error("Failed to fetch data");
  
      const data = await response.json();
  
      const swip_container = document.querySelector(".swiper-wrapper6");
  
      // Create and append slides
      data.favBrands.forEach((item) => {
        const slide = document.createElement("div");
        slide.classList.add(
          "swiper-slide",
          "flex",
          "flex-col",
          "items-center",
          "gap-2",
          "p-2"
        );
        slide.innerHTML = `
          <div 
            class="flex items-center justify-center p-2 w-[80px] h-[80px] md:w-[110px] md:h-[110px] 2xl:w-[140px] 2xl:h-[140px] border-x-[1px] border-gray-200 overflow-hidden">
            <img 
              src="${item.url}" 
              alt="Brand Image" 
              class="w-[100%] h-[100%] object-cover"
            />
          </div>
        `;
        swip_container.appendChild(slide);
      });
  
      // Initialize Swiper
      new Swiper(".swiper-container6", {
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next6",
          prevEl: ".swiper-button-prev6",
        },
        slidesPerView: 4.3,
        spaceBetween: -50,
        breakpoints: {
          640: { slidesPerView: 7 },
          768: { slidesPerView: 7 },
          1024: { slidesPerView: 9.2 },
        },
      });
    } catch (e) {
      console.error("Error fetching or rendering data:", e);
    }
  };
  
  export default favBreands;
  