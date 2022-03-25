export default function FeaturedCard({ card }) {
    const { source, title } = card;
    return (
        <div className="card featured-card">
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
