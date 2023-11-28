import React from "react";
import './CommentsStyles.css'
import { useGetAllCommentsQuery } from "../../query/posts";


const Comments = ({post}) => {
  console.log(post)

  const {data} = useGetAllCommentsQuery()
  // console.log(data)

  return (
    <div className="comments">

    </div>
  )
}
export default Comments;