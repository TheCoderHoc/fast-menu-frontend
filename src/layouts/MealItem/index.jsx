import React, { useState, useEffect } from "react";
import "./styles.css";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Rate, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { openDrawer } from "../../redux/UISlice";
import { toggleFavourite } from "../../redux/favouriteSlice";

const MealItem = ({ product }) => {
    const { _id, name, price, rating } = product;

    const [imageSrc, setImageSrc] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const UI = useSelector((state) => state.UI);
    const favourite = useSelector((state) => state.favourite);

    const isMealFav = favourite.favourites.items?.find(
        (item) => item._id === _id
    );

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

    let heartIconClassName = "";

    isMealFav ? (heartIconClassName = "meal-item-heart-icon") : "";

    return (
        <li className="meal-item">
            <header className="meal-item-header">
                <div className="meal-item-meta">
                    <p className="meal-item-sale">15% off</p>

                    {isMealFav ? (
                        <AiFillHeart
                            size={20}
                            color="red"
                            onClick={() => dispatch(toggleFavourite(_id))}
                            className={heartIconClassName}
                        />
                    ) : (
                        <AiFillHeart
                            size={20}
                            color="#bbb"
                            onClick={() => dispatch(toggleFavourite(_id))}
                        />
                    )}
                </div>

                {loading ? (
                    <Spin size="large">Loading</Spin>
                ) : (
                    <img
                        src={imageSrc}
                        alt={name}
                        className="meal-item-image"
                    />
                )}

                {error}
            </header>

            <main className="meal-item-body">
                <div className="meal-item-details">
                    <Rate defaultValue={rating} disabled />
                    <h3 className="meal-item-name">{name}</h3>
                    <p className="meal-item-price">
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

export default MealItem;
