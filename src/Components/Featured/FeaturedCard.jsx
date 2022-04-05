import { useNavigate } from "react-router-dom";

export default function FeaturedCard({ card }) {
    const { source, title } = card;
    const navigate = useNavigate();
    return (
        <div className="card featured-card" onClick={() => navigate(`/products/${card.id}`)}>
            <div className="card-image">
                <img src={source} alt="bestSeller" />
            </div>
            <div className="card-title">
                <h4>{title}</h4>
                <p>Card description</p>
            </div>
        </div>
    );
}
