import React, { useState, useEffect } from "react";
import "./styles.css";
import { Badge, Avatar, Button, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { TiMessages } from "react-icons/ti";
import {
    MdOutlineNotificationsNone,
    MdAttachMoney,
    MdOutlineMoney,
} from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import userPic from "../../assets/images/user.jpg";
import { fetchCart } from "../../redux/cartSlice";
import CartItem from "../CartItem";

const AltSidebar = () => {
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);

    const [imageSrc, setImageSrc] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
    }, []);

    // FETCH THE PRODUCT IMAGE
    useEffect(() => {
        const fetchUserAvatar = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/user/${auth.user._id}/avatar`
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

            <div className="alt-sidebar-user-balance">
                <h2 className="alt-sidebar-user-balance-title">Your Balance</h2>

                <div className="alt-sidebar-user-balance-box">
                    <div className="alt-sidebar-user-balance-amount">
                        <h2>Balance</h2>
                        <h3>$12.00</h3>
                    </div>

                    <div className="alt-sidebar-user-balance-action">
                        <Button
                            size="small"
                            className="btn btn-white btn-icon"
                            icon={<MdAttachMoney size={18} />}
                        />
                        <p>Top Up</p>
                    </div>

                    <div className="alt-sidebar-user-balance-action">
                        <Button
                            size="small"
                            className="btn btn-white btn-icon"
                            icon={<MdOutlineMoney size={18} />}
                        />
                        <p>Transfer</p>
                    </div>
                </div>
            </div>

            <div className="alt-sidebar-user-address">
                <h2 className="alt-sidebar-user-address-title">
                    Your Billing Address
                </h2>

                <div className="alt-sidebar-user-address-name">
                    {/* <p>{auth.user.address}</p> */}
                    <Button type="small" className="btn btn-primary-alt" block>
                        Change Address
                    </Button>
                </div>
            </div>

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

            <Button size="large" className="btn btn-primary" block>
                Checkout
            </Button>
        </aside>
    );
};

export default AltSidebar;
