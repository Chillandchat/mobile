import { MessageType } from "./../scripts/index.d";
import { RoomType } from "../scripts/index.d";

/**
 * This is the prop interface for the button component,
 * this set of props are used to define the shape of the prop.
 *
 * @prop {string} color The background color of the button.
 * @prop {string} textColor The color of the text on the button.
 * @prop {() => void} onPress The function to call when the button is pressed.
 * @prop {string} text The text that the button displays.
 * @optional @prop {boolean} disabled If the button is disabled.
 *
 * @see Button.tsx Please see the button component for source code and information.
 */

export interface ButtonProps {
  color: string;
  text: string;
  onPress: () => void;
  textColor: string;
  disabled?: boolean;
}

/**
 * TODO: DO LATER
 */

export interface LoginFormProps {
  safeEntry?: boolean;
  type: loginFormTypeSelector;
  onTextChange: (text: string) => void;
  value?: string;
}

/**
 * This is the interface for the props on the icon component,
 * this interface outlines the shape of the object passed to the component.
 *
 * @prop {string} iconLetter The letter that the icon displays.
 * @prop {string} color The background color of the icon.
 * @optional @prop {() => void} onPress The function to call when the icon is pressed.
 * @optional @prop {boolean} touchable If the icon is touchable.
 *
 * @see Icon.tsx Please see the icon component for more information and source code.
 */

export interface IconProps {
  iconLetter: string;
  color: string;
  touchable?: boolean;
  onPress?: () => void;
  size?: number;
}

/**
 * This is the interface for props on the form component.
 * the interface outlines the shape of the object passed to this component.
 *
 * @prop {string} placeholder The placeholder of the form.
 * @prop {(text: string) => void} onChangeText The event that will be called when the text is changed and the data will be stored in the parameter.
 * @optional @prop {boolean} safeEntry Whether the text is secure or not.
 * @optional @prop {string} value The value of the text form.
 * @optional @prop {number | string} width The width of the form.
 * @optional @prop {number | string} height The height of the form
 * @optional @prop {boolean} multiline Whether the text is multiline or not.
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
  displayMessages?: boolean;
  messages?: Array<MessageType>;
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
