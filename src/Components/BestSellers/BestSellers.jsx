import './BestSellers.css'
import BestSellerCard from "./BestSellerCard"
import { v4 as uuid } from "uuid";

const bestSellerData=[{
    id:uuid(),
    title:'STICKERS',
    source:"/Assets/Images/Products/product-1.webp"
},{
    id:uuid(),
    title:'GOGGLES',
    source:"/Assets/Images/Products/product-2.webp"
},
{
    id:uuid(),
    title:'TAILTIDY',
    source:"/Assets/Images/Products/product-3.webp"
},
{
    id:uuid(),
    title:'HANDGUARDS',
    source:"/Assets/Images/Products/product-4.webp"
}]
export default function BestSellers(){
    return <section className="main-container best-seller-wrapper">
        {bestSellerData.map(eachCard=>{
            return <BestSellerCard card={eachCard} key={eachCard.id}/>
        })}
    </section>
}