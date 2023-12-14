import React, { useState } from "react";
import './PostStyles.css'
import { useGetAllPostsQuery, useGetAllUsersQuery } from "../../query/posts";
import { useEffect } from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import Comments from "../Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllPosts, getChangePost, getDeletePost, getLikedPosts } from "../../store/slices/posts";

const Post = ({ numbersOfPosts }) => {

  const dispatch = useDispatch();

  const [postCommentsOn, setPostCommentsOn] = useState([])
  const [checkPosts, setCheckPots] = useState([])
  const [favoritesPosts, setFavoritesPosts] = useState([])

  const [actionWithPosts, setActionWithPosts] = useState("")
  const [postToBeDeleted, setPostToBeDeleted] = useState()
  const [postEditing, setPostEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [changedUser, setChangedUser] = useState("")

  const {
    allPosts,
    allUsers,
    status,
    filteredPosts,
    filtersActive
  } = useSelector(state => state.posts)

  const { data: postsData, isLoading: postsLoading, isError: postsError } = useGetAllPostsQuery(numbersOfPosts);
  const { data: users, isError: usersError } = useGetAllUsersQuery();
  console.log(postsError)
  useEffect(() => {
    dispatch(getAllUsers(users))
    dispatch(getLikedPosts(favoritesPosts))
    if (postsData) {
      dispatch(getAllPosts(postsData))
    }
  }, [postsData, favoritesPosts, users])
  const posts = filtersActive ? filteredPosts : allPosts

  // Удаление поста
  const deletePost = async (postToBeDeleted) => {
    dispatch(getDeletePost(postToBeDeleted)).then((result) => {
      if (result.meta.requestStatus === "rejected") {
        alert('Ошибка удаления поста, попробуйте позже')
      }
    })
  }

  // Изменение поста
  const changePost = async (postToBeDeleted) => {
    const index = allPosts.indexOf(postToBeDeleted)
    const userId = allUsers.find((user) => user.name === changedUser).id
    console.log(userId)
    dispatch(getChangePost({ postToBeDeleted, index, title, text, userId })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setPostEditing(false)
      } else if (result.meta.requestStatus === "rejected") {
        alert('Ошибка отправки изменения, попробуйте позже')
      }
    })
  }

  return (
    <>
      <>
        {filtersActive && posts.length === 0 && <h3 className="no-posts">Не найдено ни одного подходящего поста</h3>}
        {postsError || usersError ? <p className="no-posts">Ошибка загрузки постов, попробуйте позже *_*</p>
          : postsLoading ? <p>Подождите, посты загружаются...</p>
            : posts.map((post) => {
              return (
                <div key={post.id} className={postCommentsOn.includes(post.id) ? "postD" : "post"}>

                  {/* Левые кнопки поста */}

                  <div className="post_side-bar">

                    {/* Избранное */}
                    {favoritesPosts.includes(post) ?
                      <div className="post_side-block post_side-block-active" onClick={() => {
                        setFavoritesPosts(favoritesPosts.filter((checkPost) => checkPost !== post))
                      }}>
                        <IoHeart />
                      </div>
                      :
                      <div className="post_side-block " onClick={() => { 
                        setFavoritesPosts([...favoritesPosts, post])

                         }}>
                        <IoMdHeartEmpty />
                      </div>
                    }

                    {/* Удаление */}
                    <div
                      className="post_side-block"
                      onClick={(() => {
                        setActionWithPosts('Удалить пост')
                        setPostToBeDeleted(post)
                      })}>
                      <MdDeleteOutline />
                    </div>

                    {/* Редактирование */}
                    <div className="post_side-block" onClick={() => {
                      setPostEditing(true)
                      setPostToBeDeleted(post)
                      setTitle(post.title)
                      setText(post.body)
                      setChangedUser(users.find(user => user.id === post.userId).name)

                    }}>
                      <MdOutlineEdit />
                    </div>

                    {/* Чекбокс */}
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

                  <div className="post_main">
                    <div className="post_header">

                      {postEditing === true && postToBeDeleted === post ?
                        <>
                          <select className="change_post-authore"
                            defaultValue={allUsers.find(user => user.id === post.userId).name}
                          >
                            {allUsers ? allUsers.map((user) => {
                              return (
                                <option
                                  key={user.id}
                                >{user.name}</option>
                              )
                            }) : null}
                          </select>
                          <textarea
                            rows='3'
                            className="change_post-title"
                            onChange={(e) => setTitle(e.target.value)}
                            defaultValue={postToBeDeleted.title}
                          />
                          <textarea
                            rows='7'
                            className="change_post-body"
                            onChange={(e) => setText(e.target.value)
                            }
                            defaultValue={postToBeDeleted.body}
                          />
                        </>
                        :
                        <>
                          {users && <p className="post_author">
                            {users.find(user => user.id === post.userId).name}
                          </p>}
                          <h3 className="post_title">{post.title}</h3>
                          <p className="post_text">{post.body}</p>
                        </>
                      }
                    </div>

                    {/* Нижние кнопки поста */}
                    {postEditing === true && postToBeDeleted === post ?
                      <div className="edditing-buttons">
                        <button
                          className="edditing-button"
                          disabled={status === "loading" ? true : false}
                          onClick={() => {
                            changePost(postToBeDeleted)
                          }}>Сохранить</button>
                        <button
                          className="edditing-button"
                          onClick={() => {
                            setPostEditing(false)
                          }}
                        >Отменить</button>
                      </div>
                      :
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
                    }

                    {postCommentsOn.includes(post.id) ? <Comments post={post.id} /> : null}

                  </div>
                </div>
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
          <div className="confirm_action">
            <p>Подтвердите действие</p>
            <button className="confirm_action-button" onClick={() => {
              if (actionWithPosts === "Добавить в избранное") {
                setFavoritesPosts([...favoritesPosts, ...checkPosts]);
                let arfId = []
                checkPosts.map((post)=> arfId.push(post.id) )
                console.log(arfId)
              } else if (actionWithPosts === "Удалить") {
                checkPosts.forEach((post) => {
                  dispatch(getDeletePost(post))
                })
              } else if (actionWithPosts === "Удалить пост") {
                deletePost(postToBeDeleted)
              }
              if (actionWithPosts !== "Удалить пост") {
                setCheckPots([])
              }
              setActionWithPosts("")
            }}>
              {actionWithPosts}
              {actionWithPosts === "Удалить пост" ? null : checkPosts.length === 1 ? ` ${checkPosts.length} пост` : checkPosts.length < 5 ? ` ${checkPosts.length} поста` : ` ${checkPosts.length} постов`}
            </button>
            <button className="confirm_action-button" onClick={() => {
              setActionWithPosts("")
            }}>Отменить</button>
          </div>

        </div>
      }


    </>
  )
}
export default Post;