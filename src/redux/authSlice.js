import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: "",
    user: null,
    token: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.message = "";
        });

        builder.addCase(login.fulfilled, (state, action) => {
            const { error, userObject: user, token } = action.payload;

            state.loading = false;

            if (error) {
                state.message = error;
                return;
            }

            state.user = user;
            state.token = token;

            // Store the user details in local storage
            localStorage.setItem("user", JSON.stringify(user));

            // store the token in local storage
            localStorage.setItem("jwt", token);
        });

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.message =
                action.error.message === "Failed to fetch"
                    ? "Please check your internet connection."
                    : action.error.message;
        });
    },
});

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }) => {
        const response = await fetch("http://localhost:3000/user/login", {
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
    }
);

export default authSlice.reducer;
export const { setMessage } = authSlice.actions;
