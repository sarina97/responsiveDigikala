export default async function createDropdownMenu() {
  try {
    const response = await fetch("http://localhost:3004/data");
    const data = await response.json();

    const categories = data.categories;

    if (!categories || categories.length === 0) {
      console.error("No categories found in the API response");
      return;
    }

    const sidebar = document.getElementById("categories-sidebar");
    const details = document.getElementById("category-details");

    let selectedCategory = categories[0];
    //موبایل نشون بده
    

    function renderSidebar() {
      sidebar.innerHTML = ""; 
      categories.forEach((category) => {
        const item = document.createElement("div");
        item.textContent = category.title;
        item.className =
          "p-2 cursor-pointer hover:text-[#ed1944] hover:bg-white transition-all duration-400 text-[14px] font-medium ";
        item.addEventListener("mouseenter", () => {
          selectedCategory = category;
          renderDetails(); // بروزرسانی جزئیات هنگام هاور
        });
        sidebar.appendChild(item);
      });
    }
    function renderDetails() {
      details.innerHTML = "";
      const headerSide = document.createElement("div");
      headerSide.className =
        "header_side flex gap-1 items-center text-[12px] my-4 text-[#219dbc]";
      headerSide.innerHTML = `همه محصولات ${selectedCategory.title}
           <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px; fill: #219dbc;" width="24"  height="24" ><defs><symbol id="chevronLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z"></path></symbol></defs><use xlink:href="#chevronLeft"></use></svg>
          `;
      details.appendChild(headerSide);

      const gridContainer = document.createElement("div");
      gridContainer.className =
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start auto-rows-min";
      selectedCategory.items.forEach((item) => {
        const itemContainer = document.createElement("div");
        itemContainer.className =
          "item-container bg-white p-2 rounded-lg";

        const boldPoint = document.createElement("h2");
        boldPoint.textContent = item.boldPoint;
        boldPoint.className =
          "font-bold text-md mb-2 relative after:content-[''] after:absolute after:top-1/4 after:right-[-4px] after:w-[2px] after:h-4 after:bg-red-500";

        const subItems = document.createElement("ul");
        subItems.className = "pl-4 text-gray-700";
        item.subItems.forEach((subItem) => {
          const listItem = document.createElement("li");
          listItem.textContent = subItem;
          listItem.className = "my-1 text-[13px]";
          subItems.appendChild(listItem);
        });

        itemContainer.appendChild(boldPoint);
        itemContainer.appendChild(subItems);

        gridContainer.appendChild(itemContainer);
      });
      details.appendChild(gridContainer);
    }

    renderSidebar();
    renderDetails();
  } catch (error) {
    console.error("Error fetching API data:", error);
  }
}
