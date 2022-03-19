import "./Categories.css";
import { v4 as uuid } from "uuid";
import CategoryCard from "./CategoryCard";
const categoryData = [
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
export default function Categories() {
    return (
        <div className="categ-container">
            {categoryData.map((eachCard) => {
                return <CategoryCard card={eachCard} key={eachCard.id} />;
            })}
        </div>
    );
}
