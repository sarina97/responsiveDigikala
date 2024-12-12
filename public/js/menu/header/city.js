const loadCities = async () => {
  try {
    const response = await fetch("https://sarina97.github.io/responsiveDigikala/dbv2.json");
    if (!response.ok) throw new Error("Failed to fetch city data");
    const data = await response.json();
    const cities = data.data.city[0]?.cities || [];
    console.log('city' , cities);
    

    const searchInput = document.querySelector("#city-search");
    const cityList = document.querySelector(".city-list");
    const cityModal = document.querySelector(".city-modal");
    const swiperWrapper = document.querySelector(".swiper-wrapper4");
    const body = document.body;

    // Function to populate city list
    const populateCities = (filter = "") => {
      cityList.innerHTML = ""; // Clear the current list

      const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().includes(filter.toLowerCase())
      );

      if (filteredCities.length === 0) {
        cityList.innerHTML = `<div class="text-center text-gray-500">نتیجه‌ای یافت نشد</div>`;
        return;
      }

      // Render each filtered city
      filteredCities.forEach((city) => {
        const cityItem = document.createElement("div");
        cityItem.classList.add("city-item", "flex", "justify-between", "p-2");
        cityItem.innerHTML = `
          <span>${city.name}</span>
          <span class="text-gray-500 text-sm">${city.province}</span>
        `;
        cityList.appendChild(cityItem);
      });
    };

    // Initial population of cities
    populateCities();

    // Add input listener for dynamic search
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim(); // Get the input value
      populateCities(query); // Re-populate cities based on the input
    });

    // Toggle modal and disable/enable scrolling
    const toggleModal = (forceClose = false) => {
      const isHidden = cityModal.classList.contains("hidden");
      if (forceClose || !isHidden) {
        cityModal.classList.add("hidden");
        body.style.overflow = ""; // Enable scrolling
      } else {
        cityModal.classList.remove("hidden");
        body.style.overflow = "hidden"; // Disable scrolling
      }
    };

    document.querySelector("#showModalBtn").addEventListener("click", (e) => {
      e.preventDefault();
      toggleModal();
    });

    document.querySelector("#choose-city").addEventListener("click", (e) => {
      e.preventDefault();
      toggleModal();
    });

    document.querySelector(".modal-close").addEventListener("click", () => {
      toggleModal(true);
    });

    // Prevent modal from closing on random clicks inside
    window.addEventListener("click", (event) => {
      if (event.target === cityModal) toggleModal(true);
    });

    // Populate Swiper
    swiperWrapper.innerHTML = ""; // Clear existing slides
    cities.forEach((city) => {
      const slide = document.createElement("div");
      slide.classList.add(
        "swiper-slide",
        "flex",
        "items-center",
        "justify-start"
      );
      slide.innerHTML = `
        <div class="p-2 bg-white border-2 border-gray-300 rounded-2xl text-center">
          <p class="font-bold text-[#434467] text-[12px]">${city.name}</p>
        </div>
      `;
      swiperWrapper.appendChild(slide);
    });

    // Initialize Swiper
    new Swiper(".repeated-city-swiper", {
      slidesPerView: 7,
      spaceBetween: 1,
      navigation: {
        nextEl: ".swiper-button-next-city",
        prevEl: ".swiper-button-prev-city",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export default loadCities;
