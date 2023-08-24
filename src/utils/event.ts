export function stopEventPropagation(
  event: React.MouseEvent | React.KeyboardEvent
) {
  event.stopPropagation();
}
