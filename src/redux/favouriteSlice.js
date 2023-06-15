import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: "",
    favourites: {},
};

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchFavourites.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchFavourites.fulfilled, (state, action) => {
            state.loading = false;

            const { error, favourite } = action.payload;

            if (error) {
                state.message = error;
                return;
            }

            state.favourites = { ...favourite };
        });

        builder.addCase(fetchFavourites.rejected, (state, action) => {
            state.loading = false;

            state.message = "There was an error loading your favourite meals.";

            console.log(action.error.message);
        });

        // TOGGLE FAVOURITE MEAL
        builder.addCase(toggleFavourite.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(toggleFavourite.fulfilled, (state, action) => {
            state.loading = false;

            const { error, favourite } = action.payload;

            if (error) {
                state.message = error;
                return;
            }

            state.favourites = { ...favourite };
        });

        builder.addCase(toggleFavourite.rejected, (state, action) => {
            state.loading = false;

            state.message = "We encountered an error. Please try again later!";

            console.log(action.error.message);
        });
    },
});

export const fetchFavourites = createAsyncThunk(
    "favourite/fetchFavourites",
    async () => {
        const response = await fetch("http://localhost:3000/favourites", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });

        return response.json();
    }
);

export const toggleFavourite = createAsyncThunk(
    "favourite/toggleFavourites",
    async (mealId) => {
        const response = await fetch(
            `http://localhost:3000/favourites/${mealId}`,
            {
                method: "POST",

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );

        return response.json();
    }
);

export default favouriteSlice.reducer;
