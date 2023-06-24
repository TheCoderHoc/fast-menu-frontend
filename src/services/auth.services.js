import { API_URL } from "../constants/api";

export const loginService = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.json();
};

export const logoutService = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });

    return response.json();
};

export const updateUserInfoService = async (newUserInfo) => {
    const response = await fetch(`${API_URL}/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(newUserInfo),
    });

    return response.json();
};
