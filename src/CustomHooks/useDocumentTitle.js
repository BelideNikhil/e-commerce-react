import { useEffect } from "react";

export function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title ? title : "PROJECT 97X";
    }, [title]);
}
