"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
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
export const login = async (prevState: { error: undefined | string },formData: FormData) => {

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
export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
}

export const changePremium = async () => {
    const session = await getSession();
  
    // Gerçek projede burada DB bağlantısı olmalı ve DB'deki değer değiştirilmeli. Fakat bu proje için dummy data'da çalışıldı
    isPro = !session.isPro;
    session.isPro = isPro;
    await session.save();
    // revalidate Veri Önbelleğini temizlemeye ve en son verileri yeniden getirmeye yarar
    revalidatePath("/profile");
  };

  export const changeUsername = async (formData: FormData) => {
    const session = await getSession();
  
    const newUsername = formData.get("username") as string;
  
    username = newUsername;
  
    session.username = username;
    await session.save();
    revalidatePath("/profile");
  };