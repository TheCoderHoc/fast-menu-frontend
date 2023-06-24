import React, { useEffect } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFavourites } from "../../redux/favourite.slice";
import MealItem from "../../layouts/MealItem";

const Favourites = () => {
    const { loading, message, favourites } = useSelector(
        (state) => state.favourite
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavourites());
    }, []);

    return (
        <div className="favourites">
            <h1 className="page-main-title">Your Favourites</h1>

            {loading ? (
                <p className="loading-favorites-text">
                    Please wait while we load your favourite meals...
                </p>
            ) : !favourites.items || favourites.items.length === 0 ? (
                <p className="empty-favourites-text">
                    You do not have any favourites meal. Go to the{" "}
                    <Link to="/dashboard/menu">menu page</Link> and add your
                    favourite meals.
                </p>
            ) : null}

            <div className="favourites-items">
                {favourites.items &&
                    favourites.items.length > 0 &&
                    favourites?.items?.map((item) => (
                        <MealItem key={item._id} product={item} />
                    ))}
            </div>
        </div>
    );
};

export default Favourites;
