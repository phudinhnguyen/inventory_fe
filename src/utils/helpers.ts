import { useLocation } from "react-router";

export const setBodyClassName = (
    className: string
) => {
    document.body.className = className;
};

export const debounce = (callback: Function, delay: number) => {
    let timeoutHandler: any = null;
    return (...args: any[]) => {
        if (timeoutHandler) {
            clearTimeout(timeoutHandler);
        }
        timeoutHandler = setTimeout(() => {
            callback(...args);
            timeoutHandler = null;
        }, delay);
    };
};