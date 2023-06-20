import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: "",
    cart: {},
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        // FETCH USER CART ITEMS
        builder.addCase(fetchCart.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;

            const { error, cart } = action.payload;

            if (error) {
                state.message = error;
                return;
            }

            state.cart = { ...cart };
        });

        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = true;
            state.message = "Could not fetch cart. Please try again.";
        });

        // ADD TO CART
        builder.addCase(addToCart.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;

            const { error, cart } = action.payload;

            if (error) {
                state.message = error;
                return;
            }

            state.cart = { ...cart };
        });

        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = false;

            state.message = "There was an error adding this food to your menu.";
        });

        // DELETE CART ITEM
        builder.addCase(deleteCartItem.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            state.loading = false;

            const { error, cart } = action.payload;

            if (error) {
                state.message = error;
                return;
            }

            state.cart = { ...cart };
        });

        builder.addCase(deleteCartItem.rejected, (state, action) => {
            state.loading = false;

            state.message =
                "An error occurred while deleting this item from your cart. Please try again later!";
        });

        // EMPTY CART
        builder.addCase(emptyCart.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(emptyCart.fulfilled, (state, action) => {
            state.loading = false;

            const { error, cart } = action.payload;

            if (error) {
                state.message = error;
                return;
            }

            state.cart = { ...cart };
        });

        builder.addCase(emptyCart.rejected, (state, action) => {
            state.loading = false;

            state.message =
                "An error occurred while emptying your cart. Please try again later!";
        });
    },
});

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}cart`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });

    return response.json();
});

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (productId) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}cart`, {
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
    }
);

export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async (productId) => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}cart/${productId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );

        return response.json();
    }
);

export const emptyCart = createAsyncThunk("cart/emptyCart", async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}cart/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    });

    return response.json();
});

export default cartSlice.reducer;
