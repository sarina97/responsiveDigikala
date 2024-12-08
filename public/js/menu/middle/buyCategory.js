const buyCategory = async () => {
  try {
    const response = await fetch("http://localhost:3004/data");
    const data = await response.json();

    const container = document.querySelector(".buy_category");
    const container_header = document.createElement("h1");
    container_header.innerText = 'خرید بر اساس دسته بندی';
    container_header.classList.add('text-center' , 'my-4' ,'text-[18px]');
    container.appendChild(container_header);
    const container_grid = document.createElement("div");
    container_grid.classList.add(
      "visible-items",
      "w-full",
      "grid",
      "grid-cols-4",
      "md:grid-cols-8",
      "gap-1"
    );

    const category = data.buyCategory;
    category.forEach((item) => {
      const items = document.createElement('a')
      items.setAttribute('href' , '#')
      items.classList.add('flex' , 'flex-col' , 'p-3' , 'gap-2','h-[150px]' , 'items-center' , 'cursor-pointer');
      items.innerHTML = `
      <img 
      src="${item.image}" 
      alt="${item.title}" 
      class='w-[60px] md:w-[90px] rounded-[50%] object-cover'
    />
    <span class='text-[11px] text-center p-3 font-lg'>${item.title}</span>`;
    container_grid.appendChild(items);
    });

    container.appendChild(container_grid);
    
  } catch (e) {
    console.log(e);
  }
};

export default buyCategory;
