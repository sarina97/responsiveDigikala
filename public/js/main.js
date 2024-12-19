
import handleHeaderScroll from "./menu/header/Header.js";
import createDropdownMenu from "./menu/header/DropDown.js";
import initializeSearch from "./menu/header/search.js";
import loadCities from "./menu/header/city.js";
import Stories from "./menu/Stories.js";
import Slider from "./menu/Slider.js";
import items from "./menu/middle/items.js";
import amazing from "./menu/middle/amazing.js";
import buyCategory from "./menu/middle/buyCategory.js";
import favBreands from "./menu/middle/favBreands.js";
import yourTaste from "./menu/middle/yourTaste.js";
import highSell from "./menu/middle/highSell.js";
import offer from "./menu/middle/offer.js";
import readables from "./menu/middle/readables.js";
import { handleSupermarketButton } from "./menu/superMarket.js";
import ToggleFAQ from "./menu/footer/showList.js";  


document.addEventListener("DOMContentLoaded", () => {
  initializeSearch();
  Slider();
  handleHeaderScroll();
  createDropdownMenu();
  loadCities();
  Stories();
  items();
  amazing();
  buyCategory();
  favBreands();
  yourTaste();
  highSell();
  offer();
  readables();
  ToggleFAQ();
  handleSupermarketButton();
  

});
