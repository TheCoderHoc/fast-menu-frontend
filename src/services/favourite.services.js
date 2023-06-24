import { API_URL } from "../constants/api";

export const fetchFavouritesService = async () => {
    const response = await fetch(`${API_URL}/favourites`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });

    return response.json();
};

export const toggleFavouriteService = async (mealId) => {
    const response = await fetch(`${API_URL}/favourites/${mealId}`, {
        method: "POST",

        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });

    return response.json();
};
