//User type
export interface User {
  id: string;
  username: string;
  password: string;
  blocked: boolean;
  onDeleteList: boolean;
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