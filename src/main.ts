// Import style
import './scss/style.scss'
// Import Dragon Warrior 1 map
import dw1Map from './assets/images/dw1/maps/dq1snes_map.png';
import {drawMap} from './scripts/generateMap';

const main: HTMLElement | null = document.getElementById('main');
const sidebar: HTMLElement | null = document.getElementById('sidebar');
const navbarToggler: HTMLElement | null = document.getElementById('toggleSidebar') as HTMLButtonElement;

main?.addEventListener('click',(event: Event)=> {
  event.stopPropagation();
  event.preventDefault();
  if(sidebar && sidebar.classList.contains('show')){
    const navbarToggleIcon: Element | null = navbarToggler.children[0];
    sidebar?.classList.remove('show');
    sidebar?.classList.add('hide');
    navbarToggleIcon.classList.add('fa-bars');
    navbarToggleIcon.classList.remove('fa-xmark');
  }
})

navbarToggler.addEventListener('click',()=> {
  if(sidebar){
    const navbarToggleIcon: Element | null = navbarToggler.children[0];
    if(sidebar.classList.contains('hide')){
      sidebar.classList.add('animation-show');
      sidebar.classList.remove('hide');
      sidebar.classList.remove('animation-hide');
      sidebar.style.width = '100%';
      navbarToggleIcon.classList.remove('fa-bars');
      navbarToggleIcon.classList.add('fa-xmark');
      setTimeout(()=>{
        sidebar.classList.add('show');
      },100)
    } else {
      sidebar.classList.add('animation-hide');
      sidebar.classList.remove('animation-show');
      sidebar.classList.remove('show');
      sidebar.style.width = '0%';
      navbarToggleIcon.classList.remove('fa-xmark');
      navbarToggleIcon.classList.add('fa-bars');
      setTimeout(()=>{
        sidebar.classList.add('hide');
      },100)
    }
  }
});

// Create an image object
const img: HTMLImageElement = new Image();

// Set the source of the image
img.src = dw1Map;

// Wait for the image to load
img.onload = function () {
  // Init map generation;
  drawMap(img);
};

