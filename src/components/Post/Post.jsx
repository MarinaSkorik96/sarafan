import React, { useState } from "react";
import './PostStyles.css'
import { useGetAllPostsQuery, useGetAllUsersQuery, useGetAllCommentsQuery } from "../../query/posts";
import { getTodos } from "../../api";
import { useEffect } from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Comments from "../Comments/Comments";

const Post = () => {
  const [postCommentsOn, setPostCommentsOn] = useState([])


  const { data, isLoading } = useGetAllPostsQuery();
  const { currentData } = useGetAllUsersQuery();
  useEffect(() => {
    console.log(postCommentsOn)

  }, [postCommentsOn])

  return (
    <>
      {isLoading ? null : data.map((post) => {
        return (
          <>
            <div className={postCommentsOn.includes(post.id)? "postD" : "post"}>
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
              <div className="post_block">
                <div key={post.id} className="post_main">
                  <div className="post_header">
                    {currentData && <p className="post_author">
                      {currentData.find(user => user.id === post.userId).name}
                    </p>}
                    <h3 className="post_title">{post.title}</h3>
                    <p className="post_text">{post.body}</p>
                  </div>
                  <button className="post_button-comments" onClick={() => {
                    if (postCommentsOn.includes(post.id)) {
                      let postId = post.id
                      setPostCommentsOn(postCommentsOn.filter((post) => post !== postId))
                    } else {
                      setPostCommentsOn([...postCommentsOn, post.id])
                    }
                  }}>
                    {postCommentsOn.includes(post.id) ? <span>Скрыть комментарии</span> : <span>Комментарии</span>}
                  </button>
                </div>
                {postCommentsOn.includes(post.id) ? <Comments post={post} /> : null}


              </div>
            </div>
          </>
        )

      })}

    </>
  )
}
export default Post;