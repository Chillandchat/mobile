import { MessageType } from "./../scripts/index.d";
import { RoomType } from "../scripts/index.d";

/**
 * This is the props for the button component.
 *
 * @see Button.tsx
 */

export interface ButtonProps {
  color: string;
  text: string;
  onPress: () => void;
  textColor: string;
  disabled?: boolean;
}

/**
 * This is the props for the form component.
 *
 * @see LoginForm.tsx
 */

export interface LoginFormProps {
  safeEntry?: boolean;
  type: loginFormTypeSelector;
  onTextChange: (text: string) => void;
  value?: string;
}

/**
 * This is the props for the icon component.
 *
 * @see Icon.tsx
 */

export interface IconProps {
  iconLetter: string;
  color: string;
  touchable?: boolean;
  onPress?: () => void;
  size?: number;
}

/**
 * This is the props for the input component.
 *
 * @see Input.tsx
 */

export interface FormProps {
  safeEntry?: boolean;
  placeholder: string;
  onTextChange: (text: string) => void;
  value?: string;
  width?: number | string;
  height?: number | string;
  multiline?: boolean;
}

/**
 * This is the props for the room list component.
 *
 * @see RoomList.tsx
 */

export interface RoomListProps {
  rooms: Array<RoomType>;
  onPress?: (room: RootType) => void;
}

/**
 * This is the type restrictions for the form component type prop.
 */

type loginFormTypeSelector = "username" | "password" | "confirm-password";

/**
 * This is the message prop for the message component.
 *
 * @see Message.tsx
 */

export interface MessageProps {
  message: MessageType;
  messageUserInfo: AuthType;
  readMessage: string;
}

/**
 * This is the RGB color values for the icon component to convert hex to RGB.
 *
 * @param {number} red  The red value in RGB.
 * @param {number} green The green value in RGB.
 * @param {number} blue The blue value in RGB.
 * @param {number} alpha The alpha value
 *
 * @note If you do not know what is RGB learn more at: https://en.wikipedia.org/wiki/RGB_color_model
 */
export interface RGBColors {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

/**
 * This is the props interface/outline for the typing animation component.
 *
 * @see TypingAnimation.tsx
 */

export interface TypingAnimationProps {
  state: [boolean, () => boolean];
}

/**
 * This is the props outline fo the send bar component.
 *
 * @see SendBar.tsx
 */

export interface SendBarProps {
  typing: boolean;
}
