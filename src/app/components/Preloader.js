"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Preloader() {
    const router = useRouter();

    useEffect(() => {
        const startLoading = () => {
            const existingPreloader = document.getElementById("preloader");
            if (existingPreloader) {
                existingPreloader.remove();
            }

            const div = document.createElement("div");
            div.id = "preloader";
            div.className = "preloader";
            div.innerHTML = '<div class="black_wall"></div><div class="loader"></div>';
            document.body.insertBefore(div, document.body.firstChild);
        };

        const finishLoading = () => {
            const preloaderEl = document.getElementById("preloader");
            if (preloaderEl) {
                preloaderEl.classList.add("off");
            }
        };

        if (document.readyState === "complete") {
            finishLoading();
        } else {
            window.addEventListener("load", finishLoading);
        }

        router.events.on("routeChangeStart", startLoading);
        router.events.on("routeChangeComplete", finishLoading);
        router.events.on("routeChangeError", finishLoading);

        return () => {
            window.removeEventListener("load", finishLoading);
            router.events.off("routeChangeStart", startLoading);
            router.events.off("routeChangeComplete", finishLoading);
            router.events.off("routeChangeError", finishLoading);
        };
    }, [router.events]);

    return null;
}
