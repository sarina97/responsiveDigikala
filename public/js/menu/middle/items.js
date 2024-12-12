const items = async () => {
  try {
    const response = await fetch("/public/dbv2.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();

    const mainItems = data.data.items.find((group) => group.type === "main").items;
    const serviceItems = data.data.items.find(
      (group) => group.type === "services"
    ).items;
    const container = document.querySelector(".items");

    container.innerHTML = "";

    const visibleContainer = document.createElement("div");
    visibleContainer.classList.add(
      "visible-items",
      "w-full",
      "grid",
      "grid-cols-9",
      "gap-2"
    );
    container.appendChild(visibleContainer);

    mainItems.slice(0, 9).forEach((item) => {
      const div = document.createElement("div");
      div.classList.add(
        "item",
        "flex",
        "flex-col",
        "items-center",
        "text-center"
      );

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.classList.add(
        "w-[52px]",
        "rounded-[50%]",
        "h-[52px]",
        "object-cover"
      );

      const title = document.createElement("p");
      title.textContent = item.title;
      title.classList.add(
        "mt-2",
        "lg:text-[12px]",
        "text-[10px]",
        "px-2",
        "lg:px-6",
        "font-medium",
        "text-center"
      );

      div.appendChild(img);
      div.appendChild(title);
      visibleContainer.appendChild(div);
    });

    // Backdrop
    const backdrop = document.createElement("div");
    backdrop.classList.add(
      "backdrop",
      "hidden",
      "fixed",
      "top-0",
      "left-0",
      "w-full",
      "h-full",
      "bg-black",
      "bg-opacity-50",
      "z-40"
    );
    document.body.appendChild(backdrop);

    // Hidden container for services and extra items
    const hiddenContainer = document.createElement("div");
    hiddenContainer.classList.add(
      "hidden-items",
      "hidden",
      "fixed",
      "top-0",
      "left-0",
      "w-[50vw]",
      "h-[70vh]",
      "top-[20%]",
      "left-[25%]",
      "overflow-hidden",
      "rounded-xl",
      "bg-white",
      "z-50",
      "p-6",
      "flex",
      "flex-col",
      "gap-4"
    );
    container.appendChild(hiddenContainer);

    // Section title for services
    const servicesTitle = document.createElement("h2");
    servicesTitle.textContent = "سرویس‌های گروه دیجی‌کالا";
    servicesTitle.classList.add(
      "text-right",
      "font-bold",
      "text-gray-500",
      "order-2",
      "text-sm",
      "mb-1"
    );
    hiddenContainer.appendChild(servicesTitle);

    const servicesGrid = document.createElement("div");
    servicesGrid.classList.add("services-grid", "grid","grid-cols-1", "md:grid-cols-2","order-3", "gap-4");
    hiddenContainer.appendChild(servicesGrid);

    serviceItems.forEach((item) => {
      const serviceCard = document.createElement("div");
      serviceCard.classList.add(
        "service-card",
        "flex",
        "items-center",
        "gap-2",
        "p-4",
        "border",
        "border-gray-200",
        "rounded-lg",
        "hover:shadow-md",
        "cursor-pointer"
      );

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.classList.add(
        "w-[40px]",
        "h-[40px]",
        "rounded-[50%]",
        "object-cover"
      );

      const title = document.createElement("p");
      title.textContent = item.title;
      title.classList.add("text-[14px]", "font-medium");

      serviceCard.appendChild(img);
      serviceCard.appendChild(title);
      servicesGrid.appendChild(serviceCard);
    });

    // New div for extra "main" items (moved to hidden container)
    const extraItemsContainer = document.createElement("div");
    extraItemsContainer.classList.add(
      "extra-items-container",
      "mb-6",
      "w-full"
    );
    hiddenContainer.appendChild(extraItemsContainer);

    // Title for extra items section
    const extraItemsTitle = document.createElement("h2");
    extraItemsTitle.classList.add(
      "text-right",
      "font-bold",
      "text-gray-500",
      "text-sm",
      "order-2",
      "mb-4"
    );
    extraItemsContainer.appendChild(extraItemsTitle);

    // Extra items grid
    const extraItemsGrid = document.createElement("div");
    extraItemsGrid.classList.add(
      "extra-items-grid2",
      "order-1",
      "grid",
      "grid-cols-4", 
      "md:grid-cols-5", 
      "gap-4"
    );
    extraItemsContainer.appendChild(extraItemsGrid);

    // Show extra items (after first 9)
    mainItems.slice(9).forEach((item) => {
      const extraItemCard = document.createElement("div");
      extraItemCard.classList.add(
        "extra-item-card",
        "flex",
        "flex-col",
        "items-center",
        "p-1",
        "gap-2",
        "cursor-pointer",
      );

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.classList.add(
        "w-[40px]",
        "h-[40px]",
        "rounded-[50%]",
        "object-cover"
      );

      const title = document.createElement("p");
      title.textContent = item.title;
      title.classList.add("text-[11px]","text-center", "font-medium");

      extraItemCard.appendChild(img);
      extraItemCard.appendChild(title);
      extraItemsGrid.appendChild(extraItemCard);
    });

    // Show More button
    const showMoreButton = document.createElement("button");
    showMoreButton.textContent = "...";
    showMoreButton.classList.add(
      "show-more",
      "w-[52px]",
      "lg:block",
      "mb-5",
      "mr-5",
      "h-[52px]",
      "bg-gray-200",
      "text-gray-500",
      "text-[25px]",
      "rounded-[50%]"
    );
    container.appendChild(showMoreButton);

    // Close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.classList.add(
      "absolute",
      "top-4",
      "left-4",
      "w-[40px]",
      "h-[40px]",
      "rounded-[50%]",
      "text-gray-800",
      "text-[18px]",
      "flex",
      "items-center",
      "justify-center"
    );
    hiddenContainer.appendChild(closeButton);

    // Toggle hidden container and backdrop
    const toggleVisibility = () => {
      hiddenContainer.classList.toggle("hidden");
      backdrop.classList.toggle("hidden");
    };

    showMoreButton.addEventListener("click", toggleVisibility);
    closeButton.addEventListener("click", toggleVisibility);
    backdrop.addEventListener("click", toggleVisibility);
  } catch (e) {
    console.error("Error fetching data:", e);
  }
};

export default items;
