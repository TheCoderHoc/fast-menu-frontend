import React from "react";
import "./styles.css";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Rate, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import { openDrawer } from "../../redux/UI.slice";
import { toggleFavourite } from "../../redux/favourite.slice";

const MealItem = ({ product }) => {
    const { _id, name, price, rating, image: imageSrc } = product;

    const favourite = useSelector((state) => state.favourite);

    const isMealFav = favourite.favourites.items?.find(
        (item) => item._id === _id
    );

    const dispatch = useDispatch();

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
                        />
                    ) : (
                        <AiFillHeart
                            size={20}
                            color="#bbb"
                            onClick={() => dispatch(toggleFavourite(_id))}
                        />
                    )}
                </div>

                <img src={imageSrc} alt={name} className="meal-item-image" />
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
