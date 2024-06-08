import { useEffect } from "react";

const useDetectOutsideClick = (ref: any, func?: () => void) => {
    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                func ? func() : console.log("Outside click detected");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};

export default useDetectOutsideClick;
