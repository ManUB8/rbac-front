import { useEffect } from "react";

export function useDebouncedEffect(fn: () => void, deps: any[], delay = 1000) {
    useEffect(() => {
        const id = setTimeout(fn, delay);
        return () => clearTimeout(id);
    }, [...deps, delay]);
}
