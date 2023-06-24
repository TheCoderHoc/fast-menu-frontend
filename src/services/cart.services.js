import { API_URL } from "../constants/api";

export const fetchCartService = async () => {
    const response = await fetch(`${API_URL}/cart`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });

    return response.json();
};

export const addToCartService = async (productId) => {
    const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
            productId,
        }),
    });

    return response.json();
};

export const deleteCartItemService = async (productId) => {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });

    return response.json();
};

export const emptyCartService = async () => {
    const response = await fetch(`${API_URL}/cart`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });

    return response.json();
};
