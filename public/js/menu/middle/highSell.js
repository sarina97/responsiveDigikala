const highSell = async () => {
  try {
    const response = await fetch("/public/dbv2.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    const responseData = await response.json();

    const containers = [
      { id: "highSellSwiper", sellType: "highsell" },
      { id: "hotSellSwiper", sellType: "hotsell" },
    ];

    // Iterate through each container
    containers.forEach(({ id, sellType }) => {
      const sellData = responseData.data.highSell.find((entry) => entry.type === sellType);

      if (!sellData || !sellData.items) {
        console.error(`No data found for type '${sellType}'`);
        return;
      }

      const swiperWrapper = document.querySelector(`#${id} .swiper-wrapper`);
      if (!swiperWrapper) {
        console.error(`Swiper wrapper not found for ID '${id}'`);
        return;
      }

      sellData.items.forEach((category) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

  
        const container = document.createElement("div");
        container.classList.add("flex", "flex-col", "gap-4");

        // Add items as rows
        category.items.forEach((item) => {
          const row = document.createElement("div");
          row.classList.add(
            "flex",
            "items-center",
            "justify-start",
            "gap-4",
            "px-6",
            "py-2",
            "border-b",
            "border-gray-300",
            "last:border-none"
          );

          row.innerHTML = `
            <img src="${item.url}" alt="Item ${item.id}" class="w-16 h-16 object-cover rounded">
            <span class="text-lg font-bold text-[#19bfd3]">${item.id}</span>
            <p class="text-[12px] text-[#354363] font-medium">${item.title}</p>
          `;

          container.appendChild(row);
        });

        slide.appendChild(container);
        swiperWrapper.appendChild(slide);
      });

      // Initialize Swiper for this container
      new Swiper(`#${id}`, {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 2.5,
        spaceBetween: -50,
        breakpoints: {
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3.7 },
        },
      });
    });
  } catch (error) {
    console.error("Error fetching or processing sell section data:", error);
  }
};

export default highSell;
