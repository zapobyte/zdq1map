export function closeModal(modal: HTMLElement) {
    if (modal) {
        modal.classList.add('hide');
        modal.classList.remove('show');
    }
}

export function showModal(modal: HTMLElement) {
    if (modal) {
        modal.classList.remove('hide');
        modal.classList.add('show');
    }
}