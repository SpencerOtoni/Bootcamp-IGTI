import mongoose from 'mongoose';

const db = {
  url : process.env.MONGODB_URI,
  mongoose : mongoose
}

export default  db 