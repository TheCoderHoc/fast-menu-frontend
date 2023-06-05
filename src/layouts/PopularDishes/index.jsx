import React from "react";
import "./styles.css";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Rate } from "antd";

const PopularDishes = ({ name, price, image, ratings }) => {
    return (
        <li className="popular-dishes-item">
            <header className="popular-dishes-item-header">
                <div className="popular-dishes-item-meta">
                    <p className="popular-dishes-item-sale">15% off</p>

                    <AiFillHeart size={19} color="#bbbb" />
                </div>
                <img
                    src={image}
                    alt={name}
                    className="popular-dishes-item-image"
                />
            </header>

            <main className="popular-dishes-item-body">
                <div className="popular-dishes-item-details">
                    <Rate defaultValue={ratings} disabled />
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
                />
            </main>
        </li>
    );
};

export default PopularDishes;
