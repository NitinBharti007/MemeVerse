// store/memeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const memeSlice = createSlice({
  name: 'memes',
  initialState: [],
  reducers: {
    addMeme: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addMeme } = memeSlice.actions;
export default memeSlice.reducer;