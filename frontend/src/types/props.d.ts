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

/**
 * This is the props for the form component.
 *
 * @see Form.tsx
 */

export interface FormProps {
  title: string;
  safeEntry: boolean;
  type: loginFormTypeSelector;
  value?: any;
  onTextChange?: (text: string) => void;
}

/**
 * This is the type ristrictions for the form component type prop.
 */

type loginFormTypeSelector = "username" | "password";
