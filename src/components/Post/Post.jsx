import React, { useState } from "react";
import './PostStyles.css'
import { useGetAllPostsQuery, useGetAllUsersQuery, useGetAllCommentsQuery, useGetDeletePostMutation } from "../../query/posts";
import { getTodos } from "../../api";
import { useEffect } from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineAutoDelete } from "react-icons/md";
import Comments from "../Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, allUsers, deletePost, getAllPosts } from "../../store/slices/posts";
import { TbCoinRupee, TbColumnInsertLeft } from "react-icons/tb";

const Post = () => {
  const dispatch = useDispatch();
  const [postCommentsOn, setPostCommentsOn] = useState([])
  const [checkPosts, setCheckPots] = useState([])
  const [favoritesPosts, setFavoritesPosts] = useState([])
  const [actionWithPosts, setActionWithPosts] = useState("")
  const numbersOfPostsDef = localStorage.getItem('quantity') ? localStorage.getItem('quantity') : 10;
  const [numbersOfPosts, setNumbersOfPosts] = useState(numbersOfPostsDef)
  let allPosts = useSelector(store => store.posts.allPosts)

  useEffect(() => {
    console.log(checkPosts)
  }, [checkPosts])
  useEffect(() => {
    console.log(favoritesPosts)
  }, [favoritesPosts])
  const { data: postsData, isLoading: postsLoading } = useGetAllPostsQuery(numbersOfPosts);
  const { data: users } = useGetAllUsersQuery();
  const [getDeletePost, { isLoading, isError, isSuccess }] = useGetDeletePostMutation();
  console.log(isLoading)
  console.log(isError)
  console.log(isSuccess)

  async function deletePostS(post) {
    const postId = post.id
    const result = await getDeletePost({ postId })
    dispatch(deletePost({ result }))
  }

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
                  {favoritesPosts.includes(post) ?
                    <div className="post_side-block post_side-block-active" onClick={() => { setFavoritesPosts(favoritesPosts.filter((checkPost) => checkPost !== post)) }}>
                      <IoHeart />
                    </div>
                    :
                    <div className="post_side-block " onClick={() => { setFavoritesPosts([...favoritesPosts, post]) }}>
                      <IoMdHeartEmpty />
                    </div>
                  }
                  <div className={isLoading ? "post_side-block-loading" : "post_side-block"} onClick={(() => {
                    if (isLoading !== true) {
                      deletePostS(post)
                    }
                  })}>
                    {/* {isLoading ? <MdOutlineAutoDelete /> : <MdDeleteOutline />} */}
                    <MdDeleteOutline />
                  </div>
                  <div className="post_side-block">
                    <MdOutlineEdit />
                  </div>
                  {checkPosts.includes(post) ?
                    <div className="post_side-block post_side-block-active" onClick={() => { setCheckPots(checkPosts.filter((checkPost) => checkPost !== post)) }}>
                      <IoCheckboxOutline />
                    </div>
                    :
                    <div className="post_side-block " onClick={() => { setCheckPots([...checkPosts, post]) }}>
                      <MdOutlineCheckBoxOutlineBlank />
                    </div>
                  }

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
      {checkPosts.length !== 0 &&
        <div className="buttons__box">
          <button className="buttons__box_button" onClick={() => {
            setActionWithPosts("Добавить в избранное")
          }}>В избранное</button>
          <button className="buttons__box_button" onClick={() => {
            setActionWithPosts("Удалить")
          }}>Удалить</button>
        </div>}


      {actionWithPosts !== "" &&
        <div className="background">
          <div className="add_comment-form">
            <p>Подтвердите действие</p>
            <button className="add_comment_form-button" onClick={() => {
              if (actionWithPosts === "Добавить в избранное") {
                setFavoritesPosts([...favoritesPosts, ...checkPosts]);
              } else if (actionWithPosts === "Удалить") {
                checkPosts.forEach((post) => {
                  deletePostS(post)
                })
              }
              setCheckPots([])
              setActionWithPosts("")
            }}>{actionWithPosts} {checkPosts.length} {checkPosts.length === 1 ?
              "пост" : checkPosts.length < 5  ? 'поста' : 'постов'} </button>
            <button className="add_comment_form-button" onClick={() => {
              setActionWithPosts("")
            }}>Отменить</button>

          </div>

        </div>
      }

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