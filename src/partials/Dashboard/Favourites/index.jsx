import React, { useEffect } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFavourites } from "../../../redux/favouriteSlice";
import MealItem from "../../../layouts/MealItem";

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
            <h1 className="favourites-title">Your Favourites</h1>

            {loading && (
                <div className="favourites-loading">
                    <h2 className="favourites-loading-title">
                        Loading your favourite meals...
                    </h2>
                </div>
            )}

            {favourites?.items?.length === 0 && (
                <div className="favourites-empty">
                    <p>
                        You do not have any favourites meal. Go to the{" "}
                        <Link to="/user/dashboard/menu">menu page</Link> and add
                        your favourite meals.
                    </p>
                </div>
            )}

            <div className="favourites-items">
                {favourites?.items?.map((item) => (
                    <MealItem key={item._id} product={item} favourite={true} />
                ))}
            </div>
        </div>
    );
};

export default Favourites;
