import { createSlice } from "@reduxjs/toolkit";

const weddingSlice = createSlice({
  name: "wedding",
  initialState: {
    targetDate: "2027-01-16T10:45:00",
    isAudioPlaying: false,
    venue: "Corniche Convention Centre, Thriprayar",
  },
  reducers: {
    setAudioPlaying: (state, action) => {
      state.isAudioPlaying = action.payload;
    },
  },
});

export const { setAudioPlaying } = weddingSlice.actions;
export default weddingSlice.reducer;