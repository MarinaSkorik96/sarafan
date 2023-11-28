import React from "react";
import './PostStyles.css'
import { useGetAllCommentsQuery } from "../../query/posts";
import { getTodos } from "../../api";
import { useEffect } from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

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
          <div className="post">
            <div className="post_side-bar">
              <div className="post_side-like">
                <IoMdHeartEmpty />
              </div>
              <div className="post_side-like">
                <MdDeleteOutline />
              </div>
              <div className="post_side-like">
                <MdOutlineEdit />
              </div>

            </div>
            <div key={post.id} className="post_main">
              <div className="post_header">
                <p className="post_author" >Leanne Graham</p>
                <h3 className="post_title">{post.title}</h3>
                <p className="post_text">{post.body}</p>
              </div>
              <button className="post_button-comments">Комментарии</button>
            </div>

          </div>
        )

      })}

    </>
  )
}
export default Post;