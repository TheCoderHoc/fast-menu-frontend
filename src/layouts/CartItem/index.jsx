import React from "react";
import "./styles.css";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../../redux/cart.slice";

const CartItem = ({ _id, name, quantity, image: imageSrc, price }) => {
    const dispatch = useDispatch();

    const handleDeleteCartItem = () => {
        dispatch(deleteCartItem(_id));
    };

    return (
        <div className="cart-item">
            <div>
                <img src={imageSrc} alt={name} className="cart-item-image" />

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
