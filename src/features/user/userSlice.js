import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://randomuser.me/api/?results=50";

const localStorageKey = "cachedUsers";

const initialState = {
  users: [],
  isLoading: true,
};

// export const getUsers = createAsyncThunk(
//   "users/getUsers",
//   async (name, thunkAPI) => {
//     try {
//       const resp = await axios(url);
//       console.log(resp.data);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("something went wrong");
//     }
//   }
// );

// export const getUsers = createAsyncThunk(
//   "users/getUsers",
//   async (_, thunkAPI) => {
//     try {
//       const resp = await axios(url);
//       const userData = resp.data;

//       // Store the fetched data in local storage
//       localStorage.setItem(localStorageKey, JSON.stringify(userData));

//       return userData;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Something went wrong");
//     }
//   }
// );

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      // Check if data is in local storage
      const storedUsers = localStorage.getItem(localStorageKey);
      if (storedUsers) {
        // Parse and return the data from local storage
        return JSON.parse(storedUsers);
      } else {
        // If not in local storage, fetch new users from the API
        const resp = await axios(url);
        const userData = resp.data;
        // Store the fetched data in local storage
        localStorage.setItem(localStorageKey, JSON.stringify(userData));
        return userData;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
