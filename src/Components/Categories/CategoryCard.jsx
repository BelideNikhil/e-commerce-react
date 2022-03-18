export default function CategoryCard({ card }) {
    return (
        <div className="categ-card card card-overlay">
            <div className="card-image">
                <img src={card.source} alt={card.title} />
            </div>
            <div className="card-overlay-content">
                <span>{card.title}</span>
            </div>
        </div>
    );
}
