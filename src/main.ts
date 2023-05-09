// Import style
import './scss/style.scss'
// Import data
import pins from './assets/pins.json';

// Import Dragon Warrior 1 map
import dw1MapSnes from './assets/images/dw1/maps/dq1snes_map.png';
// import dw1MapNES from './assets/images/dw1/maps/dw1-nes.webp';
import nes from './assets/images/nes.png';
import snes from './assets/images/snes.png';

import { generatePinHtml } from './scripts/mapPins';
import { generateArmorsHTML } from './scripts/armors';

import { generateMap } from './scripts/generateMap';
import { toggleSidebar, versionSwitchHtml } from './scripts/navbar';
import { showModal, closeModal } from './scripts/modal';

const mapVersion = {
  'snes': dw1MapSnes,
  // 'nes': dw1MapNES,
}

const consoles = {
  snes: snes,
  nes: nes
}

let versionSelected = Object.keys(mapVersion)[0];
localStorage.setItem('versionSelected', versionSelected);

const main: HTMLElement | null = document.getElementById('main');
const sidebar: HTMLElement | null = document.getElementById('sidebar');
const navbarToggler: HTMLElement | null = document.getElementById('toggleSidebar');
const modal: HTMLElement | null = document.getElementById('modal');
const modalContent: HTMLElement | null = document.getElementById('modalContent');
const versionContainer: HTMLElement | null = document.getElementById('versionPicker');
const menuItems: NodeListOf<any> | null = document.querySelectorAll('.menu-item');

function showData(modal: HTMLElement, modalContent: HTMLElement, data: any) {
  if (modal && modalContent && modal.classList.contains('hide')) {
    showModal(modal);
    modalContent.innerHTML = data;
  } else {
    closeModal(modal);
    modalContent.innerHTML = '';
  }
}

menuItems.forEach((item) => {
  item.addEventListener(('click'), () => {
    if (item.id.toLowerCase() === 'armors') {
      showData(modal!, modalContent!, generateArmorsHTML())
    }
  })
})

// Create an image object
const image: HTMLImageElement = new Image();

if (versionContainer) {
  versionContainer.innerHTML = versionSwitchHtml(versionSelected, consoles);

  versionContainer.addEventListener('click', () => {
    Object.keys(mapVersion).forEach((key: string) => {
      if (key !== versionSelected) {
        versionSelected = key;
      }
    });
    localStorage.setItem('versionSelected', versionSelected);
    versionContainer.innerHTML = versionSwitchHtml(versionSelected, consoles);

    // Set the source of the image
    // @ts-ignore
    image.src = versions[versionSelected];

    // Wait for the image to load
    image.onload = function () {
      // Init map generation;
      if (main) {
        main.innerHTML = '';
        document.querySelectorAll('.pin').forEach((ele) => ele.remove())
      }
      // @ts-ignore
      generateMap('#main', image, pins[versionSelected]);
      const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
      canvas?.addEventListener('pin-click', (e: any) => {
        const modalContentInnerHTML = generatePinHtml(e.detail);
        showData(modal!, modalContent!, modalContentInnerHTML);
      })
    };

  });
}

main?.addEventListener('click', (event: Event) => {
  event.stopPropagation();
  if (sidebar && sidebar.classList.contains('show') && modal) {
    const navbarToggleIcon: Element | undefined  = navbarToggler?.children[0];
    closeModal(modal);
    sidebar.classList.remove('show');
    sidebar.classList.add('hide');
    if(navbarToggleIcon) {
      navbarToggleIcon.classList.add('fa-bars');
      navbarToggleIcon.classList.remove('fa-xmark');
    }
  }
  if (modal && modal.classList.contains('show')) {
    closeModal(modal);
  }
})

navbarToggler?.addEventListener('click', () => {
  if (sidebar) {
    toggleSidebar(sidebar, navbarToggler);
    if (modal && modal.classList.contains('show')) {
      closeModal(modal);
    }
  }
});

// Set the source of the image
// @ts-ignore
image.src = mapVersion[versionSelected];

// Wait for the image to load
image.onload = function () {
  // Init map generation;
  //@ts-ignore
  generateMap('#main', image, pins[versionSelected]);
  const canvas = document.querySelector('canvas');
  canvas?.addEventListener('pin-click', (e: any) => {
    const modalContentInnerHTML = generatePinHtml(e.detail);
    showData(modal!, modalContent!, modalContentInnerHTML);
  })
};

