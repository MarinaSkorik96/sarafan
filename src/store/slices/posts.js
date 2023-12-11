import { createSlice, unwrapResult, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetAllUsersQuery } from "../../query/posts";
import { TbColumnInsertLeft } from "react-icons/tb";
// import { getFreshToken } from "../../store/slices/user";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetFavoritesTracksQuery } from "../../query/tracks";

export const getDeletePost = createAsyncThunk(
  'user/getDeletePost',
  async function (postToBeDeleted) {
    // try {
    console.log(postToBeDeleted)
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postToBeDeleted.id}`, {
      method: "DELETE",
    });
    console.log(response)

    // if (!response.ok) {
    //   console.log(response)
    //   if (response.status === 400) {
    //     throw new Error(response.statusText);

    //   }
    //   console.log(response)
    //   throw new Error('Error server');
    // }
    console.log(postToBeDeleted)
    return postToBeDeleted

    // } catch (error) {
    //   console.log(error)
    //   return rejectWithValue(error.message)
    // }
  }
)

const initialState = {
  allPosts: [],
  favoritesPosts: [],
  allUsers: [],
};

const getPostsSlace = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getAllPosts(state, action) {
      // state.allPosts= [...action.payload].reverse()
      state.allPosts = action.payload
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
    },
    deletePost(state, action) {
      const { postToBeDeleted } = action.payload
      console.log(postToBeDeleted)
      state.allPosts = state.allPosts.filter((allPost) => allPost.id !== postToBeDeleted.id)
    }
  },
  extraReducers: {
    [getDeletePost.pending]: (action) => {
      console.log(action)
    },
    [getDeletePost.fulfilled]: (state, action) => {
      console.log(action.payload)
      const { postToBeDeleted } = action.payload
      console.log(postToBeDeleted)
      state.allPosts = state.allPosts.filter((allPost) => allPost.id !== action.payload.id)
    },
    [getDeletePost.rejected]: (state, action) => {
      console.log(action)
      // return action
    }
  }

});


export const { getAllPosts, currentUserToken, currentUser, allUsers, addPost, deletePost } = getPostsSlace.actions;

export default getPostsSlace.reducer;