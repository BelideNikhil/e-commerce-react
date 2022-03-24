import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
    {
        id: uuid(),
        title: "STICKERS",
        source: "/Assets/Images/stickers.webp",
    },
    {
        id: uuid(),
        title: "GOGGLES",
        source: "/Assets/Images/goggles.webp",
    },
    {
        id: uuid(),
        title: "TAILTIDY",
        source: "/Assets/Images/tailtidy.webp",
    },
    {
        id: uuid(),
        title: "HANDGUARDS",
        source: "/Assets/Images/handguards.webp",
    },
];
