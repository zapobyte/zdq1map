// Import style
import './scss/style.scss'
// Import data
import pins from './assets/pins.json';

// Import Dragon Warrior 1 map
import dw1MapSnes from './assets/images/dw1/maps/dq1snes_map.png';
import dw1MapNES from './assets/images/dw1/maps/dw1-nes.webp';
import nes from './assets/images/nes.png';
import snes from './assets/images/snes.png';

import {generatePinHtml} from './scripts/mapPins';
import { generateArmorsHTML } from './scripts/armors';

import { generateMap } from './scripts/generateMap';
import { toggleSidebar } from './scripts/navbar';

const versions = {
  'snes': dw1MapSnes,
  'nes': dw1MapNES,
}


function versionSwitchHtml(){
  return `version <img width="18" height="18" src="${versionSelected == 'snes'? snes: nes}" class="p-sm-left p-sm-right"/> ${versionSelected}`
}

let versionSelected = Object.keys(versions)[0];

const main: HTMLElement | null = document.getElementById('main');
const sidebar: HTMLElement | null = document.getElementById('sidebar');
const navbarToggler: HTMLElement | null = document.getElementById('toggleSidebar');
const modal: HTMLElement | null = document.getElementById('modal');
const modalContent: HTMLElement | null = document.getElementById('modalContent');
const versionContainer : HTMLElement | null = document.getElementById('versionPicker');

const menuItems : NodeListOf<any> | null = document.querySelectorAll('.menu-item');

menuItems.forEach((item)=> {
  item.addEventListener(('click'),()=> {
    if(item.id.toLowerCase() === 'armors' ){
      showData(modal!,modalContent!,generateArmorsHTML())
    }
  })
})

// Create an image object
const image: HTMLImageElement = new Image();

if(versionContainer){
  versionContainer.innerHTML = versionSwitchHtml();
  versionContainer.addEventListener('click',()=> {
    if(Object.keys(versions)[0] === versionSelected){
      versionSelected = Object.keys(versions)[1]
    } else {
      versionSelected = Object.keys(versions)[0]
    }
    localStorage.setItem('versionSelected',versionSelected);
    versionContainer.innerHTML = versionSwitchHtml();

    // Set the source of the image
    // @ts-ignore
    image.src = versions[versionSelected];

    // Wait for the image to load
    image.onload = function () {
      // Init map generation;
      if(main){
        main.innerHTML = '';
        document.querySelectorAll('.pin').forEach((ele)=> ele.remove())
      }
      // @ts-ignore
      generateMap('#main', image, pins[versionSelected]);
      const canvas = document.querySelector('canvas');
      canvas?.addEventListener('pin-click', (e: any) => {
        const modalContentInnerHTML = generatePinHtml(e.detail);
        showData(modal!, modalContent!, modalContentInnerHTML);
      })
    };

  });
}

localStorage.setItem('versionSelected',versionSelected);

function closeModal() {
  if(modal){
    modal.classList.add('hide');
    modal.classList.remove('show');
  }
 
}

function showModal(){
  if(modal){
    modal.classList.remove('hide');
    modal.classList.add('show');
  }
}

function showData(modal: HTMLElement, modalContent: HTMLElement, data: any) {
  if (modal && modalContent && modal.classList.contains('hide')) {
    showModal()
    modalContent.innerHTML = data;
  } else {
    closeModal()
    modalContent.innerHTML = '';
  }
}

main?.addEventListener('click', (event: Event) => {
  event.stopPropagation();
  if (sidebar && sidebar.classList.contains('show')) {
    const navbarToggleIcon: Element | undefined = navbarToggler?.children[0];
    closeModal();
    sidebar.classList.remove('show');
    sidebar.classList.add('hide');
    navbarToggleIcon?.classList.add('fa-bars');
    navbarToggleIcon?.classList.remove('fa-xmark');
  }
  if (modal && modal.classList.contains('show')) {
    closeModal();
  }
})

navbarToggler?.addEventListener('click', () => {
  if (sidebar) {
    toggleSidebar(sidebar, navbarToggler);
    if (modal && modal.classList.contains('show')) {
      closeModal();
    }
  }
});

// Set the source of the image
// @ts-ignore
image.src = versions[versionSelected];

// Wait for the image to load
image.onload = function () {
  // Init map generation;
  //@ts-ignore
  generateMap('#main', image, pins[versionSelected]);
  const canvas = document.querySelector('canvas');
  canvas?.addEventListener('pin-click', (e: any) => {
    const modalContentInnerHTML =generatePinHtml(e.detail);
    showData(modal!, modalContent!, modalContentInnerHTML);
  })
};

