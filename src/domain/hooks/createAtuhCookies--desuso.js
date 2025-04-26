// Atualmente em des-uso já que eu não quis desenvolver a relação cliente servidor.

import { cookies } from "next/headers";

export async function createCookies() {
    'use server';
    fetch("https://localhost:3000/api/auth/token", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        data = data.data;
        cookies().set("refreshToken", data.refreshToken, { path: "/" });
        cookies().set("accessToken", data.accessToken, { path: "/" });
    })
    .catch((err) => {
        console.log(err);
    });
    
}