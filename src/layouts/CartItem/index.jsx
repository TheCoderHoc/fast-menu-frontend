import React, { useState, useEffect } from "react";
import "./styles.css";
import { Spin } from "antd";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../../redux/cartSlice";

const CartItem = ({ _id, name, quantity, price }) => {
    const [imageSrc, setImageSrc] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    // FETCH THE CART ITEM FOOD IMAGE
    useEffect(() => {
        const fetchProductImage = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/products/${_id}/image`
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

        fetchProductImage();
    }, []);

    const handleDeleteCartItem = () => {
        dispatch(deleteCartItem(_id));
    };

    return (
        <div className="cart-item">
            <div>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <img
                        src={imageSrc}
                        alt={name}
                        className="cart-item-image"
                    />
                )}

                <div className="cart-item-name-quantity-container">
                    <h3 className="cart-item-name">{name}</h3>
                    <p className="cart-item-quantity">x{quantity}</p>
                </div>
            </div>
            <div>
                <p className="cart-item-price text-bold">
                    +<span className="text-primary">$</span>
                    {price}
                </p>
                <BsTrash
                    size={16}
                    color="red"
                    className="cart-item-trash-icon"
                    onClick={handleDeleteCartItem}
                />
            </div>
        </div>
    );
};

export default CartItem;
