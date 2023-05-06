// Import style
import './scss/style.scss'
// Import Dragon Warrior 1 map
import dw1MapSnes from './assets/images/dw1/maps/dq1snes_map.png';
// import dw1MapGBC from './assets/images/dw1/maps/dw1gbc_map.png';

import {drawMap} from './scripts/generateMap';
import { toggleSidebar } from './scripts/navbar';

const main: HTMLElement | null = document.getElementById('main');
const sidebar: HTMLElement | null = document.getElementById('sidebar');
const navbarToggler: HTMLElement | null = document.getElementById('toggleSidebar');
const modal: HTMLElement | null = document.getElementById('modal');

main?.addEventListener('click',(event: Event)=> {
  event.stopPropagation();
  if(sidebar && sidebar.classList.contains('show')){
    const navbarToggleIcon: Element | undefined = navbarToggler?.children[0];
    sidebar.classList.remove('show');
    sidebar.classList.add('hide');
    navbarToggleIcon?.classList.add('fa-bars');
    navbarToggleIcon?.classList.remove('fa-xmark');
  }
  if(modal?.classList.contains('show')){
    modal.classList.remove('show');
    modal.classList.add('hide');
  }
})

navbarToggler?.addEventListener('click',()=> {
  if(sidebar){
    toggleSidebar(sidebar,navbarToggler);
  }
});

// Create an image object
const img: HTMLImageElement = new Image();

// Set the source of the image
img.src = dw1MapSnes;

// Wait for the image to load
img.onload = function () {
  // Init map generation;
  drawMap('#main', img);
};

