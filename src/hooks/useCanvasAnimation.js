import { useEffect } from "react";

export function useCanvasAnimation(initAnimation) {
    useEffect(() => {
        const cleanup = initAnimation();
        return cleanup;
    }, [initAnimation]);
}
