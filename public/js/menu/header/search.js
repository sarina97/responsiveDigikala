export default async function initializeSearch() {
  const searchInput = document.querySelector("#search-input");
  const searchResults = document.getElementById("search-results");
  const closeSearch = document.querySelector("#close-search");
  const header_search = document.querySelector(".header_search");

  if (!searchInput || !searchResults || !closeSearch) {
    console.error("Search elements not found in the DOM!");
    return;
  }

  searchInput.addEventListener("focus", () => {
    searchResults.classList.remove("hidden");
    header_search.className = header_search.className.replace(
      "bg-gray",
      "bg-white"
    );  
    header_search.classList.add("shadow-lg");
    searchInput.classList.add("border-b-2", "border-blue-500");

    searchResults.innerHTML = `
       <div class="flex flex-col gap-4">
        <div class="flex gap-2 mb-4">
          <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" style="width: 22px; height: 22px; fill: gray" width="24" height="24">
            <defs>
              <symbol id="searchTrend" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12.015 9.105c.222.397.41.73.466.842.361.724.519 1.31.519 2.053a2 2 0 01-4 0l.003-4.557c0-.953-1.206-1.367-1.79-.613C5.087 9.572 4 11.906 4 13.889 4 18.365 7.578 22 12 22c4.422 0 8-3.635 8-8.111 0-2.968-2.45-6.78-7.295-11.598a1 1 0 00-1.6.262c-.807 1.615-.807 3.28 0 4.894.178.356.582 1.076.91 1.658zM7 12a4 4 0 108 0c0-1.078-.238-1.962-.73-2.947-.079-.156-.31-.569-.566-1.024a50.532 50.532 0 01-.81-1.476c-.273-.546-.404-1.079-.393-1.612C16.18 8.811 18 11.834 18 13.889 18 17.267 15.31 20 12 20s-6-2.733-6-6.111c0-.87.33-1.925 1-3.154V12z" clip-rule="evenodd"></path>
              </symbol>
            </defs>
            <use xlink:href="#searchTrend"></use>
          </svg>
          <span class="text-[#4e4f70]">جستجوهای پرطرفدار</span>
        </div>
        <div class="swiper-container3 overflow-hidden">
          <div class="swiper-wrapper">
            <!-- دسته‌بندی‌ها داینامیک اضافه می‌شوند -->
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div></div>
      `;

    fetchCategories();
  });
  document.addEventListener("click", (event) => {
    if (!header_search.contains(event.target)) {
      // اگر کلیک روی header_search یا درون آن نبود
      header_search.classList.remove("shadow-lg", "border-b-2", "border-blue-500");
      header_search.className = header_search.className.replace(
          "bg-white",
          "bg-gray"
      );  
      searchInput.value = "";  // پاک کردن مقدار ورودی جستجو
      searchResults.classList.add("hidden");  // مخفی کردن نتایج جستجو
    }
  });
  
  searchInput.addEventListener("blur", () => {
    setTimeout(() => searchResults.classList.add("hidden"), 200);
  });

  closeSearch.addEventListener("click", () => {
    searchInput.value = "";
    searchResults.classList.add("hidden");
    header_search.classList.remove("shadow-lg");
    header_search.className = header_search.className.replace(
        "bg-white",
        "bg-gray"
      );  
  });

  searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim();

    if (query === "") {
      searchResults.innerHTML = "";
      return;
    }

    try {
      const response = await fetch("https://sarina97.github.io/responsiveDigikala/dbv2.json");
      const data = await response.json();

      if (!data.data.searchItems || !Array.isArray(data.data.searchItems)) {
        throw new Error("Invalid data format");
      }

      const filteredResults = [];
      data.data.searchItems.forEach((category) => {
        console.log("matching" , category);
        const matchingItems = category.items.filter((item) =>
          item.title.includes(query)
        );
        matchingItems.forEach((item) => {
          filteredResults.push({ ...item, category: category.category });
        });
      });

      renderResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  });

  function renderResults(results) {
    searchResults.innerHTML = "";

    if (results.length === 0) {
      searchResults.innerHTML =
        '<div class="result-item text-gray-500">نتیجه‌ای پیدا نشد</div>';
      return;
    }

    results.forEach((result) => {
      const item = document.createElement("div");
      item.className = "result-item p-2 hover:bg-gray-100 cursor-pointer";

      const title = document.createElement("div");
      title.textContent = result.title;
      title.className = "font-medium text-gray-800";

      const category = document.createElement("div");
      category.textContent = `در دسته‌بندی: ${result.category}`;
      category.className = "text-sm text-gray-500";

      item.appendChild(title);
      item.appendChild(category);
      searchResults.appendChild(item);

      item.addEventListener("click", () => {
        searchInput.value = result.title;
        searchResults.classList.add("hidden");
      });
    });
  }

  async function fetchCategories() {
    try {
      const response = await fetch("https://sarina97.github.io/responsiveDigikala/dbv2.json");
      const data = await response.json();

      if (!data.data.searchItems || !Array.isArray(data.data.searchItems)) {
        throw new Error("Invalid data format");
      }

      const swiperWrapper = document.querySelector(".swiper-wrapper");
      data.data.searchItems.forEach((category) => {
        const categorySlide = document.createElement("div");
        categorySlide.className = "swiper-slide";
        categorySlide.innerHTML = `
            <div class=" bg-white border-2 border-gray-400 rounded-2xl shadow-md text-center">
              <h3 class="font-bold py-1 text-gray-700 mb-2">${category.category}</h3>
             
            </div>
          `;
        swiperWrapper.appendChild(categorySlide);
      });

      new Swiper(".swiper-container3", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 7 },
        },
      });
      console.log(document.querySelector(".swiper-button-next"));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
}
