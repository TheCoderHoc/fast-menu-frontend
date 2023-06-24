import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    loginService,
    logoutService,
    updateUserInfoService,
} from "../services/auth.services";

const initialState = {
    loading: false,
    message: "",
    user: null,
    token: "",
    isUserUpdated: false,
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

            if (action.payload.token) {
                state.token = action.payload?.token;
            }
        },

        setIsUserUpdated: (state, action) => {
            state.isUserUpdated = false;
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
                    ? "There was an error logging into your account. Please try again later."
                    : action.error.message;
        });

        // UPDATE USER INFORMATION
        builder.addCase(updateUserInfo.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.loading = false;

            const { error, updatedUser } = action.payload;

            if (error) {
                state.message = error;
                return;
            }

            state.message = "Your account details have been updated.";
            state.user = updatedUser;
            state.isUserUpdated = true;

            // Store the updated user details in local storage
            localStorage.setItem("user", JSON.stringify(updatedUser));
        });

        builder.addCase(updateUserInfo.rejected, (state, action) => {
            state.loading = false;

            state.message = "We encountered an error. Please try again!";

            console.log(action.error.message);
        });

        // LOG OUT USER
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;

            const { error } = action.payload;

            if (error) {
                state.message = error;
                return;
            }

            state.user = null;
            state.token = "";

            localStorage.removeItem("user");
            localStorage.removeItem("jwt");
        });

        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;

            state.message = "There was an error logging you out.";

            console.log(action.error.message);
        });
    },
});

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }) => {
        const response = loginService(email, password);
        return response;
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    const response = logoutService();
    return response;
});

export const updateUserInfo = createAsyncThunk(
    "auth/updateUserInfo",
    async (newUserInfo) => {
        const response = updateUserInfoService(newUserInfo);
        return response;
    }
);

export default authSlice.reducer;
export const { setMessage, setUser, setIsUserUpdated, setUserAvatar } =
    authSlice.actions;
