//User type
export interface User {
  id: string;
  username: string;
  password: string;
  blocked: boolean;
  onDeleteList: boolean;
}

//Message type
export interface Message {
  id: string;
  user: string;
  content: string;
}
