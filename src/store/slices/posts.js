import { createSlice } from "@reduxjs/toolkit";
import { useGetAllUsersQuery } from "../../query/posts";
// import { getFreshToken } from "../../store/slices/user";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetFavoritesTracksQuery } from "../../query/tracks";


const initialState = {
  allPosts: [],
  favoritesPosts: [],
  allUsers: [],
};

const getPostsSlace = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getAllPosts(state, action){
      // state.allPosts= [...action.payload].reverse()
      state.allPosts= action.payload
    },
    currentUserToken(state, action) {

    },
    currentUser(state, action) {

    },
    allUsers(state, actions) {
      state.allUsers = actions.payload
    },
    addPost(state, action) {
      state.allPosts = [action.payload, ...state.allPosts]
    }
  },

});


export const {  getAllPosts, currentUserToken, currentUser, allUsers, addPost } = getPostsSlace.actions;

export default getPostsSlace.reducer;