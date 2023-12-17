import React from "react";
import Post from "../Post/Post";
import './PostsStyles.css'


const Posts = ({numbersOfPosts}) => {
  return (
    <div className="posts">
      <Post numbersOfPosts={numbersOfPosts} />
    </div>
  )
}
export default Posts;