import "./SingleProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct, useWishlist, useCart, useAuth } from "../../Context";
import { Loading } from "../../Components";
import { useDocumentTitle } from "../../CustomHooks/useDocumentTitle";

export default function SingleProduct() {
    const {
        productState: { prodList },
    } = useProduct();
    const {
        addToCartHandler,
        isLoading: cartLoading,
        cartState: { cartList },
    } = useCart();
    const {
        addToWishList,
        wishlistState: { wishList },
        isLoading: wishlistLoading,
    } = useWishlist();
    const {
        authState: { isAuth },
    } = useAuth();

    const { id: productId } = useParams();
    const navigate = useNavigate();

    const product = prodList?.find((each) => each.id === productId);
    const foundInCart = cartList?.find((each) => each._id === product._id);
    const foundInWishlist = wishList?.find((each) => each._id === product._id);

    useDocumentTitle(product?.title);
    return (
        <>
            {product ? (
                <div className={`single-product `}>
                    <div className="product-img">
                        <img src={product.source} alt={product.title} />
                    </div>
                    <div className="single-product-content">
                        <h3 className="mb-4">{product.title}</h3>
                        <div className="mb-4">{product.description}</div>
                        <div className="rating-container rating-short mb-4">
                            <span className="rating-user-avg">
                                {product.rating}
                                <span className="rating-icon mr-4">
                                    <i className="fas fa-star"></i>
                                </span>
                                | 270 Ratings
                            </span>
                        </div>
                        <hr />
                        <div className="card-pricing">
                            <span className="card-selling-price">
                                <span>
                                    <i className="fas fa-rupee-sign"></i>
                                </span>
                                {product.price}
                            </span>
                            <span className="card-original-price">
                                <span>
                                    <i className="fas fa-rupee-sign"></i>
                                </span>
                                {Math.ceil(product.price + (product.discountPercent / 100) * product.price)}
                            </span>
                            <span className="card-discount-percent">{product.discountPercent}%</span>
                        </div>
                        <hr />
                        <div className="mb-8">
                            <div className="mb-4">
                                <i className="fas fa-motorcycle mr-4"></i>
                                {product.oneDayDelivery ? "One Day Delivery" : "Delivered in 3-5 days"}
                            </div>
                            <div className="mb-4">
                                <i className="far fa-credit-card mr-4"></i> Pay on delivery available
                            </div>
                            <div className="mb-4">
                                <i className="fas fa-exchange-alt mr-4"></i> Easy 30 days &#38; exchange
                            </div>
                            <small>100% Original Products</small>
                        </div>
                        <div className="actions">
                            <button
                                className="btn btn-outline-primary single-prod-btn "
                                disabled={wishlistLoading}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    isAuth
                                        ? foundInWishlist
                                            ? navigate("/wishlist")
                                            : addToWishList(product)
                                        : navigate("/login");
                                }}
                            >
                                {foundInWishlist ? (
                                    <span>
                                        <i className="fas fa-heart"></i>
                                        Wishlisted
                                    </span>
                                ) : (
                                    "Wishlist"
                                )}
                            </button>
                            <button
                                className={`btn btn-solid-primary single-prod-btn ${
                                    product.outOfStock ? "not-allowed" : ""
                                }`}
                                disabled={cartLoading || product.outOfStock}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    isAuth
                                        ? foundInCart
                                            ? navigate("/cart")
                                            : addToCartHandler(product)
                                        : navigate("/login");
                                }}
                            >
                                <i className="fas fa-shopping-cart"></i>
                                {isAuth === true && foundInCart ? "Go " : "Add "}
                                to cart
                            </button>
                        </div>
                        <small>The products are 100% Original and Scratch Resistant.</small>
                        <h5>Get additional offer</h5>
                        <small>Buy this product and unlock additional 10% off .</small>
                        <h5>Warranty</h5>
                        <small>This Product comes with 1 year warranty.</small>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}
