/**
 * This is the props for the button component.
 *
 * @see Button.tsx
 */

export interface ButtonProps {
  color: string;
  text?: string;
  onPress: () => void;
  textColor: string;
}
