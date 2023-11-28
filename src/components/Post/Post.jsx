import React from "react";
import './PostStyles.css'
import { useGetAllCommentsQuery } from "../../query/posts";
import { getTodos } from "../../api";
import { useEffect } from 'react';

const Post = () => {

  const { data, isLoading } = useGetAllCommentsQuery()
  // useEffect(() => {
  //   getTodos()
  //     .then((tracks) => {
  //       console.log(tracks)
  //       // dispatch(getAllTracks(tracks))
  //       // setTracks(tracks);
  //     })
  // }, [])



  // const { data } = useGetAllCommentsQuery()
  console.log(data)
  return (
    <>
      {isLoading ? null : data.map((post) => {
        return (
          <div key={post.id} className="post">
            <p className="post_author" >Leanne Graham</p>
            <h3 className="post_title">{post.title}</h3>
            <p className="post_text">{post.body}</p>
            <button className="post_button-comments">Комментарии</button>
          </div>
        )

      })}

    </>
  )
}
export default Post;