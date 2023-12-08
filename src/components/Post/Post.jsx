import React, { useState } from "react";
import './PostStyles.css'
import { useGetAllPostsQuery, useGetAllUsersQuery, useGetAllCommentsQuery } from "../../query/posts";
import { getTodos } from "../../api";
import { useEffect } from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Comments from "../Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, allUsers, getAllPosts } from "../../store/slices/posts";

const Post = () => {
  const dispatch = useDispatch();
  const [postCommentsOn, setPostCommentsOn] = useState([])
  const numbersOfPostsDef = localStorage.getItem('quantity') ? localStorage.getItem('quantity') : 10;
  const [numbersOfPosts, setNumbersOfPosts] = useState(numbersOfPostsDef)
  const allPosts = useSelector(store => store.posts.allPosts)


  const { data: postsData, isLoading: postsLoading } = useGetAllPostsQuery(numbersOfPosts);
  const { data: users } = useGetAllUsersQuery();
  // console.log(currentData)
  // console.log(allPosts)
  // console.log(postsData)

  const saveNumberOfPosts = (n) => {
    setNumbersOfPosts(n)
    localStorage.setItem('quantity', n);
  }
  useEffect(() => {
    dispatch(allUsers(users))
  }, [users])
  useEffect(() => {
    if (postsData) {
      dispatch(getAllPosts(postsData))
    }
  }, [postsData])

  return (

    <>
      <>

        {postsLoading ? <p>Подождите, посты загружаются...</p> : allPosts.map((post) => {
          return (
            <>
              <div className={postCommentsOn.includes(post.id) ? "postD" : "post"}>
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
                      {users && <p className="post_author">
                        {users.find(user => user.id === post.userId).name}
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
                  {postCommentsOn.includes(post.id) ? <Comments post={post.id} /> : null}


                </div>
              </div>
            </>


          )

        })}

      </>
      <p>Показывать по
        <button onClick={() => { saveNumberOfPosts(10) }}>10</button>
        <button onClick={() => { saveNumberOfPosts(20) }}>20</button>
        <button onClick={() => { saveNumberOfPosts(50) }}>50</button>
        <button onClick={() => { saveNumberOfPosts(100) }}>100</button>
        <button onClick={() => { saveNumberOfPosts(100) }}>Все</button>
      </p>

    </>
  )
}
export default Post;