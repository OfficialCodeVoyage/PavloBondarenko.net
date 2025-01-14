"use client";
import './../globals.css'

import { useEffect } from "react";

export default function Loading() {
    useEffect(() => {
        const div = document.createElement("div");
        div.id = "preloader";
        div.className = "preloader";
        div.innerHTML = '<div class="black_wall"></div><div class="loader"></div>';
        document.body.insertBefore(div, document.body.firstChild);

        const preloaderEl = document.getElementById("preloader");
        if (preloaderEl) {
            preloaderEl.classList.add("off");
        }

        return () => {
            const preloaderEl = document.getElementById("preloader");
            if (preloaderEl) {
                preloaderEl.remove();
            }
        };
    }, []);

    return null;
}

// "use client";
//
// import { useEffect } from "react";
//
// export default function Preloader() {
//     useEffect(() => {
//         const div = document.createElement("div");
//         div.id = "preloader";
//         div.className = "preloader";
//         div.innerHTML = '<div class="black_wall"></div><div class="loader"></div>';
//         document.body.insertBefore(div, document.body.firstChild);
//
//         window.onload = function() {
//             const preloaderEl = document.getElementById("preloader");
//             if (preloaderEl) {
//                 preloaderEl.classList.add("off");
//             }
//         };
//
//         // window.onload=function() {
//         //     document.getElementById("preloader").classList.add("off")
//         // };
//     }, []);
//
//     return null;
// }

