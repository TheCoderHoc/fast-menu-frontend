import React, { useState, useEffect } from "react";
import "./styles.css";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Rate, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { openDrawer } from "../../redux/UISlice";

const PopularDish = ({ product }) => {
    const { _id, name, price, rating } = product;

    const [imageSrc, setImageSrc] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const UI = useSelector((state) => state.UI);

    const dispatch = useDispatch();

    // FETCH THE PRODUCT IMAGE
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

    const handleAddToCart = () => {
        dispatch(addToCart(_id));

        dispatch(openDrawer());
    };

    return (
        <li className="popular-dishes-item">
            <header className="popular-dishes-item-header">
                <div className="popular-dishes-item-meta">
                    <p className="popular-dishes-item-sale">15% off</p>

                    <AiFillHeart size={19} color="#bbbb" />
                </div>

                {loading ? (
                    <Spin size="large">Loading</Spin>
                ) : (
                    <img
                        src={imageSrc}
                        alt={name}
                        className="popular-dishes-item-image"
                    />
                )}

                {error}
            </header>

            <main className="popular-dishes-item-body">
                <div className="popular-dishes-item-details">
                    <Rate defaultValue={rating} disabled />
                    <h3 className="popular-dishes-item-name">{name}</h3>
                    <p className="popular-dishes-item-price">
                        <span className="text-primary">$</span>
                        {price}
                    </p>
                </div>
                <Button
                    size="small"
                    className="btn btn-primary btn-icon"
                    icon={<AiOutlinePlus size={19} />}
                    onClick={handleAddToCart}
                />
            </main>
        </li>
    );
};

export default PopularDish;
