import "./Featured.css";
import FeaturedCard from "./FeaturedCard";
import { useState, useEffect } from "react";
import { Loading } from "..";
import { getFeaturedList } from "../../Services/getFeaturedList";
export default function Featured() {
    const [isLoading, setIsLoading] = useState(false);
    const [featuredList, setFeaturedList] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const { status, data } = await getFeaturedList();
            if (status === 200) {
                setFeaturedList(data.products.filter((each) => each.isFeatured));
                setIsLoading(false);
            }
        })();
    }, []);
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <section className="featured-wrapper">
                    {featuredList?.map((eachCard) => {
                        return <FeaturedCard card={eachCard} key={eachCard.id} />;
                    })}
                </section>
            )}
        </>
    );
}
