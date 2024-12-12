const yourTaste = async () => {
  try {
    const response = await fetch("https://sarina97.github.io/responsiveDigikala/dbv2.json");
    if (!response.ok) throw new Error("Failed to fetch data");

    const responseData = await response.json();

    console.log("Response Data:", responseData);

    // Check if 'yourTaste' data exists
    const yourTasteData = responseData?.data.yourTaste;
    if (!yourTasteData) {
      console.error("No 'yourTaste' data found in the response.");
      return;
    }

    // List of containers to handle
    const containers = [
      { id: "choose_tatse_container", tasteType: "taste1" },
      { id: "choose_tatse_container2", tasteType: "taste2" },
    ];

    // Loop through containers
    containers.forEach(({ id, tasteType }) => {
      const container = document.getElementById(id);
      if (!container) {
        console.error(`Container with id '${id}' not found.`);
        return;
      }

      // Find data for the specific taste type
      const selectedTasteData = yourTasteData.find((taste) => taste.type === tasteType);

      if (!selectedTasteData) {
        console.error(`No data found for type: ${tasteType}`);
        return;
      }

      // Render categories and items for the current container
      selectedTasteData.items.forEach((category) => {
        const categorySection = document.createElement("div");
        categorySection.classList.add("flex", "flex-col", "gap-2", "p-4", "border");

        categorySection.innerHTML = `
          <div class="flex flex-col gap-2">
            <h2 class="font-bold text-[12px] lg:text-lg">${category.category}</h2>
            <span class="text-[10px] text-gray-400">بر اساس سلیقه شما</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
          </div>
          <a href="#" class="text-[#19bfd3] text-[12px] text-center flex items-center justify-center font-bold">مشاهده
          <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px; fill:#19bfd3;" width="24"  height="24" ><defs><symbol id="chevronLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z"></path></symbol></defs><use xlink:href="#chevronLeft"></use></svg>
          </a>
        `;

        const gridContainer = categorySection.querySelector(".grid");

        category.items.forEach((item, index) => {
          const gridItem = document.createElement("div");
          gridItem.classList.add("p-2", "flex", "justify-center", "items-center");

          if (index % 2 === 0) gridItem.classList.add("border-l");
          if (index < category.items.length - 2) gridItem.classList.add("border-b");

          gridItem.innerHTML = `
            <img 
              src="${item.url}" 
              alt="Item ${item.id}" 
              class="w-full h-auto object-cover rounded"
            />
          `;
          gridContainer.appendChild(gridItem);
        });

        container.appendChild(categorySection);
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default yourTaste;
