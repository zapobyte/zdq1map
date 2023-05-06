export const toggleSidebar = (sidebar: HTMLElement, navbar: HTMLElement) => {
    if(sidebar){
        const navbarToggleIcon: Element | null = navbar.children[0];
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
}