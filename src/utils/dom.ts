export function scrollIntoView(el: Element) {
  if (
    'scrollIntoViewIfNeeded' in el &&
    (el as any).scrollIntoViewIfNeeded instanceof Function
  ) {
    (el as any).scrollIntoViewIfNeeded();
  } else {
    el.scrollIntoView();
  }
}
