import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchPopularProductsService,
    fetchProductsService,
} from "../services/product.services";

const initialState = {
    loading: false,
    messge: "",
    products: [],
    totalProducts: 0,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        // FETCH ALL AND FILTERED PRODUCTS
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = true;

            const { error, products, totalProducts } = action.payload;

            if (error) {
                state.messge = error;
                return;
            }

            state.message = "";
            state.products = products;
            state.totalProducts = totalProducts;
        });

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;

            state.messge = "Could not load meals. Please try again later.";

            console.log(action.error.message);
        });

        // FETCH ONLY POPULAR PRODUCTS
        builder.addCase(fetchPopularProducts.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchPopularProducts.fulfilled, (state, action) => {
            state.loading = false;

            const { error, products } = action.payload;

            if (error) {
                state.messge = error;

                return;
            }

            state.products = products;
        });

        builder.addCase(fetchPopularProducts.rejected, (state, action) => {
            state.loading = false;

            state.messge =
                "Could not load popular meals. Please try again later.";

            console.log(action.error.message);
        });
    },
});

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (queries) => {
        const response = fetchProductsService(queries);
        return response;
    }
);

export const fetchPopularProducts = createAsyncThunk(
    "product/fetchPopularProducts",
    async () => {
        const response = fetchPopularProductsService();
        return response;
    }
);

export default productSlice.reducer;
