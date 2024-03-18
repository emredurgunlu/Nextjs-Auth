"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Dummy Data
let username = "emre";
let isPro = true;
let isBlocked = true;

export const getSession = async () => {
    // <SessionData> interface olarak kalıba uymak için
    // bu cookies() encrypted session oluyor, decrypted yapmak için sessionOptions'a ihtiyaç duyuyoruz
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    // eğer kaydedilmiş bir session yok ise default değeri (false) atayacak
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
}
export const login = async (formData: FormData) => {

    const session = await getSession();

    const formUsername = formData.get("username") as string;
    const formPassword = formData.get("password") as string;

    // CHECK USER IN THE DB for the real project. But dummy data is used in this project
    // const user = await db.getUser({username,password})

    // Eğer formdaki username databasedeki username'e eşit değilse
    if (formUsername !== username) {
        return { error: "Wrong Credentials!" };
    }

    // Eğer formdaki username databasedeki username'e eşitse yani bir problem yoksa session bilgisini güncelliyoruz
    session.userId = "1"; // gerçek projede bu id databaseden gelecek
    session.username = formUsername;
    session.isPro = isPro;
    session.isLoggedIn = true;
  
    await session.save();
    redirect("/");

}
export const logout = async () => {}