// Import style
import './scss/style.scss'
// Import pins data
import pins from './assets/pins.json';

// Import Dragon Warrior 1 map
import dw1MapSnes from './assets/images/dw1/maps/dq1snes_map.png';
import dw1MapNES from './assets/images/dw1/maps/dw1-nes.webp';
import coin from './assets/images/coin.png';
import nes from './assets/images/nes.png';
import snes from './assets/images/snes.png';

import { generateMap } from './scripts/generateMap';
import { toggleSidebar } from './scripts/navbar';
const versions = {
  'snes': dw1MapSnes,
  'nes': dw1MapNES,
}

let mapType = Object.keys(versions)[0];

const main: HTMLElement | null = document.getElementById('main');
const sidebar: HTMLElement | null = document.getElementById('sidebar');
const navbarToggler: HTMLElement | null = document.getElementById('toggleSidebar');
const modal: HTMLElement | null = document.getElementById('modal');
const modalContent: HTMLElement | null = document.getElementById('modalContent');
const versionContainer : HTMLElement | null = document.getElementById('versionPicker');

if(versionContainer){
  versionContainer.innerHTML = `version <img width="18" height="18" src="${mapType == 'snes'? snes: nes}" class="p-sm-left p-sm-right"/> ${mapType}`;
  versionContainer.addEventListener('click',()=> {
    if(Object.keys(versions)[0] === mapType){
      mapType = Object.keys(versions)[1]
    } else {
      mapType = Object.keys(versions)[0]
    }
    localStorage.setItem('mapType',mapType);
    versionContainer.innerHTML = `version <img width="18" height="18" src="${mapType == 'snes'? snes: nes}" class="p-sm-left p-sm-right"/> ${mapType}`;

    // Create an image object
    const image: HTMLImageElement = new Image();

    // Set the source of the image
    // @ts-ignore
    image.src = versions[mapType];

    // Wait for the image to load
    image.onload = function () {
      // Init map generation;
      if(main){
        main.innerHTML = '';
        document.querySelectorAll('.pin').forEach((ele)=> ele.remove())
      }
      generateMap('#main', image, pins);
      const canvas = document.querySelector('canvas');
      canvas?.addEventListener('pin-click', (e: any) => {
        const modalContentInnerHTML = `
          <h1>${e.detail.name}</h1>
          <div class=""></div>
        `;
        showData(modal!, modalContent!, modalContentInnerHTML);
      })
    };

  });
}

localStorage.setItem('mapType',mapType);

function showData(modal: HTMLElement, modalContent: HTMLElement, data: any) {
  if (modal && modalContent && modal.classList.contains('hide')) {
    modal.classList.remove('hide');
    modal.classList.add('show');
    modalContent.innerHTML = data;
  } else {
    modal.classList.add('hide');
    modal.classList.remove('show');
    modalContent.innerHTML = '';
  }
}

main?.addEventListener('click', (event: Event) => {
  event.stopPropagation();
  if (sidebar && sidebar.classList.contains('show')) {
    const navbarToggleIcon: Element | undefined = navbarToggler?.children[0];
    sidebar.classList.remove('show');
    sidebar.classList.add('hide');
    navbarToggleIcon?.classList.add('fa-bars');
    navbarToggleIcon?.classList.remove('fa-xmark');
  }
  if (modal?.classList.contains('show')) {
    modal.classList.remove('show');
    modal.classList.add('hide');
  }
})

navbarToggler?.addEventListener('click', () => {
  if (sidebar) {
    toggleSidebar(sidebar, navbarToggler);
  }
});

// Create an image object
const image: HTMLImageElement = new Image();

// Set the source of the image
// @ts-ignore
image.src = versions[mapType];

// Wait for the image to load
image.onload = function () {
  // Init map generation;
  generateMap('#main', image, pins);
  const canvas = document.querySelector('canvas');
  canvas?.addEventListener('pin-click', (e: any) => {
    const modalContentInnerHTML = `
      <h1>${e.detail.name}</h1>
      <div class=""></div>
    `;
    showData(modal!, modalContent!, modalContentInnerHTML);
  })
};

