const cancelCameraCall = (top: number, left: number): boolean => top < 0 || left < 0;

export function moveToPos(top: number = 0, left: number = 0) {
  if (cancelCameraCall(top, left)) return;
  window.scrollTo({ top, left, behavior: 'smooth' });
}

export function snapToPos(top: number = 0, left: number = 0) {
  if (cancelCameraCall(top, left)) return;
  window.scrollTo({ top, left, behavior: 'auto' });
}

export const moveToTop = () => moveToPos();
export const snapToTop = () => snapToPos();
