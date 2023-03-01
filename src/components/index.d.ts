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
 * This is the login form props, this interface outlines the values needed for the login form to function.
 *
 * @prop {loginFormTypeSelector} type The type of the form.
 * @prop {(text: string) => void} onTextChange The callback of the onTextChange callback event.
 * @prop {string} value The value for the text input
 * @optional @prop {boolean} safeEntry Whether the form has a safe entry feature.
 *
 * @see LoginForm.tsx Please see the login form component for source code and more information.
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
 *
 * @see Form.tsx Please the form component for the source code and more information.
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
 *
 */

export interface RoomListProps {
  rooms: Array<RoomType>;
  onPress?: (room: RootType) => void;
  displayMessages?: boolean;
  messages?: Array<MessageType>;
}

/**
 * This is the login form selector prop type, this type lists th modes available by the login form component.
 * This also in addition type gives limitations to the form modes to prevent errors.
 *
 * @option "username" The mode for user name input. eg: Login screen.
 * @option "password" The mode for a password form.
 * @option "confirm-password" The mode for the confirm password form. eg: Sign up screen.
 *
 * @see LoginForm.tsx Please see the login form component for source code and more information.
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
 * This is the typing animation component prop interface, this interface outlines the shape of the props required.
 *
 * @prop {[boolean, () => boolean]} state The state to change to show if it's activated.
 * @note You can just put simply pass the state down.
 *
 * @see TypingAnimation.tsx
 */

export interface TypingAnimationProps {
  state: [boolean, () => boolean];
}

/**
 * This is hte props interface for the send bar component,
 * this interface outlines the values to be parsed.
 *
 * @prop {boolean} typing Whether the user is typing.
 *
 * @see SendBar.tsx Please see the send bar component for source code and more information.
 */

export interface SendBarProps {
  typing: boolean;
}
