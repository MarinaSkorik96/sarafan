import { createSlice, unwrapResult, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetAllUsersQuery } from "../../query/posts";
import { TbColumnInsertLeft } from "react-icons/tb";
import { current } from "@reduxjs/toolkit";
// import { getFreshToken } from "../../store/slices/user";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetFavoritesTracksQuery } from "../../query/tracks";

export const getAddNewPost = createAsyncThunk(
  'posts/getAddNewPost',
  async function ({ title, text, userId }, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: text,
          userId: userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      if (!response.ok) {
        throw new Error('Cant delete task. Server error.');
      }

      const data = await response.json();
      console.log(data)
      dispatch(addPost(data))

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

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
  async function ({ postToBeDeleted, index, title, text, userId }, { rejectWithValue, dispatch }) {
    // console.log(changedUser )
    // let id = initialState.allUsers.find((user) => user.name === changedUser).id
    // console.log(id)
    console.log(initialState.allUsers)
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postToBeDeleted.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: title,
          body: text,
          userId: userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      if (!response.ok) {
        throw new Error('Cant delete task. Server error.');
      }
      const data = await response.json();
      dispatch(changePost({ index, data }))
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

const initialState = {
  allPosts: [],
  favoritesPosts: [],
  allUsers: [],
  userId: null,
  status: null,
  likedPosts: [],
  filteredPosts: [],
  filterTitle: "",
  filterAuthorsArr: [],
  filterLikes: '',
  filterSort: '',
  filtersActive: false,
};

const getPostsSlace = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getAllPosts(state, action) {
      // state.allPosts= [...action.payload].reverse()
      state.allPosts = action.payload
    },
    currentUserId(state, action) {
      state.userId = state.allUsers.find((user) => user.name === action.payload).id
    },
    currentUser(state, action) {

    },
    getLikedPosts(state, action) {
      state.likedPosts = action.payload
    },
    getAllUsers(state, actions) {
      state.allUsers = actions.payload
    },
    addPost(state, action) {
      state.allPosts = [action.payload, ...state.allPosts]
    },
    deletePost(state, action) {
      console.log(action.payload)
      state.allPosts = state.allPosts.filter((allPost) => allPost.id !== action.payload.id)
    },
    changePost(state, action) {
      const { index, data } = action.payload
      console.log(index)
      console.log(data)
      state.allPosts[index] = data
      // const {r} = action.payload
    },
    getFilter(state, action) {
      const { filterTitle, filterAuthorsArr, filterLikes, filterSort } = action.payload
      let filteredPosts = state.allPosts
      state.filterTitle = filterTitle
      state.filterAuthorsArr = filterAuthorsArr
      state.filterLikes = filterLikes
      state.filterSort = filterSort

      if (filterTitle) {
        if (state.filterTitle.length > 0) {
          state.filtersActive = true;
          filteredPosts = filteredPosts.filter((post) =>
            post.title.toLocaleLowerCase().includes(state.filterTitle.toLocaleLowerCase())
          )
        } else if (state.filterTitle.length === 0) {
          filteredPosts = filteredPosts
        }
      }

      if (state.filterAuthorsArr && state.filterAuthorsArr.length > 0) {
        state.filtersActive = true;
        filteredPosts = filteredPosts.filter((post) =>
          state.filterAuthorsArr.includes(post.userId)
        );
      }

      if (state.filterLikes) {
        if (state.filterLikes === 'С лайком') {
          state.filtersActive = true;
          filteredPosts = filteredPosts.filter((post) =>
            state.likedPosts.includes(post.id))
        } else if (state.filterLikes === 'Без лайка') {
          state.filtersActive = true;
          filteredPosts = filteredPosts.filter((post) =>
            !state.likedPosts.includes(post.id)
          )
        }
      }

      if (state.filterSort && state.filterSort !== '') {

        if (state.filterSort === 'Сначала первые') {
          filteredPosts = filteredPosts.sort((a, b) => a.id - b.id)
        } else if (state.filterSort === 'Сначала последние') {
          filteredPosts = filteredPosts.sort((a, b) => b.id - a.id)
        } else if (state.filterSort === 'По имени автора A-Z') {

        } else if (state.filterSort === 'По имени автора Z-A') {

        } else if (state.filterSort === 'По названию A-Z') {
          filteredPosts = filteredPosts.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
              return -1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        } else if (state.filterSort === 'По названию Z-A') {
          filteredPosts = filteredPosts.sort((a, b) => {
            if (b.title.toLowerCase() < a.title.toLowerCase()) {
              return -1;
            }
            if (b.title.toLowerCase() > a.title.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        } else if (state.filterSort === 'Избранные сначала') {
          state.filtersActive = true;

          let postsWithLikes = filteredPosts.filter((post) =>
            state.likedPosts.includes(post.id))
          let postsWithoutLikes = filteredPosts.filter((post) =>
            !state.likedPosts.includes(post.id))
          filteredPosts = [...postsWithLikes, ...postsWithoutLikes]
        } else if (state.filterSort === 'Избранные в конце') {
          state.filtersActive = true;

          let postsWithLikes = filteredPosts.filter((post) =>
            state.likedPosts.includes(post.id))
          let postsWithoutLikes = filteredPosts.filter((post) =>
            !state.likedPosts.includes(post.id))
          filteredPosts = [...postsWithoutLikes, ...postsWithLikes]

        }
      }



      state.filteredPosts = filteredPosts
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
    },
    [getChangePost.pending]: (state, action) => {
      state.status = "loading"
    },
    [getChangePost.fulfilled]: (state, action) => {
      state.status = "resolved"
    },
    [getChangePost.rejected]: (state, action) => {
      state.status = 'rejected';
      console.log(action.payload)
      state.error = action.payload;
    },
    [getAddNewPost.pending]: (state, action) => {
      state.status = "loading"
    },
    [getAddNewPost.fulfilled]: (state, action) => {
      state.status = "resolved"
    },
    [getAddNewPost.rejected]: (state, action) => {
      state.status = 'rejected';
      console.log(action.payload)
      state.error = action.payload;
    }
  }

});


export const { getAllPosts, currentUserId, currentUser, getLikedPosts, getAllUsers, addPost, deletePost, changePost, getFilter } = getPostsSlace.actions;

export default getPostsSlace.reducer;