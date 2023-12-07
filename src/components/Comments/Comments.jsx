import React from "react";
import './CommentsStyles.css'
import { useGetAllCommentsQuery } from "../../query/posts";


const Comments = ({ post }) => {
  // console.log(post)

  const { data, isLoading } = useGetAllCommentsQuery()
  // console.log(data)


  return (
    <div className="comments" >
      {isLoading ? <p>Подождите, комментарии загружаются</p> : data.map((comment) => {
        if (comment.postId === post.id) {
          return (
            <div className="comment" key={comment.id}>
              <h4 className="comment_name">{comment.name}</h4>
              <p className="comment_email">{comment.email}</p>
              <p className="comment_body">{comment.body}</p>
            </div>
          )
        }
      })}
    </div>
  )
}
export default Comments;