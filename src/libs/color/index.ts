import Color from 'color';

export function generateForegroundColorHSLFrom(
  input: string,
  percentage = 0.8
) {
  if (Color(input).isDark()) {
    const arr = Color(input)
      .mix(Color('white'), percentage)
      .saturate(10)
      .hsl()
      .round()
      .array();
    return `${arr[0]} ${arr[1]}% ${arr[2]}%`;
  } else {
    const arr = Color(input)
      .mix(Color('black'), percentage)
      .saturate(10)
      .hsl()
      .round()
      .array();
    return `${arr[0]} ${arr[1]}% ${arr[2]}%`;
  }
}
