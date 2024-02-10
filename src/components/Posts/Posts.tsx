import React from "react";
import Post from "../Post/Post";
import './PostsStyles.css'


const Posts : React.FC = () => {
  return (
    <div className="posts">
      <Post />
    </div>
  )
}
export default Posts;