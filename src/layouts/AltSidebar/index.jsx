import React, { useState, useEffect } from "react";
import "./styles.css";
import { Badge, Avatar, Button, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import {
    MdOutlineNotificationsNone,
    MdAttachMoney,
    MdOutlineMoney,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { fetchCart } from "../../redux/cartSlice";
import CartItem from "../CartItem";

const AltSidebar = () => {
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);

    const [imageSrc, setImageSrc] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCart());
    }, []);

    // FETCH THE PRODUCT IMAGE
    useEffect(() => {
        const fetchUserAvatar = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}user/${
                        auth.user._id
                    }/avatar`
                );

                const blob = await response.blob();

                const imageUrl = URL.createObjectURL(blob);

                setImageSrc(imageUrl);

                setLoading(false);

                setError("");
            } catch (error) {
                setLoading(false);

                setError("Could not fetch image.");

                console.log(error.message);
            }
        };

        fetchUserAvatar();
    }, [auth.user]);

    const address = auth.user.address;

    return (
        <aside className="alt-sidebar">
            <div className="alt-sidebar-top-content">
                <div className="alt-sidebar-top-content-left">
                    <Badge dot color="var(--primary-color)">
                        <TiMessages size={18} />
                    </Badge>
                    <Badge dot color="var(--primary-color)">
                        <MdOutlineNotificationsNone size={18} />
                    </Badge>
                    <AiFillSetting size={18} />
                </div>

                <div className="alt-sidebar-top-content-right">
                    <Avatar
                        size="large"
                        src={imageSrc}
                        alt="Profile picture of user"
                    />
                </div>
            </div>

            <Divider />

            <div className="alt-sidebar-user-address">
                <h2 className="alt-sidebar-user-address-title">
                    Your Delivery Address
                </h2>

                <div className="alt-sidebar-user-address-name">
                    {auth.user.address ? (
                        <p>
                            {auth.user.address.street}, {auth.user.address.city}
                            , {auth.user.address.state}
                        </p>
                    ) : (
                        <p>You have not added an address.</p>
                    )}

                    <Link
                        to="/user/dashboard/account"
                        className="btn btn-primary-alt"
                    >
                        {address ? "Change Address" : "Add Your Address"}
                    </Link>
                </div>
            </div>

            <Divider />

            <div className="alt-sidebar-order-menu">
                <h2 className="alt-sidebar-order-menu-title">
                    Your Order Menu
                </h2>

                <div className="alt-sidebar-cart-loading">
                    {cart.loading ? (
                        <p>Loading...</p>
                    ) : cart.message ? (
                        <p>{cart.message}</p>
                    ) : null}
                </div>

                {cart.cart?.products?.map((cartItem) => (
                    <CartItem key={cartItem._id} {...cartItem} />
                ))}

                {cart.cart?.products?.length === 0 && (
                    <p>You do not have any items in your order.</p>
                )}
            </div>

            <Divider style={{ borderColor: "var(--gray-color)" }} />

            {cart.cart?.products?.length > 0 && (
                <div className="alt-sidebar-total-quantity">
                    <h3>Total Quantity: </h3>

                    <p>{cart.cart.totalQuantity}</p>
                </div>
            )}

            {cart.cart?.products?.length > 0 && (
                <div className="alt-sidebar-total-price">
                    <h3>Total Price:</h3>
                    <p>
                        <span className="text-primary">$</span>{" "}
                        {cart.cart?.totalPrice}
                    </p>
                </div>
            )}

            <Button
                size="large"
                className="btn btn-primary"
                block
                onClick={() => navigate("/checkout")}
            >
                Checkout
            </Button>
        </aside>
    );
};

export default AltSidebar;
