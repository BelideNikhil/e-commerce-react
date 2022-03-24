import "./Categories.css";
import CategoryCard from "./CategoryCard";
import { useEffect, useState } from "react";
import { getCategories } from "../../Services";
import { Loading } from "../";

export default function Categories() {
    const [isLoading, setIsLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const { status, data } = await getCategories();
            if (status === 200) {
                setCategoryData(data.categories);
                setIsLoading(false);
            }
        })();
    }, []);
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="categ-container">
                    {categoryData?.map((eachCard) => {
                        return <CategoryCard card={eachCard} key={eachCard.id} />;
                    })}
                </div>
            )}
        </div>
    );
}
