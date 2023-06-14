import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: "",
    cart: {},
};

const cartSlice = createSlice({
    name: "Cart",
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

            console.log(cart);

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
    },
});

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const response = await fetch("http://localhost:3000/cart", {
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
        const response = await fetch("http://localhost:3000/cart", {
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
            `http://localhost:3000/cart/${productId}`,
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

export default cartSlice.reducer;

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(fetchUserCart.pending, (state, action) => {
//             state.loading = true;
//         });

//         builder.addCase(fetchUserCart.fulfilled, (state, action) => {
//             state.loading = false;

//             const { error, cart } = action.payload;

//             if (error) {
//                 state.message = error;
//                 return;
//             }

//             state.message = "";
//             state.cart = cart;
//         });

//         builder.addCase(fetchUserCart.rejected, (state, action) => {
//             state.loading = false;
//             state.message = action.error.message;
//             state.cart = [];
//         });

//         //
//         builder.addCase(addUserCart.pending, (state, action) => {
//             state.loading = true;
//         });

//         builder.addCase(addUserCart.fulfilled, (state, action) => {
//             state.loading = false;

//             const { error, cartItem } = action.payload;

//             if (error) {
//                 state.message = error;
//                 return;
//             }

//             state.message = "";
//             state.cart.push(cartItem);
//         });

//         builder.addCase(addUserCart.rejected, (state, action) => {
//             state.loading = false;
//             state.message = action.error.message;
//         });
//     },
// });

// export const fetchUserCart = createAsyncThunk(
//     "cart/fetchUserCart",
//     async () => {
//         const response = await fetch(`http://localhost:3000/cart`, {
//             headers: {
//                 Authentication: `Bearer ${localStorage.getItem("jwt")}`,
//             },
//         });

//         return response.json();
//     }
// );

// export const addUserCart = createAsyncThunk(
//     "addUserCart",
//     async (productId) => {
//         const response = await fetch(
//             `http://localhost:3000/cart/${productId}`,
//             {
//                 method: "POST",
//                 headers: {
//                     Authentication: `Bearer ${localStorage.getItem("jwt")}`,
//                 },
//             }
//         );

//         return response.json();
//     }
// );
