"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

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
export const login = async () => {}
export const logout = async () => {}