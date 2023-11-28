import React from "react";
import './CommentsStyles.css'
import { useGetAllCommentsQuery } from "../../query/posts";


const Comments = ({ post }) => {
  // console.log(post)

  const { data, isLoading } = useGetAllCommentsQuery()
  // console.log(data)


  return (
    <div className="comments" >
      {isLoading ? null : data.map((comment) => {
        if (comment.postId === post.id) {
          return (
            <div className="comment">
              <div className="comment_name">{comment.name}</div>
              <div className="comment_email">{comment.email}</div>
              <div className="comment_body">{comment.body}</div>
            </div>
          )
        }
      })}
    </div>
  )
}
export default Comments;