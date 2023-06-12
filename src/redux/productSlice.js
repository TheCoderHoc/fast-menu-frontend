import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    messge: "",
    products: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = false;
        });

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = true;

            const { error, products } = action.payload;

            if (error) {
                state.messge = error;
                return;
            }

            state.message = "";
            state.products = products;
        });

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.messge = action.error.message;
            state.products = [];
        });
    },
});

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (filter) => {
        const response = await fetch(
            `http://localhost:3000/products?filter=${filter}`
        );
        return response.json();
    }
);

export default productSlice.reducer;
