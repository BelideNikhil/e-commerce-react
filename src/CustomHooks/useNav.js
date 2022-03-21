import { useState } from "react";

export function useNav() {
    const [navToggle, setNavToggle] = useState(false);

    function asideToggleFunction() {
        setNavToggle((prev) => !prev);
    }
    return { navToggle, setNavToggle, asideToggleFunction };
}
