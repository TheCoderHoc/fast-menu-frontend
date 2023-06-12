import React, { useState, useEffect } from "react";
import "./styles.css";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Rate, Spin } from "antd";
import { useDispatch } from "react-redux";

const PopularDish = ({ _id, name, price, rating }) => {
    const [imageSrc, setImageSrc] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

                setError("Could not fetch product image.");

                console.log(error.message);
            }
        };

        fetchProductImage();
    }, []);

    const handleAddToCart = () => {
        console.log("Added to cart");
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
