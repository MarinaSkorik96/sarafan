import React from "react";
import './CommentsStyles.css'
import { useGetAllCommentsQuery, useGetPostCommentsQuery } from "../../query/posts";


const Comments = ({ post }) => {

  const { data, isLoading } = useGetPostCommentsQuery(post)

  return (
    <div className="comments" >
      {isLoading ? <p>Подождите, комментарии загружаются</p> : 
        data.map((comment) => {
            return (
              <div className="comment" key={comment.id}>
                <h4 className="comment_name">{comment.name}</h4>
                <p className="comment_email">{comment.email}</p>
                <p className="comment_body">{comment.body}</p>
              </div>
            )
        }) }
    </div>
  )
}
export default Comments;