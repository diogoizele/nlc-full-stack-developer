/**
 *
 * @param color Hexadecimal color
 * @param opacity Opacity value
 * @returns Hexadecimal color with opacity
 */
export function alpha(color: string, opacity: number) {
  return `${color}${Math.round(opacity * 255).toString(16)}`;
}
