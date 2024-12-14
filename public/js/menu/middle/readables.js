const readables = async () => {
  try {
    const response = await fetch(
      "https://sarina97.github.io/responsiveDigikala/dbv2.json"
    );
    const data = await response.json();

    const container = document.querySelector(".readables_container");
    const readAbles_data = data.data.readables;

    readAbles_data.forEach((data) => {
      const item = document.createElement("div");
      item.classList.add(
        "flex",
        "flex-col",
        "w-full",
        "h-full",
        "border-[1px]",
        "border-gray-300",
        "rounded-xl",
        "gap-2",
        "overflow-hidden"
      );
      item.innerHTML = `
      <img src="${data.url}" alt="" class="object-cover w-full h-2/3">
          <p class="text-[12px] text-gray-700 p-3 line-clamp-2">${data.title}</p>`;
          container.appendChild(item);
    });

  } catch (e) {
    console.log(e);
  }
};

export default readables;
