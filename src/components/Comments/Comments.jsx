import React from "react";
import './CommentsStyles.css'
import { useGetPostCommentsQuery } from "../../query/posts";


const Comments = ({ post }) => {

  const { data, isLoading, isError } = useGetPostCommentsQuery(post)

  return (
    <div className="comments" >
      {isError ? <p>Не удалось загрузить комментарии</p> :
        isLoading ? <p>Подождите, комментарии загружаются</p> :
          data.length == 0 ? <p>Пока нет ни одного комментария</p> :
            data.map((comment) => {
              return (
                <div className="comment" key={comment.id}>
                  <h4 className="comment_name">{comment.name}</h4>
                  <p className="comment_email">{comment.email}</p>
                  <p className="comment_body">{comment.body}</p>
                </div>
              )
            })}
      {/* {isError ? null : } */}
    </div>
  )
}
export default Comments;