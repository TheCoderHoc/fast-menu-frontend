import { API_URL } from "../constants/api";

export const fetchProductsService = async ({
    filter,
    sortBy,
    order,
    category,
    page,
    limit,
    search,
}) => {
    const response = await fetch(
        `${API_URL}/products?filter=${filter}&sortBy=${sortBy}&order=${order}&category=${category}&page=${page}&limit=${limit}&search=${search}`
    );

    return response.json();
};

export const fetchPopularProductsService = async () => {
    const response = await fetch(`${API_URL}/products/popular`);

    return response.json();
};
