import React, { useEffect } from "react";
import "./styles.css";
import { Badge, Avatar, Button, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { fetchCart } from "../../redux/cart.slice";
import CartItem from "../CartItem";
import useFetchImage from "../../hooks/useFetchImage";
import { API_URL } from "../../constants/api";

const AltSidebar = () => {
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCart());
    }, []);

    const [loading, error, imageSrc] = useFetchImage(
        `${API_URL}/user/${auth.user._id}/avatar`,
        auth.user
    );

    const address = auth.user.address || {};

    const noAddress = Object.values(address).every(
        (addressInfo) => addressInfo === "" || addressInfo === null
    );

    return (
        <aside className="alt-sidebar">
            <div className="alt-sidebar-top-content">
                <div className="alt-sidebar-top-content-left">
                    <Badge dot color="var(--primary-color)">
                        <Link to="/dashboard/messages" className="icon-link">
                            <TiMessages size={18} />
                        </Link>
                    </Badge>

                    <Badge dot color="var(--primary-color)">
                        <Link
                            to="/dashboard/notifications"
                            className="icon-link"
                        >
                            <MdOutlineNotificationsNone size={18} />
                        </Link>
                    </Badge>

                    <Link to="/dashboard/account" className="icon-link">
                        <AiFillSetting size={18} />
                    </Link>
                </div>

                <div className="alt-sidebar-top-content-right">
                    <Link to="/dashboard/account">
                        <Avatar
                            size="large"
                            src={imageSrc}
                            alt="Profile picture of user"
                        />
                    </Link>
                </div>
            </div>

            <Divider />

            <div className="alt-sidebar-user-address">
                <h2 className="alt-sidebar-user-address-title">
                    Your Delivery Address
                </h2>

                <div className="alt-sidebar-user-address-name">
                    {noAddress ? (
                        <p>You have not added an address to your account.</p>
                    ) : (
                        <p>
                            {address.street}, {address.city}, {address.state}.
                        </p>
                    )}

                    <Link
                        to="/dashboard/account"
                        className="btn btn-primary-alt"
                    >
                        {noAddress ? "Add Your Address" : "Change Your Address"}
                    </Link>
                </div>
            </div>

            <Divider />

            <div className="alt-sidebar-order-menu">
                <h2 className="alt-sidebar-order-menu-title">Your Meal Cart</h2>

                {!cart.cart?.products || cart.cart?.products?.length === 0 ? (
                    <p className="empty-cart">
                        You do not have any meals in your cart.
                    </p>
                ) : (
                    cart.cart?.products?.map((cartItem) => (
                        <CartItem key={cartItem._id} {...cartItem} />
                    ))
                )}
            </div>

            {cart.cart?.products && cart.cart?.products?.length > 0 && (
                <>
                    <Divider style={{ borderColor: "var(--gray-color)" }} />

                    <div className="alt-sidebar-total-quantity">
                        <h3>Total Quantity: </h3>
                        <p>{cart.cart.totalQuantity}</p>
                    </div>

                    <div className="alt-sidebar-total-price">
                        <h3>Total Price:</h3>
                        <p>
                            <span className="text-primary">$</span>{" "}
                            {cart.cart?.totalPrice}
                        </p>
                    </div>

                    <Button
                        size="large"
                        className="btn btn-primary"
                        block
                        onClick={() => navigate("/checkout")}
                    >
                        Checkout
                    </Button>
                </>
            )}
        </aside>
    );
};

export default AltSidebar;
