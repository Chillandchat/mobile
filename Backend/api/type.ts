// Importing packages
import mongoose from "mongoose" 

// AuthSchemaType interface
export interface AuthSchemaType extends mongoose.Document {
  id: string 
  username: string 
  password: string 
  verified: boolean 
  bot: boolean 
  blocked: boolean 
}

// MessageSchemaType interface
export interface MessageSchemaType extends mongoose.Document {
  id: string 
  user: string 
  content: string 
  verified: boolean 
}
