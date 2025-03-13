'use client'
// https://www.youtube.com/watch?v=ASOc6lm-7l8

// Vamos redefinir a função de localStorage já que o Next da um quequeépafala na função window.localStorage
export function getLocalStorage (key : string ) {
    const data = window.localStorage.getItem(key)
    return data ;
    // esse "!" do lado do data representa que ele pode retornar null, mas como sabemos que ele não vai retornar null, podemos ignorar isso e simplesmente
}
export function setLocalStorage (key : string , value : unknown ) {
    const data = JSON.stringify(value);
    return window.localStorage.setItem(key, data);  
    // esse "!" do lado do data representa que ele pode retornar null, mas como sabemos que ele não vai retornar null, podemos ignorar isso e simplesmente
}
