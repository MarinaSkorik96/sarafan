import { createSlice, unwrapResult, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetAllUsersQuery } from "../../query/posts";
import { TbColumnInsertLeft } from "react-icons/tb";
import { current } from "@reduxjs/toolkit";
// import { getFreshToken } from "../../store/slices/user";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetFavoritesTracksQuery } from "../../query/tracks";

export const getDeletePost = createAsyncThunk(
  'posts/getDeletePost',
  async function (postToBeDeleted, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postToBeDeleted.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error('Cant delete task. Server error.');
      }
      dispatch(deletePost(postToBeDeleted));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const getChangePost = createAsyncThunk(
  'post/getCangePost',
  async function ({postToBeDeleted, index, title, text}, { rejectWithValue, dispatch }) {
    try {
      console.log(postToBeDeleted)
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postToBeDeleted.id}`, {
        method: "PATCH",
        body: JSON.stringify ({
          title: title,
          body: text,
          userId: 3,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      if (!response.ok) {
        throw new Error('Cant delete task. Server error.');
      }
      console.log(index)
      console.log(title)
      console.log(text)
    //  response = response.json()
      // ((json) => console.log(json));
      const data =  await response.json();
      console.log(data)
      dispatch(changePost({index, data}))
    } catch (error) {
      return rejectWithValue(error.message);

    }
  }
)

const initialState = {
  allPosts: [],
  favoritesPosts: [],
  allUsers: [],
  status: null,
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
      console.log(action.payload)
      state.allPosts = state.allPosts.filter((allPost) => allPost.id !== action.payload.id)
    },
    changePost (state, action) {
      const {index, data} = action.payload
      console.log(index)
      console.log(data)
      state.allPosts[index] = data
      // const {r} = action.payload
    }
  },
  extraReducers: {
    [getDeletePost.pending]: (state, action) => {
      state.status = "loading"
    },
    [getDeletePost.fulfilled]: (state, action) => {
      state.status = "resolved"
    },
    [getDeletePost.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }

});


export const { getAllPosts, currentUserToken, currentUser, allUsers, addPost, deletePost, changePost } = getPostsSlace.actions;

export default getPostsSlace.reducer;