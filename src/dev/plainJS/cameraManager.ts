export function moveToPos(top: number = 0, left: number = 0) {
  window.scrollTo({ top, left, behavior: 'smooth' });
}

export function snapToPos(top: number = 0, left: number = 0) {
  window.scrollTo({ top, left, behavior: 'auto' });
}

export function moveToTop() {
  moveToPos();
}

export function snapToTop() {
  snapToPos();
}
