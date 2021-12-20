// Importing packages
import mongoose from 'mongoose' 
import { AuthSchemaType } from './type' 

// Schema
const schema: any = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  verified: Boolean,
  bot: Boolean,
  blocked: Boolean,
}) 

// Model
const user: any = mongoose.model<AuthSchemaType>('user', schema) 

// Export schema
export default user 
