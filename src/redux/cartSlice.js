import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: "",
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUserCart.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchUserCart.fulfilled, (state, action) => {
            state.loading = false;

            const { error, cart } = action.payload;

            if (error) {
                state.message = error;
                return;
            }

            state.message = "";
            state.cart = cart;
        });

        builder.addCase(fetchUserCart.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message;
            state.cart = [];
        });

        //
        builder.addCase(addUserCart.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(addUserCart.fulfilled, (state, action) => {
            state.loading = false;

            const { error, cartItem } = action.payload;

            if (error) {
                state.message = error;
                return;
            }

            state.message = "";
            state.cart.push(cartItem);
        });

        builder.addCase(addUserCart.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message;
        });
    },
});

export const fetchUserCart = createAsyncThunk(
    "cart/fetchUserCart",
    async () => {
        const response = await fetch(`http://localhost:3000/cart`, {
            headers: {
                Authentication: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        return response.json();
    }
);

export const addUserCart = createAsyncThunk(
    "addUserCart",
    async (productId) => {
        const response = await fetch(
            `http://localhost:3000/cart/${productId}`,
            {
                method: "POST",
                headers: {
                    Authentication: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );

        return response.json();
    }
);

export default cartSlice.reducer;
