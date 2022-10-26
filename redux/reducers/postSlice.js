import { createSlice } from '@reduxjs/toolkit';
import uniqBy from 'lodash.uniqby';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        value: [],
    },
    reducers: {
        addPost: (state, action) => {
            state.value.unshift(action.payload);
        },
        addAllPost: (state, action) => {
            const newState = uniqBy([...action.payload, ...state.value], 'id');
            state.value = newState;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addPost, addAllPost } = postSlice.actions;
export const selectPost = (state) => state.post.value;
export default postSlice.reducer;
