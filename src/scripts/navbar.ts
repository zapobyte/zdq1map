import Handlebars from "handlebars";

export const toggleSidebar = (sidebar: HTMLElement, navbar: HTMLElement) => {
  if (sidebar) {
    const navbarToggleIcon: Element | null = navbar.children[0];
    if (sidebar.classList.contains('hide')) {
      sidebar.classList.add('animation-show');
      sidebar.classList.remove('hide');
      sidebar.classList.remove('animation-hide');
      sidebar.style.width = '100%';
      navbarToggleIcon.classList.remove('fa-bars');
      navbarToggleIcon.classList.add('fa-xmark');
      setTimeout(() => {
        sidebar.classList.add('show');
      }, 100)
    } else {
      sidebar.classList.add('animation-hide');
      sidebar.classList.remove('animation-show');
      sidebar.classList.remove('show');
      sidebar.style.width = '0%';
      navbarToggleIcon.classList.remove('fa-xmark');
      navbarToggleIcon.classList.add('fa-bars');
      setTimeout(() => {
        sidebar.classList.add('hide');
      }, 100)
    }
  }
}

export function versionSwitchHtml(version: string, data: any) {
  interface Version {
    version: string;
  }

  const context: Version = {
    version: version
  };

  const source = `version<img width="18" height="18" src=" {{print_image version}}" class="p-sm-left p-sm-right"/> {{version}}`;

  Handlebars.registerHelper('print_image', function (value) {
    return data[value];
  });

  const template = Handlebars.compile(source);
  const html = template(context);

  return html;
}