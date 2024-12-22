import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../types/profile";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";


export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    "profile/updateProfileData",
    async (_, thunkAPI) => {
        const {extra, rejectWithValue, getState } = thunkAPI
        const formData = getProfileForm(getState())
        console.log(formData)
        try {
            const response = await extra.api.put<Profile>("/profile", formData);
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue("error")
        }
    }
)

