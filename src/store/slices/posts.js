import { createSlice } from "@reduxjs/toolkit";
// import { getFreshToken } from "../../store/slices/user";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetFavoritesTracksQuery } from "../../query/tracks";


const initialState = {
  allPosts: [],
  favoritesPosts: [],
};

const getPostsSlace = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    currentUserToken(state, action) {
    },
    currentUser(state, action) {
    }
  },

});


export const { currentUserToken, currentUser } = getPostsSlace.actions;

export default getPostsSlace.reducer;