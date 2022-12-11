export function disableScrollContainerByChildElement(
  child?: HTMLElement | null
) {
  if (child) {
    const scrollContainer = child?.closest(
      '.scroll-container'
    ) as HTMLElement | null;
    const scrollDom = scrollContainer?.firstElementChild;
    scrollDom?.classList.add('disabled-scroll');
    return () => scrollDom?.classList.remove('disabled-scroll');
  }
}

export function setScrollContainerDisabledByChildElement(
  child?: HTMLElement | null,
  disabled = true
) {
  const scrollContainer = child?.closest(
    '.scroll-container'
  ) as HTMLElement | null;
  const div = scrollContainer?.firstElementChild;
  if (div instanceof HTMLDivElement) {
    if (disabled) {
      div.classList.add('disabled-scroll');
    } else {
      div.classList.remove('disabled-scroll');
    }
  }
}
