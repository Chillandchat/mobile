//User type
export interface User {
  id: string;
  username: string;
  password: string;
  blocked: boolean;
  verified: boolean;
  bot: boolean;
}

//Find user information return type
export interface UserInfoReturn {
  okStatus: boolean;
  data: User;
}

//Notification message type
export interface NotificationMessage {
  body: string;
  tittle: string;
}

//Message type
export interface Message {
  id: string;
  user: string;
  content: string;
  verified: boolean | null;
}

//User list return type
export interface UserListReturnType {
  status: boolean;
  data: Array<User>;
}

//Message list return type
export interface MessageListReturnType {
  messages: Array<Message>;
  status: boolean;
}
