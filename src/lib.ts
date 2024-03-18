import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?:string;
  username?:string;
  img?:string;
  isPro?:boolean
  isBlocked?:boolean
  isLoggedIn:boolean
}

export const defaultSession:SessionData = {
    isLoggedIn:false
  }

export const sessionOptions: SessionOptions ={
  password: process.env.SECRET_KEY!,
  cookieName: "user-session", // it can be any name
  cookieOptions:{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production" // // set this to false in local (non-HTTPS) development
    // Also you can add maxAge: for time period
  }
}