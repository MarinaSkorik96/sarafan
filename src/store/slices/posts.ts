import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost, IUser } from "../../models/models";

interface  InitialState {
  openPost: IPost | null,
  allUsers: IUser[],
}
const initialState : InitialState = {
  openPost: null,
  allUsers: [],
};

const getPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getOpenPost(state, action: PayloadAction<IPost>) {
      state.openPost = action.payload
    },
    getAllUsers(state, action: PayloadAction<IUser[]>) {
      state.allUsers = action.payload
    }
  }
});

export const {
  getOpenPost,
  getAllUsers
} = getPostsSlice.actions;

// export const postsActions = getPostsSlice.actions 
export default getPostsSlice.reducer
// export const {
//   getOpenPost
// } = getPostsSlace.actions;

// export default getPostsSlace.reducer;