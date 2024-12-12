const Stories = async () => {
  try {
    const response = await fetch("https://sarina97.github.io/responsiveDigikala/dbv2.json");
    const data = await response.json();

    if (!data.data.stories || !data.data.stories[0] || !data.data.stories[0].items) {
      console.error("Invalid data structure for stories");
      return;
    }

    const stories = data.data.stories[0].items;
    console.log("story : ", stories);

    const swiperWrapper = document.querySelector(".swiper-wrapper2");
    // if (!swiperWrapper) {
    //   console.error("Swiper wrapper element not found in the DOM");
    //   return;
    // }

    swiperWrapper.innerHTML = "";

    stories.forEach((story) => {
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
    style="display: flex; align-items: center; justify-content: center; border: 2px solid rgb(192, 53, 154); border-radius: 50%; padding: 3px; box-sizing: border-box;" class="w-[55px] h-[55px] md:w-[75px] md:h-[75px]">
    <img 
      src="${story.image}" 
      alt="${story.title}" 
      style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
      
    />
  </div>
  <p style=" font-weight: 600; color: #4a5568; text-align: center; margin-top: 5px;" class="text-[9px] md:text-[10px]">${story.title}</p>
`;

      swiperWrapper.appendChild(slide);
    });

    if (document.querySelector(".swiper2")) {
      new Swiper(".swiper2", {
        slidesPerView: 5,
        spaceBetween: 6,
        navigation: {
          nextEl: ".swiper2-button-next",
          prevEl: ".swiper2-button-prev",
        },
        breakpoints: {
          1600: {
            slidesPerView: 12.5,
            spaceBetween: 12,
          },
          1300: {
            slidesPerView: 10.5,
            spaceBetween: 8,
          },
          780: {
            slidesPerView: 8.5,
            spaceBetween: 8,
          },
          610: {
            slidesPerView: 8,
            spaceBetween: 10,
          },

          400: {
            slidesPerView: 6,
            spaceBetween: 2,
          },
        },
      });
    } else {
      console.error("Swiper container not found in the DOM");
    }
  } catch (error) {
    console.error("Error fetching stories:", error.message);
  }
};

export default Stories;
