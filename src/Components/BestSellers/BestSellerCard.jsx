export default function BestSellerCard({ card }) {
    const { source, title } = card;
    return (
        <div className="card card-with-badge best-seller-card">
            <div className="card-image">
                <img src={source} alt="bestSeller" />
            </div>
            <div className="card-badge">
                <span className="best-seller">
                    <i className="fas fa-fire"></i> Best Seller
                </span>
            </div>
            <div className="card-title">
                <h4>{title}</h4>
                <p>Card description</p>
            </div>
        </div>
    );
}
