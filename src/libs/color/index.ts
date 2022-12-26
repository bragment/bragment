import Color from 'color';

function generateForegroundColorFrom(
  input: string,
  percentage: number,
  saturate: number
) {
  const color = Color(input);
  return color
    .mix(Color(color.isDark() ? 'white' : 'black'), percentage)
    .saturate(saturate);
}

export function generateForegroundColorHexFrom(
  input: string,
  percentage = 0.8,
  saturate = 10
) {
  return generateForegroundColorFrom(input, percentage, saturate).hex();
}

export function generateForegroundColorHSLStringFrom(
  input: string,
  percentage = 0.8,
  saturate = 10
) {
  const arr = generateForegroundColorFrom(input, percentage, saturate)
    .hsl()
    .round()
    .array();
  return `${arr[0]} ${arr[1]}% ${arr[2]}%`;
}

export function generateOpacityColorHexFrom(input: string, percentage = 0.2) {
  return Color(input).alpha(percentage).hexa();
}
