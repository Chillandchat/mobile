import { MessageType } from "./../scripts/index.d";
import { RoomType } from "../scripts/index.d";

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
}

/**
 * This is the props for the room list component.
 *
 * @see RoomList.tsx
 */

export interface RoomListProps {
  rooms: Array<RoomType>;
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
}
